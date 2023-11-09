import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useSetRecoilState } from 'recoil';
import {
    generateReportAtom,
    generateReportInformationAtom,
} from '../../state/generateReport';
import { BASEAPI_EXTENSION } from '../../enums';

export const useGenerateReportActions = () => {
    const fetchWrapper = useFetchWrapper();
    const setReportData = useSetRecoilState(generateReportAtom);
    const setReportInformation = useSetRecoilState(
        generateReportInformationAtom
    );

    const handleGenerateReport = useCallback(async (reportType: string) => {
        try {
            const response = await fetchWrapper.get(
                `${BASEAPI_EXTENSION.BASEAPI}tableList/${reportType}`
            );
            if (response.responseCode === 0) {
                console.log(response.data);
                setReportData(response.data);
            } else {
                setReportData([]);
                return [];
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }, []);

    //save selected date to db
    const postReportDate = useCallback(async (selectedDate: string) => {
        try {
            const response = await fetchWrapper.post(
                `${BASEAPI_EXTENSION.BASEAPI}date`,
                selectedDate
            );
            console.log(response);
            // if (response.responseCode === 0) {
            //     //  console.log(response.data);
            //     //  setReportData(response.data);
            // } else {
            //     //  setReportData([]);
            //     return [];
            // }
        } catch (error) {
            console.log(error);
            return error;
        }
    }, []);

    const handleDownloadReports = useCallback(async (url: string) => {
        try {
            const response = await fetchWrapper.get(url)
            console.log(response)
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
                    //response should be consistent for ease
                    console.log(response);
                    setReportInformation(response.sheetMcfpr1);
                    // return response;
                } else {
                    setReportInformation([]);
                }
            } catch (error) {
                console.log(error);
                setReportInformation([]);
            }
        },
        []
    );

    return {
        handleGenerateReport,
        getReportInformation,
        postReportDate,
        handleDownloadReports,
    };
};
