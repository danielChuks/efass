'use client';

import styles from './index.module.scss';
import { useRecoilValue } from 'recoil';
import { settingsAtom } from '../../state/settings';
import { useSettingsActions } from '../../actions/settings';
import { useEffect } from 'react';

export const Settings = () => {
  const { getSettings } = useSettingsActions();
  const darkMode = useRecoilValue(settingsAtom);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  console.log(darkMode);
  return (
    <div className={styles.container}>
      <h4>Settings</h4>
    </div>
  );
};
