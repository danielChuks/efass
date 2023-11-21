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
            console.error('Error fetching memo data:', error);
            throw error;
        }
    }, []);

    const uploadMemoData = useCallback(async (file: any) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch(`${process.env.apiUrl}/api/v1/memo`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            // console.log(response.status)
            // console.log(data);
            return {...data, status:response?.status};
        } catch (error) {
            console.error('Error during file upload:', error);
            return { error: error,};
        }
    }, []);

    const updateMemoData = useCallback(async (id: any, data: any) => {
        if (!id || !data) {
            console.error('Invalid parameters for updateMemoData');
            return;
        }

        try {
            const response = await fetchWrapper.put(
                `${BASEAPI_EXTENSION.BASEAPI}memo?id=${id}`,
                data
            );
            return response;
        } catch (error) {
            console.error('Error updating memo data:', error);
            throw error;
        }
    }, []);

    return { getMemoData, updateMemoData, uploadMemoData };
};
