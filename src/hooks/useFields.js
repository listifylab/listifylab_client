import { useState, useEffect } from 'react';
import { apiFetch } from '../api';

export const useFields = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/fields');
      setFields(res.data || []);
    } catch {
      setFields([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(); }, []);

  const addField = async (payload) => {
    const res = await apiFetch('/fields', { method: 'POST', body: JSON.stringify(payload) });
    await fetch();
    return res.data;
  };

  const deleteField = async (id) => {
    await apiFetch(`/fields/${id}`, { method: 'DELETE' });
    setFields((prev) => prev.filter((f) => f._id !== id));
  };

  return { fields, loading, refetch: fetch, addField, deleteField };
};
