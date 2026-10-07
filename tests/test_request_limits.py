"""Ingress limits preserve normal ASGI and browser-origin behavior."""
import asyncio

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient
from starlette.responses import StreamingResponse

from hosted.app import _bounded_world_response, _ProxyResponseLimitExceeded
from server.request_limits import RequestBodyLimitMiddleware, same_origin


@pytest.mark.parametrize('origin,target,allowed', [
    ('http://localhost:8000', 'ws://localhost:8000/ws', True),
    ('http://localhost:8001', 'ws://localhost:8000/ws', False),
    ('https://localhost:8000', 'ws://localhost:8000/ws', False),
    ('https://example.test:443', 'wss://example.test/ws', True),
    ('http://[::1]:8000', 'ws://[::1]:8000/ws', True),
    ('http://localhost:0', 'ws://localhost/ws', False),
    ('null', 'ws://localhost/ws', False),
    ('http://localhost:bad', 'ws://localhost/ws', False),
    ('http://localhost/path', 'ws://localhost/ws', False),
    ('http://user@localhost', 'ws://localhost/ws', False),
])
def test_origin_tuple(origin, target, allowed):
    assert same_origin(origin, target) is allowed


def test_body_limit_preserves_delayed_streaming_response():
    app = FastAPI()
    app.add_middleware(RequestBodyLimitMiddleware, max_bytes=16)

    @app.get('/stream')
    async def stream():
        async def chunks():
            yield b'first'
            await asyncio.sleep(0.01)
            yield b'second'
        return StreamingResponse(chunks())

    with TestClient(app) as client:
        assert client.get('/stream').content == b'firstsecond'


def test_proxy_response_limit_stops_upstream_before_transport_buffers(monkeypatch):
    monkeypatch.setattr('hosted.app.MAX_PROXY_RESPONSE_BYTES', 8)
    sent = []
    produced = []

    async def upstream(scope, receive, send):
        await send({'type': 'http.response.start', 'status': 200, 'headers': []})
        for i in range(100):
            produced.append(i)
            await send({'type': 'http.response.body', 'body': b'1234', 'more_body': True})

    async def receive():
        return {'type': 'http.request', 'body': b''}

    async def send(message):
        sent.append(message)

    with pytest.raises(_ProxyResponseLimitExceeded):
        asyncio.run(_bounded_world_response(upstream)({'type': 'http'}, receive, send))
    assert produced == [0, 1, 2]
    assert sum(len(m.get('body', b'')) for m in sent) == 8
