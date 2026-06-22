// In dev, Vite proxies /api -> http://localhost:5000
// In prod, configure your server to proxy /api -> backend
const API_BASE = 'https://listifylab-server.onrender.com';

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((cb) => (error ? cb.reject(error) : cb.resolve(token)));
  refreshQueue = [];
};

// Returns the new access token from refresh response body
const tryRefresh = async () => {
  const res = await fetch(`${API_BASE}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Session expired. Please log in again.');
  const data = await res.json();
  return data?.data?.accessToken || null;
};

export const apiFetch = async (path, options = {}, _retry = false, _bearerToken = null) => {
  const { headers: extraHeaders, ...restOptions } = options;

  // On retry, pass new access token as Authorization header
  // (cookie may not be updated immediately in Safari/iOS)
  const authHeader = _bearerToken ? { Authorization: `Bearer ${_bearerToken}` } : {};

  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...authHeader, ...(extraHeaders || {}) },
    ...restOptions,
  });

  // Safely parse JSON — handle plain-text error responses (e.g. rate limiter)
  let data;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await res.json();
  } else {
    const text = await res.text();
    data = { message: text || res.statusText };
  }

  // Auto-refresh on 401 (expired access token) — retry once with fresh token
  if (res.status === 401 && !_retry && path !== '/auth/refresh') {
    if (isRefreshing) {
      // Another request is already refreshing — queue this one
      const token = await new Promise((resolve, reject) =>
        refreshQueue.push({ resolve, reject })
      );
      return apiFetch(path, options, true, token);
    }

    isRefreshing = true;
    try {
      const newToken = await tryRefresh();
      processQueue(null, newToken);
      // Retry with new token in Authorization header (doesn't rely on cookie timing)
      return apiFetch(path, options, true, newToken);
    } catch (err) {
      processQueue(err);
      window.location.href = '/';
      throw err;
    } finally {
      isRefreshing = false;
    }
  }

  if (!res.ok) throw new Error(data?.message || 'Request failed');
  return data;
};
