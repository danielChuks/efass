'use client';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import styles from './index.module.scss';
import Filter from '../../components/FilterBy';
import { ReportData } from '../../interfaces';
import { FaDownload } from 'react-icons/fa';
import { useGenerateReportActions } from '../../actions/GenerateReport';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    generateReportAtom,
    selectedDateAtom,
    selectedGroupAtom,
    defaultReportDataAtom,
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
    const setReportData = useSetRecoilState(generateReportAtom);
    const defaultData = useRecoilValue(defaultReportDataAtom);
    // const setDefaultData = useSetRecoilState(defaultReportDataAtom);
    const reportGroup = useRecoilValue(selectedGroupAtom);
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');
    const [isopen, setIsOpen] = useState(false);
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<any>();
    const [reportId, setReportId] = useState<string>('');
    const [searchValue, setSearchValue] = useState<string>('');
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
        'MDFIR100',
    ];

    useEffect(() => {
        setReportData([]);
    }, []);

    // console.log(reportData);

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
        try {
            if (response?.status === 200) {
                setSnackbarMessage('Download completed');
                setSnackbarColor('#006c33');
                setTimeout(() => {
                    setIsOpen(false);
                }, 10000);
            } else {
                setSnackbarMessage('An error occured, please try again later');
                setSnackbarColor('');
                setTimeout(() => {
                    setIsOpen(false);
                }, 10000);
            }
        } catch (error) {
            setSnackbarMessage('An error occured, please try again later');
            setSnackbarColor('');
            setTimeout(() => {
                setIsOpen(false);
            }, 10000);
        }
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSearchValue(e.target.value);
        if (e.target.value) {
            // Filter reportData based on the lowercase search value in the return_code field
            const filteredData = reportData.filter((item) =>
                item.return_code
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
            setReportData(filteredData);
        } else {
            //set state to default data if search input is not valid
            setReportData(defaultData);
        }
    };

    // console.log(reportData);
    return (
        <div className={styles['content-Container']}>
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
            <div className={styles['contentTopSection']}>
                <SearchBar
                    handleSearchChange={handleSearchChange}
                    searchValue={searchValue}
                    placeHolder={'Enter report code'}
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
            <PaginatedTable<ReportData>
                headers={['Report Code', 'Report Description', 'Action', '']}
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
                            return data.return_name;
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
                                            `/generate-report?reportId=${data.return_code}&selectedDate=${selectedDate}`
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
                                        openUploadModal(data.sheet_number)
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
        </div>
    );
};
