"""Bound anonymous OAuth registration and request bodies before persistence."""
from collections import Counter, deque
import math
import threading
import time
from typing import Any

from starlette.responses import JSONResponse


class RequestBodyLimitMiddleware:
    """Bound every HTTP body, including bodies without Content-Length.

    The per-route Content-Length checks are bypassable with chunked transfer
    encoding; this middleware reads the real stream with a hard cap and
    replays the buffered body to the app, so no handler can buffer an
    attacker-controlled unbounded body.
    """

    def __init__(self, app: Any, *, max_bytes: int) -> None:
        self.app = app
        self.max_bytes = max_bytes

    async def __call__(self, scope: dict[str, Any], receive: Any, send: Any) -> None:
        if scope.get("type") != "http":
            await self.app(scope, receive, send)
            return
        buffer = bytearray()
        total = 0
        while True:
            message = await receive()
            if message.get("type") == "http.disconnect":
                return
            chunk = bytes(message.get("body", b""))
            total += len(chunk)
            if total > self.max_bytes:
                response = JSONResponse(
                    status_code=413,
                    content={"detail": {"code": "request_too_large"}},
                    headers={
                        "Cache-Control": "no-store",
                        "X-Content-Type-Options": "nosniff",
                    },
                )
                await response(scope, receive, send)
                return
            buffer.extend(chunk)
            if not message.get("more_body", False):
                break
        body = bytes(buffer)
        replayed = False

        async def replay_receive() -> dict[str, Any]:
            nonlocal replayed
            if replayed:
                return await receive()
            replayed = True
            return {"type": "http.request", "body": body, "more_body": False}

        await self.app(scope, replay_receive, send)


class OAuthRegistrationLimitMiddleware:
    """Single-process ingress limit with bounded, expiring accounting.

    The supported hosted server uses one process. The catalog also enforces a
    durable total cap, serialized across processes; this limiter never writes
    one database row per attacker-controlled IP address.
    """

    protected_path = "/oauth/register"

    def __init__(self, app, *, global_limit=300, client_limit=20,
                 window_seconds=3600, clock=time.monotonic):
        self.app = app
        self.global_limit = global_limit
        self.client_limit = client_limit
        self.window_seconds = window_seconds
        self.clock = clock
        self._requests = deque()
        self._clients = Counter()
        self._lock = threading.Lock()

    def _protected(self, scope) -> bool:
        return (scope.get("method") == "POST"
                and scope.get("path", "").rstrip("/") == self.protected_path)

    async def __call__(self, scope, receive, send):
        if scope.get("type") != "http" or not self._protected(scope):
            await self.app(scope, receive, send)
            return
        # Use the server's peer address, never a client-supplied forwarded header.
        client = str((scope.get("client") or ("unknown",))[0])
        with self._lock:
            now = self.clock()
            while self._requests and self._requests[0][0] <= now - self.window_seconds:
                _, expired_client = self._requests.popleft()
                self._clients[expired_client] -= 1
                if not self._clients[expired_client]:
                    del self._clients[expired_client]
            blocked = (len(self._requests) >= self.global_limit
                       or self._clients[client] >= self.client_limit)
            retry_after = max(1, math.ceil(self.window_seconds))
            if not blocked:
                self._requests.append((now, client))
                self._clients[client] += 1
        if blocked:
            response = JSONResponse(
                {"error": "rate_limit_exceeded"}, status_code=429,
                headers={"Retry-After": str(retry_after), "Cache-Control": "no-store"})
            await response(scope, receive, send)
            return
        await self.app(scope, receive, send)


class LoginRateLimitMiddleware(OAuthRegistrationLimitMiddleware):
    """Ingress limit for /auth/login: rejected requests never touch the catalog.

    The login throttle is keyed per (tenant, email), so a peer posting distinct
    syntactically-valid emails never approaches the failure lockout while each
    request inserts one durable auth_attempts row and pays a full scrypt
    verify. A per-peer ingress limit bounds both effects without writing any
    rejection rows of its own.
    """

    protected_path = "/auth/login"

    def __init__(self, app, *, global_limit=600, client_limit=60,
                 window_seconds=3600, clock=time.monotonic):
        super().__init__(
            app, global_limit=global_limit, client_limit=client_limit,
            window_seconds=window_seconds, clock=clock)


def same_origin(origin: str, url: Any) -> bool:
    """Compare browser origins including scheme and effective port."""
    from urllib.parse import urlsplit
    try:
        parsed = urlsplit(origin)
        target = urlsplit(str(url))
        scheme = {"ws": "http", "wss": "https"}.get(target.scheme, target.scheme)
        return (parsed.scheme in {"http", "https"}
                and parsed.hostname is not None
                and not parsed.username and not parsed.password
                and not parsed.path and not parsed.query and not parsed.fragment
                and (parsed.scheme, parsed.hostname, parsed.port if parsed.port is not None else (443 if parsed.scheme == "https" else 80))
                == (scheme, target.hostname, target.port if target.port is not None else (443 if scheme == "https" else 80)))
    except ValueError:
        return False
