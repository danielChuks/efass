import { useCallback } from 'react';
import { useFetchWrapper } from '../../hooks/useFetchWrapper';
import { useSetRecoilState } from 'recoil';
import {
    generateReportAtom,
    generateReportInformationAtom,
} from '../../state/generateReport';
import { BASEAPI_EXTENSION } from '../../enums';
import { ReportData } from '../../interfaces';

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
            async (reportData:any, reportGroup:string, reportSelectedDate:string) => {
                try {
                    let selectedReport = reportData.map(
                        (report:any) => report.return_code
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
                    console.log(blob)

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
        postCbnDate,
        handleDownloadReports,
    };
};
