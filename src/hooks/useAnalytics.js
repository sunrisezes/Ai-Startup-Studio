import { useCallback } from 'react';

export function useAnalytics() {
  const logEvent = useCallback((name, data = {}) => {
    console.log('[Analytics]', new Date().toISOString(), name, data);
  }, []);

  return { logEvent };
}

export default useAnalytics;
