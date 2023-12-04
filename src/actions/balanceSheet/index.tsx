import { useCallback } from 'react';
export const useBalanceSheetAction = () => {
    const getBalanceSheetData = useCallback(async () => {
        try {
            const response = await fetch(`${process.env.apiUrl}/api/v1/bs`, {
                method: 'GET',
            });
            const data = await response.json();
            return { ...data, status: response?.status };
        } catch (error) {
            console.error('get, error');
            return { error: error };
        }
    }, []);

    const uploadBalanceSheet = useCallback(async (file: any) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch(`${process.env.apiUrl}/api/v1/bs`, {
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

    return { getBalanceSheetData, uploadBalanceSheet };
};
