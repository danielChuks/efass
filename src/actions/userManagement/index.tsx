import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { BASEAPI_EXTENSION } from '../../enums';
import { userAtom } from '../../state/userList';

export const useUserListActions = () => {
    const fetchWrapper = useFetchWrapper();
    const setUserData = useSetRecoilState(userAtom);

    const handleuserList = useCallback(async () => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}users`
            );
            if (response.responseCode === 0) {
                console.log(response?.allUsers);
                setUserData(response?.allUsers);
            } else {
                console.log(response.responseMessage);
                setUserData([]);
            }
        } catch (error) {
            setUserData([]);
            console.log(error);
            return error;
        }
    }, []);

    return { handleuserList };
};
