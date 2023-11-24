import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BASEAPI_EXTENSION } from '../../enums';
import { userAtom } from '../../state/userList';
import { authAtom } from '../../state/auth';
import { User } from '@/interfaces';

export const useUserListActions = () => {
    const fetchWrapper = useFetchWrapper();
    const setUserData = useSetRecoilState(userAtom);
    const [, setAuth] = useRecoilState(authAtom);


    const handleuserList = useCallback(async () => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}users`
            );
            if (response.responseCode === 0) {
                setUserData(response?.allUsers);
            } else {
                setUserData([]);
            }
        } catch (error) {
            setUserData([]);

            return error;
        }
    }, []);

    const create = useCallback(
        async (data : User) => {
            try {
                const response = await fetchWrapper.post(`${BASEAPI_EXTENSION.BASEAPI}createUser`, data);
                console.log(response);
                if (response?.error) {
                    throw new Error(response.error);
                }
                setAuth(response);
                return response;
            } catch (error) {
                return { error };
            }
        },
        [fetchWrapper, setAuth] 
    );

    const edit = useCallback(
        async (data : User) => {
            try {
                const response = await fetchWrapper.post(`${BASEAPI_EXTENSION.BASEAPI}createUser`, data);
                if (response?.error) {
                    throw new Error(response.error);
                }
                setAuth(response);
                return response;
            } catch (error) {
                return { error };
            }
        },
        [fetchWrapper, setAuth] 
    );


    return { handleuserList, create};
};
