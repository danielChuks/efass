import { useCallback, useEffect } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../state/auth';
import { Token } from '../../interfaces/token.interface';
import { useIdle } from '@uidotdev/usehooks';
import { generateReportAtom, defaultReportDataAtom } from '../../state/generateReport';
import { useSetRecoilState } from 'recoil';

export const useAuthActions = () => {
       const setReportData = useSetRecoilState(generateReportAtom);
       const setDefaultData = useSetRecoilState(defaultReportDataAtom);
    const fetchWrapper = useFetchWrapper();
    const [, setAuth] = useRecoilState<Token | null>(authAtom);
    const router = useRouter();
    const IDLE_TIMEOUT = 240000; // 4 minutes
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
            const currentDate = new Date();
            const formattedCurrentDate = currentDate.toLocaleDateString(
                'en-US',
                {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }
            );

            const formattedTime = currentDate.toLocaleTimeString('en', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            const formattedDateTime = `${formattedCurrentDate} ${formattedTime}`;

            localStorage.setItem('oldDate', formattedDateTime);
            router.push('/login');
             setReportData([]);
             setDefaultData([]);
        }, [router]);

        useEffect(() => {
            if (isIdle) {
                localStorage.removeItem('auth');
                const currentDate = new Date();
            const formattedCurrentDate = currentDate.toLocaleDateString(
                'en-US',
                {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                }
            );
                const formattedTime = currentDate.toLocaleTimeString('en', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                });

                const formattedDateTime = `${formattedCurrentDate} ${formattedTime}`;

                localStorage.setItem('oldDate', formattedDateTime);

                setAuth(null);
                router.push('/login');
            }
        }, [isIdle, setAuth, router]);


    return {
        login,
        logout,
    };
};
