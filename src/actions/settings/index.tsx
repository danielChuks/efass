import { useCallback } from 'react';

export const useSettingsActions = () => {
  const getSettings = useCallback(async () => {
    return { darkMode: true };
  }, []);

  return {
    getSettings,
  };
};
