'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import styles from './index.module.scss';
// import MonthPicker from "../../components/MonthPicker";
import Filter from '../../components/FilterBy';
import { ReportData } from '../../interfaces';
import { FaDownload } from 'react-icons/fa';
import { useGenerateReportActions } from '../../actions/GenerateReport';
import { useRecoilValue } from 'recoil';
import {
    generateReportAtom,
    selectedDateAtom,
    selectedGroupAtom,
} from '../../state/generateReport';
import { PaginatedTable } from '@/components/PaginatedTable';
import { useRouter } from 'next/navigation';
import { ReportPageProps } from '@/interfaces';
import { options } from '../../components/FilterBy/dommy';
import { LoadingScreen } from '../../components/LoadingScreen';
import { BiShow } from 'react-icons/bi';
import { FaUpload } from 'react-icons/fa';
import SnackbarComponent from '../../components/Snackbar';
import { UploadDialog } from '../../components/UploadDialog';
import PageContent from '../../components/PageContent';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const ContentSection = ({
    loading,
    setLoading,
    spinner,
    setSpinner,
}: ReportPageProps) => {
    const { handleDownloadReports, handleReportUpload } =
        useGenerateReportActions();
    const selectedDate = useRecoilValue(selectedDateAtom);
    const { push } = useRouter();
    const reportData = useRecoilValue(generateReportAtom);
    const reportGroup = useRecoilValue(selectedGroupAtom);
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');
    const [isopen, setIsOpen] = useState(false);
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<any>();
    const [reportId, setReportId] = useState<string>('');

    //DIALOG PROPS
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [snackBarColor, setSnackbarColor] = useState<string>('');

    const uploadableReports: string[] | null = [
        'MDFIR223',
        'MDFIR271',
        'MDFIR291',
        'MDFIR311',
        'MDFIR333',
        'MDFIR371.3',
        'MDFIR372',
        'MDFIR382',
        'MDFIR533',
        'MDFIR101',
        'MDFIR250',
        'MDFIR600',
        'MDFIR601',
        'MDFIR1300',
        'MDFIR1301',
        'MDFIR1600',
        'MDFIR1700',
        'MDFIR920',
        'MDFIR921',
        'MCFPR1',
    ];

    const downloadXmlReports = async () => {
        if (reportData.length <= 0) {
            setIsOpen(true);
            setSnackbarMessage(
                'Report must be generated before you click on download!'
            );
            return;
        }
        setIsOpen(true);
        setSnackbarColor('#006c33');
        setSnackbarMessage('Download in progress, please wait');
        const response = await handleDownloadReports(
            reportData,
            reportGroup,
            selectedDate
        );
    };
    const handleClose = () => {
        setIsOpen(false);
        setFile({});
    };

    const openUploadModal = (reportdId: string) => {
        setOpenModal(true);
        setReportId(reportdId);
        setFileName('');
        setFile({});
    };

    const uploadReport = async () => {
        const response = await handleReportUpload(file, reportId);
        if (response.status === 200) {
            setIsOpen(true);
            setSnackbarColor('#006c33');
            setSnackbarMessage(response.Message || response.message);
        } else {
            setIsOpen(true);
            setSnackbarColor('');
            setSnackbarMessage(response.message || 'An error occured');
        }
    };
    const getFileFromMachine = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            setFile(fileList[0]);
            const fileName = fileList[0].name;
            setFileName(fileName);
        }
    };

    return (
        <div className={styles['contentContainer']}>
            {openModal && (
                <UploadDialog
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    handleAction={uploadReport}
                    handleInputchange={getFileFromMachine}
                    error={error}
                    errorText={errorText}
                    fileName={fileName}
                />
            )}
            <SnackbarComponent
                handleClose={handleClose}
                isopen={isopen}
                message={SnackbarMessage}
                color={snackBarColor}
            />
            <div>
                <PageContent showFilter={false}>
                    <div className={styles['rightSide']}>
                        <div
                            onClick={downloadXmlReports}
                            className={styles['reportButton']}
                        >
                            Download Report
                            <FaDownload />
                        </div>
                    </div>

                    <PaginatedTable<ReportData>
                        headers={[
                            'Report Code',
                            'Report Description',
                            'Action',
                            '',
                        ]}
                        data={reportData}
                        loading={spinner}
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
                                            className={styles['actionButton']}
                                            onClick={() =>
                                                push(
                                                    `/generate-report/${data.return_code}?selectedDate=${selectedDate}`
                                                )
                                            }
                                        >
                                            <BiShow size={20} />
                                            View
                                        </div>
                                    );
                                },
                                width: '10%',
                            },

                            {
                                render: (data, index) => {
                                    return uploadableReports.includes(
                                        data.sheet_number
                                    ) ? (
                                        <div
                                            className={styles['actionButton']}
                                            onClick={() =>
                                                openUploadModal(
                                                    data.sheet_number
                                                )
                                            }
                                        >
                                            <FaUpload size={18} />
                                            Upload
                                        </div>
                                    ) : (
                                        ''
                                    );
                                },
                                width: '10%',
                            },
                        ]}
                    />
                </PageContent>
                {/* <SearchBar />
                <Filter
                    options={options}
                    defaultOption={''}
                    onSelect={(selectedValue) => console.log(selectedValue)}
                />
               */}
            </div>
        </div>
    );
};
