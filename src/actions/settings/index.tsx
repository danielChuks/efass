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

    const changePassword = async (userCredentials: Password) => {
        // console.log(userCredentials);

        try {
            const url = `${process.env.apiUrl}/api/v1/user`;
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials),
            });
            const res = await response.json();
            return res;
        } catch (err) {

            return err;
        }
    };

    return {
        getSettings,
        changePassword,
    };
};
