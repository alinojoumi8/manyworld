function encoded(value) {
  return encodeURIComponent(String(value || ""));
}

// Server-supplied navigation is untrusted: accept only same-origin relative
// paths. Protocol-relative ("//evil"), backslash-normalized ("/\evil"), and
// javascript: URLs fall back to the built-in default (or are dropped).
function sameOriginHref(value, fallback) {
  if (typeof value === "string" && value.startsWith("/")
      && !value.startsWith("//") && !value.startsWith("/\\")) {
    return value;
  }
  return fallback;
}

export function buildProductNavigation({
  runId = "",
  navigation = null,
} = {}) {
  const resolvedRunId = String(navigation?.run_id || runId || "");
  const defaults = {
    observatory: "/",
    world_os: resolvedRunId
      ? `/runs/${encoded(resolvedRunId)}/overview`
      : null,
    commons: resolvedRunId
      ? `/runs/${encoded(resolvedRunId)}/commons`
      : null,
    join: null,
    my_agents: null,
  };

  return [
    { key: "observatory", label: "Observatory", clientSide: true },
    { key: "world_os", label: "World OS", clientSide: true },
    { key: "commons", label: "Commons", clientSide: true },
    { key: "join", label: "Join", clientSide: false },
    { key: "my_agents", label: "My Agents", clientSide: false },
  ].map(item => ({
    ...item,
    href: sameOriginHref(navigation?.[item.key], defaults[item.key]),
  })).filter(item => Boolean(item.href));
}

export function isProductNavigationActive(key, pathname) {
  const path = String(pathname || "/");
  if (key === "observatory") return path === "/";
  if (key === "commons") {
    return /^\/runs\/[^/]+\/commons(?:\/|$)/.test(path)
      || /^\/commons(?:\/|$)/.test(path);
  }
  if (key === "world_os") {
    return /^\/runs\/[^/]+(?:\/|$)/.test(path)
      && !/^\/runs\/[^/]+\/commons(?:\/|$)/.test(path);
  }
  if (key === "join") {
    return /^\/(?:join|claim|oauth\/authorize)(?:\/|$)/.test(path);
  }
  return key === "my_agents" && /^\/my-agents(?:\/|$)/.test(path);
}
