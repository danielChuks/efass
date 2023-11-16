import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { memoAdjustmentAtom } from '../../state/adjustment';
import { BASEAPI_EXTENSION } from '../../enums';

export const useAdjustmentAction = () => {
    const fetchWrapper = useFetchWrapper();
    const setMemoData = useSetRecoilState(memoAdjustmentAtom);

    const getMemoData = useCallback(async () => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}memo/all`
            );

            setMemoData(response);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const updateMemoData = useCallback(async (id: any, data: any) => {
        try {
            await fetchWrapper.put(
                `${BASEAPI_EXTENSION.BASEAPI}memo/${id}`,
                data
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }, []);

    return { getMemoData, updateMemoData };
};
