import { useState, useEffect } from 'react';
import api from '../services/api';

export const useStations = (filters = {}) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
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
    };

    fetchStations();
  }, [JSON.stringify(filters)]);

  return { stations, loading, error };
};
