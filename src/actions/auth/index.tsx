import { useCallback } from 'react';

export const useAuthActions = () => {
  const getProfile = useCallback(async () => {
    // api calls go here
    return { id: '' };
  }, []);

  return {
    getProfile,
  };
};
