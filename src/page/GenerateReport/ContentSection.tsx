"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import styles from "./index.module.scss";
// import MonthPicker from "../../components/MonthPicker";
import Filter from "../../components/FilterBy";
import { ReportData } from "../../interfaces";
import { FaDownload } from "react-icons/fa";
import { useGenerateReportActions } from "../../actions/GenerateReport";
import { useRecoilValue } from "recoil";
import {
    generateReportAtom,
    selectedDateAtom,
    selectedGroupAtom
} from "../../state/generateReport";
import { PaginatedTable } from "@/components/PaginatedTable";
// import { mockData } from '../../components/PaginatedTable/mock';
// import { SettingsButton } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { ReportPageProps } from '@/interfaces';

export const ContentSection = ({ loading, setLoading }: ReportPageProps) => {
    const {handleDownloadReports} = useGenerateReportActions()
    const selectedDate = useRecoilValue(selectedDateAtom);
    const { push } = useRouter();
    const reportData = useRecoilValue(generateReportAtom);
    const reportGroup = useRecoilValue(selectedGroupAtom);

    const downloadXmlReports = () => {
        // let selectedReport: any = [];
        // reportData.forEach((report) => {
        //     selectedReport.push(report.return_code);
        // });
        // //let endpoint = `${process.env.apiUrl}/download/MDFIR1200`;
        // let endpoint = `${process.env.apiUrl}/download/`;
        // selectedReport
        //     .filter((item: string) => !item.startsWith('QDFIR400'))
        //     .filter((item: string) => !item.startsWith('QDFIR450'))
        //     .filter((item: string) => !item.startsWith('MDFIR450'))
        //     .filter((item: string) => !item.startsWith('MDFIR400'))
        //     .forEach((item: string) => {
        //         endpoint += item;
        //         endpoint += ',';
        //     });

        // // console.log(endpoint)

        // if (reportGroup === 'Q') {
        //     endpoint += 'QDFIR400';
        //     endpoint += ', QDFIR450';
        // }

        // if (reportGroup === 'M') {
        //     endpoint += 'MDFIR400';
        //     endpoint += ',MDFIR450';
        // }

        // const response = await handleDownloadReports(endpoint)

    //     console.log(endpoint);
    //     this.download(endpoint).subscribe((blob) => {
    //         const a = document.createElement('a');
    //         const objectUrl = URL.createObjectURL(blob);
    //         a.href = objectUrl;
    //         a.download =
    //             'Reports downloaded for ' + this.reportSelectedDate + '.zip';
    //         a.click();
    //         URL.revokeObjectURL(objectUrl);
    //     });
    // };

    //  const download = (url: string) => {
    //     return this.http.get(url, {
    //       responseType: 'blob'
    //     });

    //  const download = (url: string): Observable<Blob> {
    //     return this.http.get(url, {
    //       responseType: 'blob'
    //     });
    }

    return (
        <div className={styles['contentContainer']}>
            <div className={styles['contentTopSection']}>
                <SearchBar />
                <Filter />
                <div className={styles['rightSide']}>
                    <div
                        // onClick={downloadXmlReports}
                        className={styles['reportButton']}
                    >
                        Download Report
                        <FaDownload />
                    </div>
                </div>
            </div>
            <PaginatedTable<ReportData>
                headers={['Report Code', 'Report Description', 'Action']}
                data={reportData}
                loading={loading}
                columns={[
                    {
                        render: (data, index) => {
                            return data.return_code;
                        },
                    },
                    {
                        render: (data, index) => {
                            return data.bank_name;
                        },
                        width: '50%',
                    },
                    {
                        render: (data, index) => {
                            return (
                                <div
                                    className={styles['viewButton']}
                                    onClick={() =>
                                        push(
                                            `/generate-report/${data.return_code}?selectedDate=${selectedDate}`
                                        )
                                    }
                                >
                                    View
                                </div>
                            );
                        },
                        width: '10%',
                    },
                ]}
            />

            {/* <PaginatedTable<ReportData>
                headers={Object.keys(mockData[0]).filter(
                    (val) => val !== 'serial_number'
                )}
                data={mockData}
                loading={loading}
                columns={Object.keys(mockData[0])
                    .filter((val) => val !== 'serial_number')
                    .map((key) => ({
                        render: (data, index) => {
                            return (data as any)[key];
                        },
                    }))}
            /> */}
        </div>
    );
};
