import { useCallback, useContext } from 'react';
import { Token } from '../../interfaces/token.interface';
import { RequestMethod } from '../../enums/requestMethod.enum';
import { ConfigContext } from '../../providers/config/ConfigContext';
import { RequestOptions } from '../../interfaces';
import { useRouter } from 'next/navigation';

export const useFetchWrapper = () => {
    const router = useRouter();
    const { apiUrl } = useContext(ConfigContext);

    const generateAuthHeader = useCallback((auth: Token | null) => {
        const token = auth && auth.token;
        if (token) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }, []);

    const handleResponse = useCallback(
        async (response: any, router: any) => {
            return response.text().then(async (text: string) => {
                const data = text && JSON.parse(text);
                if (response.status === 401) {
                    sessionStorage.removeItem('token');
                    router.push('/login');
                }

                if (!response.ok) {
                    return { code: response.message };
                }
                return data;
            });
        },

        []
    );

    const request = useCallback((method: RequestMethod) => {
        return (url: string, body?: any, token?: Token) => {
            let accessToken = JSON.parse(localStorage.getItem('auth') || '{}');

            if (token?.token) {
                accessToken = token;
            }

            const requestOptions: RequestOptions = {
                method,
                headers: generateAuthHeader(accessToken),
            };

            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }

            return fetch(`${apiUrl}/${url}`, requestOptions as RequestInit)
                .then((response) => {
                    return handleResponse(response, router);
                })

                .catch((err) => {
                    return { error: err };
                });
        };
    }, []);

    return {
        get: request(RequestMethod.GET),
        post: request(RequestMethod.POST),
        put: request(RequestMethod.PUT),
        delete: request(RequestMethod.DELETE),
        patch: request(RequestMethod.PATCH),
    };
};
