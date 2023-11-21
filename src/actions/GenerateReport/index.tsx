import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useSetRecoilState } from 'recoil';
import {
    generateReportAtom,
    generateReportInformationAtom,
} from '../../state/generateReport';
import { BASEAPI_EXTENSION } from '../../enums';
// import { ReportData } from '../../interfaces';
import {
    removeFirstFiveCharacters,
    replaceDot,
} from '../../page/GenerateReport/utils';
import { specialReportSheets } from '../../page/GenerateReport/utils';

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
                setReportData(response.data);
                sessionStorage.setItem(
                    'listOfReports',
                    JSON.stringify(response.data)
                );
                return response;
            } else {
                setReportData([]);
                return [];
            }
        } catch (error) {
            return error;
        }
    }, []);

    const handleReportUpload = useCallback(
        async (dateFile: any, reportId: string) => {
            let url: string = '';
            const formData = new FormData();
            formData.append('file', dateFile);
            if (specialReportSheets.includes(reportId)) {
                const reportWithUnderScore = replaceDot(reportId);
                url = `
                 ${
                     process.env.apiUrl
                 }/api/v1/uploadExcel/${reportWithUnderScore?.toLowerCase()}/${reportId}`;
            } else {
                url = `
                 ${
                     process.env.apiUrl
                 }/api/v1/uploadExcel/${reportId?.toLowerCase()}/${reportId}`;
            }

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                console.log(response.status);
                console.log(data);
                return { ...data, status: response.status };
            } catch (error) {
                console.error('Error during file upload:', error);
                return { error: error };
            }
        },
        []
    );

    //save selected date to db
    const postReportDate = useCallback(async (selectedDate: string) => {
        try {
            const response = await fetchWrapper.post(
                `${BASEAPI_EXTENSION.BASEAPI}date?date=${selectedDate}`
            );

            if (response.responseCode === 0) {
                return response;
            } else {
                return response;
            }
        } catch (error) {
            return error;
        }
    }, []);

    const postCbnDate = useCallback(async (selectedCbnDate: string) => {
        try {
            const response = await fetchWrapper.post(
                `${BASEAPI_EXTENSION.BASEAPI}cbnDate`,
                selectedCbnDate
            );

            if (response.responseCode === 0) {
                return response;
            } else {
                return response;
            }
        } catch (error) {
            return error;
        }
    }, []);

    const handleDownloadReports = async (
        reportData: any,
        reportGroup: string,
        reportSelectedDate: string
    ) => {
        let selectedReport: any[] = [];
        reportData.forEach((report: any) => {
            selectedReport.push(report.return_code);
        });
        //change url
        let endpoint = `${process.env.apiUrl}/api/v1/download/`;
        selectedReport
            .filter((item) => !item.startsWith('QDFIR400'))
            .filter((item) => !item.startsWith('QDFIR450'))
            .filter((item) => !item.startsWith('MDFIR450'))
            .filter((item) => !item.startsWith('MDFIR400'))
            .forEach((item) => {
                endpoint += item;
                endpoint += ',';
            });

        if (reportGroup === 'Q') {
            endpoint += 'QDFIR400,QDFIR450';
        }

        if (reportGroup === 'M') {
            endpoint += 'MDFIR400,MDFIR450';
        }

        try {
            const response = await fetch(endpoint);
            const blob = await response.blob();
            // console.log(blob);
            const a = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            a.href = objectUrl;
            a.download = 'Reports downloaded for' + reportSelectedDate + '.zip';
            a.click();
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error('Error downloading reports:', error);
        }
    };

    const getReportInformation = useCallback(
        async (sheetName: string, selectedDate: string) => {
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
            try {
                const response = await fetchWrapper.get(
                    `${BASEAPI_EXTENSION.BASEAPI}${sheetName}/${selectedDate}`
                );
                console.log(response)
                // Temporary until the response is given a generic name like "data"
                if (response.responseCode === 0) {
                    const modifiedSheetName =
                        removeFirstFiveCharacters(sheetName);
                    // console.log(modifiedSheetName);
                    // Check if modifiedSheetName is not null before using it
                    if (modifiedSheetName !== null) {
                        if (specialReportNumbers.includes(modifiedSheetName)) {
                            const reportWithUnderScore =
                                replaceDot(modifiedSheetName);
                            const dynamicPropertyName = `sheet${reportWithUnderScore}`;
                            setReportInformation(response[dynamicPropertyName]);
                            return;
                        }
                        switch (sheetName) {
                            case 'mcfpr1':
                                console.log(response['sheetMcfpr1']);
                                setReportInformation(response['sheetMcfpr1']);
                                return;
                            case 'qcfpr1':
                                setReportInformation(response['Qcfpr1']);
                                return;
                            case 'qstdr1':
                                setReportInformation(response['Qstdr001']);
                                return;
                            case 'mstdr1':
                                setReportInformation(response['sheet001']);
                                return;
                            case 'mstdr2':
                                setReportInformation(response['sheet002']);
                                return;
                            default:
                                //reports with consistent format
                                // Dynamically construct the property name for response.sheet
                                const dynamicPropertyName = `sheet${modifiedSheetName}`;
                                // Access the dynamically named property
                                setReportInformation(
                                    response[dynamicPropertyName]
                                );
                        }
                    } else {
                        // Handle the case where modifiedSheetName is null
                        console.error('modifiedSheetName is null');
                        setReportInformation([]);
                    }
                } else {
                    setReportInformation([]);
                }
            } catch (error) {
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
        handleReportUpload,
        handleDownloadReports,
    };
};
