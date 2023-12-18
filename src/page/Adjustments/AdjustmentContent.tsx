'use client';
import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '@/components/PaginatedTable';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/FilterBy';
import styles from './index.module.scss';
import { AdjustmentDataDialog } from './AdjustmentDataDialog';
import { useAdjustmentAction } from '../../actions/adjustment';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
    memoAdjustmentAtom,
    defaultAdjustmentAtom,
} from '../../state/adjustment';
import { AdjustmentData } from '@/interfaces';
import { useParams } from 'next/navigation';
import PageContent from '../../components/PageContent';
import { FaUpload } from 'react-icons/fa';
import { UploadDialog } from '../../components/UploadDialog';
import SnackbarComponent from '../../components/Snackbar';
import { LoadingScreen } from '../../components/LoadingScreen';

export function AdjustmentContent() {
    const { getMemoData, updateMemoData, uploadMemoData } =
        useAdjustmentAction();
    const memoData = useRecoilValue(memoAdjustmentAtom);
    const defaultAdjustmentData = useRecoilValue(defaultAdjustmentAtom);
    const setMemoData = useSetRecoilState(memoAdjustmentAtom);
    const [openModal, setOpenModal] = useState(false);
    const [modalHeader, setModalHeader] = useState('Add New');
    const [typeOfModal, setTypeOfModal] = useState<string>('');
    const [data, setData] = useState<AdjustmentData>({
        gl_code: '',
        gl_description: '',
        dr_cr_ind: '',
        amount: '',
        period: '',
        year: '',
        status: '',
    });
    const [UploadModal, setUploadModal] = useState(false);
    const [error, setError] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('all');
    const [loader, setLoader] = useState<boolean>(false);

    //snackbar state
    const [snackBarColor, setSnackbarColor] = useState<string>('');
    const [isopen, setIsOpen] = useState<boolean>(false);
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');
    // Fetch memoData on component mount
    const fetchData = async () => {
        try {
            await getMemoData();
        } catch (error) {}
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const openEditModal = (memoData: AdjustmentData) => {
        setTypeOfModal('editModal');
        setModalHeader('Edit Details');
        setData({ ...memoData });
        setOpenModal(true);
    };

    const submit = async () => {
        try {
            await updateMemoData(data.id, data);
            setOpenModal(false);
            fetchData();
            setLoading(true);
            setIsOpen(true);
            setSnackbarColor('#006c33');
            setSnackbarMessage('updated successfully');
            setUploadModal(false);
            setTimeout(() => {
                setIsOpen(false);
            }, 3000);
        } catch (error) {
            return error;
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setFile({});
    };

    const handleReportUpload = async () => {
        setLoader(true);
        const response = await uploadMemoData(file);
        try {
            if (response.status === 200) {
                setLoader(false);
                setIsOpen(true);
                setSnackbarColor('#006c33');
                setSnackbarMessage(response?.message);
                setUploadModal(false);
                setTimeout(() => {
                    setIsOpen(false);
                }, 3000);
                fetchData();
            } else {
                setLoader(false);
                setIsOpen(true);
                setSnackbarColor('');
                setSnackbarMessage(response?.message);
                // setSnackbarMessage(
                //     'Unable to upload file, please try again later'
                // );
                setUploadModal(false);
                setTimeout(() => {
                    setIsOpen(false);
                }, 3000);
            }
        } catch (error) {
            setLoader(false);
            setIsOpen(true);
            setSnackbarColor('');
            setSnackbarMessage('An error occured, please try again later');
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

    const openUploadModal = () => {
        setUploadModal(true);
        setFileName('');
        setFile({});
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
        if (event.target.value === 'all') {
            setMemoData(defaultAdjustmentData);
        } else if (event.target.value === 'posted') {
            const postedData = defaultAdjustmentData.filter(
                (item) => item?.status?.toUpperCase() === 'P'
            );
            setMemoData(postedData);
        } else if (event.target.value === 'not_posted') {
            const notPostedData = defaultAdjustmentData.filter(
                (item) => item?.status?.toUpperCase() === 'N'
            );
            setMemoData(notPostedData);
        }
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
                    loader={loader}
                />
            )}
            <SnackbarComponent
                handleClose={handleClose}
                isopen={isopen}
                message={SnackbarMessage}
                color={snackBarColor}
            />
            {openModal && (
                <AdjustmentDataDialog
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    handleAction={submit}
                    header={modalHeader}
                    data={data}
                    setData={setData}
                    handleInputchange={handleInputChange}
                    error={false}
                    errorText=""
                />
            )}
            <div className={styles['content_header']}>
                <PageContent>
                    <div className={styles['rightSide']}>
                        <div className={styles['selectContainer']}>
                            <select
                                className={styles['select']}
                                name={'filter'}
                                onChange={handleChange}
                                value={filter}
                            >
                                <option value="">--- Filter by ---</option>
                                <option value="all">All</option>
                                <option value="posted">Posted</option>
                                <option value="not_posted">Not posted</option>
                            </select>
                        </div>

                        <div
                            onClick={openUploadModal}
                            className={styles['reportButton']}
                        >
                            Upload
                            <FaUpload />
                        </div>
                    </div>
                    <PaginatedTable<AdjustmentData>
                        headers={[
                            'GL-CODE',
                            'GL DESCRIPTION',
                            'DR-CR-IND',
                            'AMOUNT',
                            'PERIOD',
                            'YEAR',
                            'STATUS',
                            'ACTION',
                        ]}
                        data={memoData}
                        columns={[
                            { render: (data) => data.gl_code },
                            {
                                render: (data) => data.gl_description,
                                width: '20%',
                            },
                            { render: (data) => data.dr_cr_ind },
                            { render: (data) => data.amount, width: '15%' },
                            { render: (data) => data.period, width: '15%' },
                            { render: (data) => data.year, width: '15%' },
                            { render: (data) => data.status, width: '15%' },
                            {
                                render: (data) => (
                                    <div
                                        className={styles['viewButton']}
                                        onClick={() => openEditModal(data)}
                                    >
                                        Edit
                                    </div>
                                ),
                                width: '10%',
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
