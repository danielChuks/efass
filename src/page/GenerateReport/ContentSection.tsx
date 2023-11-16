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
// import { mockData } from '../../components/PaginatedTable/mock';
// import { SettingsButton } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { ReportPageProps } from '@/interfaces';
// import { mockData } from '@/components/PaginatedTable/mock';
import { options } from '../../components/FilterBy/dommy';
import { LoadingScreen } from '../../components/LoadingScreen';
import { BiShow } from 'react-icons/bi';
import { FaUpload } from 'react-icons/fa';
import SnackbarComponent from '../../components/Snackbar';
import { UploadDialog } from '../../components/UploadDialog';

export const ContentSection = ({
    loading,
    setLoading,
    spinner,
    setSpinner,
}: ReportPageProps) => {
    const { handleDownloadReports } = useGenerateReportActions();
    const selectedDate = useRecoilValue(selectedDateAtom);
    const { push } = useRouter();
    const reportData = useRecoilValue(generateReportAtom);
    const reportGroup = useRecoilValue(selectedGroupAtom);
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');
    const [isopen, setIsOpen] = useState(false);
    const [fileName, setFileName] = useState<string>('');

    //DIALOG PROPS
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');

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

    const downloadXmlReports = () => {
        if (reportData.length <= 0) {
            setIsOpen(true);
            setSnackbarMessage(
                'Report must be generated before you click on download!'
            );
            return;
        }
        const response = handleDownloadReports(
            reportData,
            reportGroup,
            selectedDate
        );
        console.log(response);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    const handleReportUpload = () => {
        console.log('uploadddddd');
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            console.log(fileList[0]);
            const fileName = fileList[0].name;
            setFileName(fileName);
            console.log('Selected file name:', fileName);
        }
    };

    return (
        <div className={styles['contentContainer']}>
            {openModal && (
                <UploadDialog
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    handleAction={handleReportUpload}
                    handleInputchange={handleFileUpload}
                    error={error}
                    errorText={errorText}
                    fileName={fileName}
                />
            )}
            <SnackbarComponent
                handleClose={handleClose}
                isopen={isopen}
                message={SnackbarMessage}
            />

            <div className={styles['contentTopSection']}>
                <SearchBar />
                <Filter
                    options={options}
                    defaultOption={''}
                    onSelect={(selectedValue) => console.log(selectedValue)}
                />
                <div className={styles['rightSide']}>
                    <div
                        onClick={downloadXmlReports}
                        className={styles['reportButton']}
                    >
                        Download Report
                        <FaDownload />
                    </div>
                </div>
            </div>
            {spinner ? (
                <LoadingScreen />
            ) : (
                <PaginatedTable<ReportData>
                    headers={[
                        'Report Code',
                        'Report Description',
                        'Action',
                        '',
                    ]}
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
                                        onClick={() => setOpenModal(true)}
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
            )}

            {/* <PaginatedTable<ReportData>
                headers={Object.keys(mockData[0]).filter(
                    (val) => val !== 'serial_number'
                ).map((val) => val.split('_').join(' '))}
                data={mockData}
                loading={false}
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
