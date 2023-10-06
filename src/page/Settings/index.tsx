'use client';

import styles from './index.module.scss';
import { useRecoilState } from 'recoil';
import { settingsAtom } from '../../state/settings';

export const Settings = () => {
  const darkMode = useRecoilState(settingsAtom);

  console.log(darkMode);
  return (
    <div className={styles.container}>
      <h4>Settings</h4>
    </div>
  );
};
