import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export const useStations = (filters = {}) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStations = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams(filters).toString();
      const { data } = await api.get(`/stations?${params}`);
      setStations(data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch stations');
      setLoading(false);
    }
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  return { stations, loading, error, refresh: fetchStations };
};
