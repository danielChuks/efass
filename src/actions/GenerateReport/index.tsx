import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useSetRecoilState } from 'recoil';
import { generateReportAtom } from '../../state/generateReport';
import { BASEAPI_EXTENSION } from '../../enums';

export const useGenerateReportActions = () => {
    const fetchWrapper = useFetchWrapper();
    const setReportData = useSetRecoilState(generateReportAtom);

    const handleGenerateReport = useCallback(async (reportType: string) => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}tableList/${reportType}`
            );
            if (response.responseCode === 0) {
                console.log(response.data);
                setReportData(response.data);
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }, []);

    const getReportInformation = useCallback(
        async (sheetName: string, selectedDate: string) => {
            try {
                const response = await fetchWrapper.get(
                    `${BASEAPI_EXTENSION.BASEAPI}${sheetName}/${selectedDate}`
                );
                if (response.responseCode === 0) {
                    return response;
                } else {
                    return [];
                }
            } catch (error) {
                console.log(error);
                return error;
            }
        },
        []
    );

    return { handleGenerateReport, getReportInformation };
};
