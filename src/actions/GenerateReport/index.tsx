import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { generateReportAtom } from '../../state/generateReport';
export const useGenerateReportActions = () => {
    const fetchWrapper = useFetchWrapper();
     const setReportData = useSetRecoilState(generateReportAtom);
    const handleGenerateReport = useCallback(async (reportType: string) => {
        try {
            const response = await fetchWrapper.get(
                `api/v1/tableList/${reportType}`
            );
            if(response.responseCode === 0){
                return response.data
                // setReportData(response.data);
                // console.log(response.data);
            }
            else{
                return []
                // console.log(response);
                // setReportData([])
            }

        } catch (error) {
            // setReportData([]);
            console.log(error);
            return error;
        }
    }, []);
    return { handleGenerateReport };
};
