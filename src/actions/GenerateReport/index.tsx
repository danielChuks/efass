import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { generateReportAtom } from '../../state/generateReport';
import { BASEAPI_EXTENSION } from '../../enums';
export const useGenerateReportActions = () => {
    const fetchWrapper = useFetchWrapper();
     const setReportData = useSetRecoilState(generateReportAtom);
    //  return this.http.get<any>(
    //      `${environment.baseApi}/` + this.sheetName + this.reportSelectedDate
    //  );
    const handleGenerateReport = useCallback(async (reportType: string) => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}tableList/${reportType}`
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

    const getReportInformation = useCallback(async()=>{

    },[])


    return { handleGenerateReport, getReportInformation};
};
