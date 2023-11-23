import { useCallback, useEffect } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../state/auth';
import { Token } from '../../interfaces/token.interface';
import { useIdle } from "@uidotdev/usehooks";

export const useAuthActions = () => {
    const fetchWrapper = useFetchWrapper();
    const [, setAuth] = useRecoilState<Token | null>(authAtom);
    const router = useRouter();
    const IDLE_TIMEOUT = 120000; // 1 minute
    const isIdle = useIdle(IDLE_TIMEOUT);

    const login = useCallback(
        async (username: string, password: string) => {
            try {
                const response = await fetchWrapper.post(`authenticate`, {
                    username,
                    password,
                });
                if (response?.error) {
                    throw new Error(response.error);
                }

                setAuth(response);
                localStorage.setItem('auth', JSON.stringify(response));
                return response;
            } catch (error) {
                return { error };
            }
        },
        [fetchWrapper, setAuth] 
    );

    const logout = useCallback(async () => {
        await localStorage.removeItem('auth');
        router.push('/login');
    }, [router]);

    useEffect(() => {
        if (isIdle) {
            localStorage.removeItem('auth');
            setAuth(null); 
            router.push('/login');
        }
    }, [isIdle, setAuth, router]);

    return {
        login,
        logout,
    };
};