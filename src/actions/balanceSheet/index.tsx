import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { balanceSheetAtom } from '../../state/balanceSheet';
import { BASEAPI_EXTENSION } from '../../enums';
export const useBalanceSheetAction = () => {
    const fetchWrapper = useFetchWrapper();
    const setBalanceSheetData = useSetRecoilState(balanceSheetAtom);

    const getBalanceSheetData = useCallback(async () => {
         try {
             const response = await fetch(`${process.env.apiUrl}/api/v1/noteToBalanceSheet/all`, {
                 method: 'GET',
             });
             const data = await response.json();
            //  console.log(data)
            //  console.log(data.length)
            //  setBalanceSheetData(data);
             return { data:data, status: response?.status };
         } catch (error) {
             console.error('an error occured', error);
             return { error: error };
         }
    }, []);

    const uploadBalanceSheet = useCallback(async (file: any) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await fetch(
                `${process.env.apiUrl}/api/v1/noteToBalanceSheet/uploadPLBalance`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
            const data = await response.json();
            return { ...data, status: response?.status };
        } catch (error) {
            console.error('Error during file upload:', error);
            return { error: error };
        }
    }, []);

     return { getBalanceSheetData, uploadBalanceSheet};
};
