'use client';

import styles from './index.module.scss';
import { useRecoilValue } from 'recoil';
import { settingsAtom } from '../../state/settings';
import { useSettingsActions } from '../../actions/settings';
import { useEffect } from 'react';
import BaseLayout from '../../components/BaseLayout';

export const Settings = () => {
    const { getSettings } = useSettingsActions();
    const darkMode = useRecoilValue(settingsAtom);

    useEffect(() => {
        getSettings();
    }, [getSettings]);

    console.log(darkMode);
    return (
        <BaseLayout>
            <div className={styles['container']}>
                <h4>Settings Tim</h4>
            </div>
        </BaseLayout>
    );
};
