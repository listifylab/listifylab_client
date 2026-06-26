import { useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../api';

export const useSubscription = (user) => {
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    // Superadmin has no tenant — skip subscription check
    if (!user || user.role === 'superadmin') return;
    try {
      setLoading(true);
      const res = await apiFetch('/subscription');
      setSub(res.data);
    } catch {
      setSub(null);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetch(); }, [fetch]);

  // Subscription mutations are superadmin-only (via /api/superadmin/tenants/:id/* routes).
  // Users can only read their subscription status — no self-activation allowed.

  return { sub, loading, refetch: fetch };
};
