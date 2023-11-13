import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useSetRecoilState } from 'recoil';
import {
    generateReportAtom,
    generateReportInformationAtom,
} from '../../state/generateReport';
import { BASEAPI_EXTENSION } from '../../enums';
import { ReportData } from '../../interfaces';
import {
    removeFirstFiveCharacters,
    replaceDot,
} from '../../page/GenerateReport/utils';

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

    const postCbnDate = useCallback(async (selectedCbnDate: string) => {
        try {
            const response = await fetchWrapper.post(
                `${BASEAPI_EXTENSION.BASEAPI}cbnDate`,
                selectedCbnDate
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

    const handleDownloadReports = useCallback(
        async (
            reportData: any,
            reportGroup: string,
            reportSelectedDate: string
        ) => {
            try {
                let selectedReport = reportData.map(
                    (report: any) => report.return_code
                );

                // Build the download endpoint URL
                let endpoint = `${process.env.apiUrl}/download/`;

                selectedReport
                    .filter((item: any) => !item.startsWith('QDFIR400'))
                    .filter((item: any) => !item.startsWith('QDFIR450'))
                    .filter((item: any) => !item.startsWith('MDFIR450'))
                    .filter((item: any) => !item.startsWith('MDFIR400'))
                    .forEach((item: any) => {
                        endpoint += item;
                        endpoint += ',';
                    });

                // Add additional conditions based on reportGroup
                if (reportGroup === 'Q') {
                    endpoint += 'QDFIR400,QDFIR450';
                }

                if (reportGroup === 'M') {
                    endpoint += 'MDFIR400,MDFIR450';
                }

                // Log the final endpoint (optional)
                console.log(endpoint);

                // Download the reports
                const blob = await fetchWrapper.get(endpoint, {
                    responseType: 'blob',
                });
                console.log(blob);

                // Create a link and trigger the download
                const a = document.createElement('a');
                const objectUrl = URL.createObjectURL(blob);
                a.href = objectUrl;
                a.download = `Reports downloaded for ${reportSelectedDate}.zip`;
                a.click();
                URL.revokeObjectURL(objectUrl);

                // Optionally, return some result
                return { success: true };
            } catch (error) {
                // Handle errors
                console.error('Error downloading reports:', error);
                return { success: false, error };
            }
        },
        [fetchWrapper]
    );

    const getReportInformation = useCallback(
        async (sheetName: string, selectedDate: string) => {
            console.log('called')
            try {
                const response = await fetchWrapper.get(
                    `${BASEAPI_EXTENSION.BASEAPI}${sheetName}/${selectedDate}`
                );
                // Temporary until the response is given a generic name like "data"
                if (response.responseCode === 0) {
                    const modifiedSheetName =
                        removeFirstFiveCharacters(sheetName);
                    // Check if modifiedSheetName is not null before using it
                    if (modifiedSheetName !== null) {
                        console.log(modifiedSheetName);
                        const specialReportNumbers = [
                            '292.1',
                            '292.2',
                            '292.3',
                            '371.1',
                            '371.2',
                            '371.3',
                            '400.1',
                            '400.2',
                            '400.3',
                            '400.4',
                            '400.5',
                            '400.6',
                            '400.8',
                            '400.10',
                            '400.11',
                            '400.12',
                            '400.13',
                            '400.14',
                            '400.15',
                            '450.1',
                            '450.2',
                            '450.3',
                            '450.4',
                            '450.5',
                            '450.6',
                            '450.8',
                            '450.9',
                            '450.10',
                            '450.11',
                            '450.12',
                            '450.13',
                            '450.14',
                            '450.15',
                        ];

                        if (specialReportNumbers.includes(modifiedSheetName)) {
                            const reportWithUnderScore =
                                replaceDot(modifiedSheetName);
                            const dynamicPropertyName = `sheet${reportWithUnderScore}`;
                            setReportInformation(response[dynamicPropertyName]);
                            return;
                        }

                        if (sheetName === 'mcfpr1') {
                            console.log(response['sheetMcfpr1']);
                            setReportInformation(response['sheetMcfpr1']);
                            return;
                        }

                        if(sheetName === 'mstdr1'){
                            console.log(response['sheet001']);
                            setReportInformation(response['sheet001']);
                            return;
                        }

                        if (sheetName === 'mstdr2') {
                            console.log(response['sheet001']);
                            setReportInformation(response['sheet002']);
                            return;
                        }

                        //reports with consistent format
                        // Dynamically construct the property name for response.sheet
                        const dynamicPropertyName = `sheet${modifiedSheetName}`;
                        console.log(dynamicPropertyName);
                        console.log(response);
                        // Access the dynamically named property
                        setReportInformation(response[dynamicPropertyName]);
                    } else {
                        // Handle the case where modifiedSheetName is null
                        console.error('modifiedSheetName is null');
                        setReportInformation([]);
                    }
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
        postCbnDate,
        handleDownloadReports,
    };
};
