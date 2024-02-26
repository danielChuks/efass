'use client';
import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { settingsAtom } from '../../state/settings';
import { BASEAPI_EXTENSION } from '../../enums';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { Password } from '../../interfaces';
export const useSettingsActions = () => {
    const fetchWrapper = useFetchWrapper();
    const setSettingsData = useSetRecoilState(settingsAtom);

    const getSettings = useCallback(async () => {
        const response = setSettingsData({
            darkMode: true,
            notificationSounds: false,
        });

        return response;
    }, [setSettingsData]);

    const resetPassword = async (userCredentials: Password) => {
        try {
            const response = await fetchWrapper.put(
                `${BASEAPI_EXTENSION.BASEAPI}user`,
                userCredentials
            );
            if (response.responseCode === 0) {
                return response;
            } else return 'An error occured';
        } catch (err) {
            return err;
        }
    };

    return {
        getSettings,
        resetPassword,
    };
};
