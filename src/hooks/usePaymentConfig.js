import { useState, useEffect } from 'react';
import { apiFetch } from '../api';

export const usePaymentConfig = () => {
  const [config, setConfig] = useState({ enabled: false, keyId: null, plans: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/payment/config')
      .then((res) => setConfig(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { config, loading };
};
