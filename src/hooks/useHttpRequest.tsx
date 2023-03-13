import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const useHttpRequest = (url: string, method = 'GET', data = {}, newToken?: string) => {
  const token = Cookies.get('token');
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<object | null>(null);
  const [error, setError] = useState<any>(null);
  const makeRequest = async () => {
    setLoading(true);
    try {
      const response: { data: object } = await axios.request({
        url,
        method,
        data: { ...data },
        headers: { Authorization: `Bearer ${newToken || token}` },
      });
      setResponseData(response.data);
    } catch (e) {
      console.error(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    makeRequest();
  }, []);
  return { loading, responseData, error };
};

export default useHttpRequest;
