import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../state/auth';
import { Token } from '../../interfaces/token.interface';

export const useAuthActions = () => {
    const fetchWrapper = useFetchWrapper();
    const [, setAuth] = useRecoilState<Token | null>(authAtom);
    const router = useRouter();

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
                const token: Token = response?.token;
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

    return {
        login,
        logout,
    };
};
