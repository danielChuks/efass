'use client';

import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { settingsAtom } from '../../state/settings';

export const useSettingsActions = () => {
    const setSettingsData = useSetRecoilState(settingsAtom);

    const getSettings = useCallback(async () => {
        const response = setSettingsData({
            darkMode: true,
            notificationSounds: false,
        });

        return response;
    }, [setSettingsData]);

    return {
        getSettings,
    };
};
