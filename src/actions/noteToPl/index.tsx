import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { BASEAPI_EXTENSION } from '../../enums';
import { noteToPlAtom } from '../../state/noteToPl';

export const useNoteToPLAction = () => {
    const fetchWrapper = useFetchWrapper();
    const setMemoData = useSetRecoilState(noteToPlAtom);

    const getNoteToPLData = useCallback(async () => {
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

    const uploadNoteToPLData = useCallback(async (file: any) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch(`${process.env.apiUrl}/api/v1/pl`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            return { ...data, status: response?.status };
        } catch (error) {
            console.error('Error during file upload:', error);
            return { error: error };
        }
    }, []);

    // const updateMemoData = useCallback(async (id: any, data: any) => {
    //     if (!id || !data) {
    //         console.error('Invalid parameters for updateMemoData');
    //         return;
    //     }

    //     try {
    //         const response = await fetchWrapper.put(
    //             `${BASEAPI_EXTENSION.BASEAPI}memo?id=${id}`,
    //             data
    //         );
    //         return response;
    //     } catch (error) {
    //         console.error('Error updating memo data:', error);
    //         throw error;
    //     }
    // }, []);

    return { getNoteToPLData, uploadNoteToPLData };
};
