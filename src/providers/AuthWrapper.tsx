'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useAuthActions } from '../actions/auth';
import { authAtom } from '../state/auth';
import { LoadingScreen } from '../components/LoadingScreen';
import { Token } from '../interfaces/token.interface';

interface AuthWrapperProps {
    children: ReactNode;
}

/**
 * @description This wrapper serves as an authentication check that only
 * displays its content if the user is logged in, if not, it redirects the user to the login page.
 * @param children The content to be displayed if the user is logged in.
 * @returns React element.
 */
export const AuthWrapper = (prop: AuthWrapperProps) => {
    const { children } = prop;
    const { logout } = useAuthActions();
    const [loading, setLoading] = useState(true);
    const setAuth = useSetRecoilState(authAtom);

    const checkLogin = async () => {
        setLoading(true);
        const authFromStorageText = await localStorage.getItem('auth');

        if (!authFromStorageText) {
            await logout();
            setLoading(false);
            return;
        }

        const authFromStorage: Token = JSON.parse(authFromStorageText);

        if (!authFromStorage || !authFromStorage.token) {
            await logout();
        } else {
            // Token is present, set user as authenticated
            setAuth(authFromStorage);
        }

        setLoading(false);
    };

    useEffect(() => {
        checkLogin();
    }, []);

    return <>{loading ? <LoadingScreen /> : children}</>;
};
