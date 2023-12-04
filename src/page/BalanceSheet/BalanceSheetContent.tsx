'use client';
import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '@/components/PaginatedTable';
import styles from './index.module.scss';
import { useBalanceSheetAction } from '../../actions/balanceSheet';
import { BalanceSheetData } from '@/interfaces';
import PageContent from '../../components/PageContent';
import { FaUpload } from 'react-icons/fa';
import { UploadDialog } from '../../components/UploadDialog';
import SnackbarComponent from '../../components/Snackbar';
function BalanceSheetContent() {
    const { getBalanceSheetData, uploadBalanceSheet } = useBalanceSheetAction();
    const [balanceSheetData, setBalanceSheetData] = useState<
        BalanceSheetData[]
    >([]);
    const [UploadModal, setUploadModal] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('all');
    const [data, setData] = useState<BalanceSheetData>({
        gl_account: '',
        gl_description: '',
        gl_balance: '',
    });

    //snackbar state
    const [snackBarColor, setSnackbarColor] = useState<string>('');
    const [isopen, setIsOpen] = useState<boolean>(false);
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');

    useEffect(() => {
        fetchBalanceSheetData();
    }, []);

    const fetchBalanceSheetData = async () => {
        const response = await getBalanceSheetData();
        try {
            if (response.status === 200) {
                setBalanceSheetData(response?.data || response);
            } else {
                setIsOpen(true);
                setSnackbarColor('');
                setSnackbarMessage(
                    response?.message ||
                        'An error occured while fetching, please try again later'
                );
                setTimeout(() => {
                    setIsOpen(false);
                }, 5000);
                setBalanceSheetData([]);
            }
        } catch (error) {
            setTimeout(() => {
                setIsOpen(false);
            }, 5000);
            setSnackbarColor('');
            setSnackbarMessage('An error occured');
            setBalanceSheetData([]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleReportUpload = async () => {
        const response = await uploadBalanceSheet(file);
        try {
            if (response.status === 200) {
                setIsOpen(true);
                setSnackbarColor('#006c33');
                setSnackbarMessage(response?.message);
                setUploadModal(false);
                setTimeout(() => {
                    setIsOpen(false);
                }, 3000);
                //    fetchData();
            } else {
                setIsOpen(true);
                setSnackbarColor('');
                setSnackbarMessage(
                    'Unable to upload file, please try again later'
                );
                setUploadModal(false);
                setTimeout(() => {
                    setIsOpen(false);
                }, 3000);
            }
        } catch (error) {
            setIsOpen(true);
            setSnackbarColor('');
            setSnackbarMessage('An error occured');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            setFile(fileList[0]);
            const fileName = fileList[0].name;
            setFileName(fileName);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setFile({});
    };

    const openUploadModal = () => {
        setUploadModal(true);
        setFileName('');
        setFile({});
    };
    return (
        <div className={styles['content']}>
            {UploadModal && (
                <UploadDialog
                    openModal={UploadModal}
                    setOpenModal={setUploadModal}
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
                color={snackBarColor}
            />

            <div className={styles['content_header']}>
                <PageContent>
                    <div className={styles['rightSide']}>
                        <div
                            onClick={openUploadModal}
                            className={styles['reportButton']}
                        >
                            Upload
                            <FaUpload />
                        </div>
                    </div>
                    <PaginatedTable<BalanceSheetData>
                        headers={['GL-ACCOUNT', 'GL DESCRIPTION', 'GL BALANCE']}
                        data={[]}
                        columns={[
                            { render: (data) => data.gl_account },
                            {
                                render: (data) => data.gl_description,
                                width: '20%',
                            },
                        ]}
                    />
                </PageContent>
                {/* <div className={styles['search']}>
                    <SearchBar />
                    <Filter options={[]} />
                </div> */}
            </div>
        </div>
    );
}

export default BalanceSheetContent;
