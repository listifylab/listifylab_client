import { useEffect, useState, useCallback } from 'react';
import { apiFetch } from '../api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/auth/me');
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  // After login/register the server sets cookies in the response.
  // We immediately call fetchMe() so the NEXT request (products, subscription, etc.)
  // is made AFTER a successful cookie round-trip — eliminating the timing race.
  const login = async (credentials) => {
    await apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    await fetchMe();
  };

  const register = async (payload) => {
    await apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(payload) });
    await fetchMe();
  };

  const logout = async () => {
    await apiFetch('/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return { user, loading, login, register, logout, refreshUser: fetchMe };
};
