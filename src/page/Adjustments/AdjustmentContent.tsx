'use client';
import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '@/components/PaginatedTable';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/FilterBy';
import styles from './index.module.scss';
import { AdjustmentDataDialog } from './AdjustmentDataDialog';
import { useAdjustmentAction } from '../../actions/adjustment';
import { useRecoilValue } from 'recoil';
import { memoAdjustmentAtom } from '../../state/adjustment';
import { AdjustmentData } from '@/interfaces';
import { useParams } from 'next/navigation';
import PageContent from '../../components/PageContent';
import { FaUpload } from 'react-icons/fa';
import { UploadDialog } from '../../components/UploadDialog';
import SnackbarComponent from '../../components/Snackbar';
import { LoadingScreen } from '../../components/LoadingScreen';

export function AdjustmentContent() {
    // const { id } = useParams();
    // Destructure hooks from useAdjustmentAction
    const { getMemoData, updateMemoData, uploadMemoData } =
        useAdjustmentAction();

    // Get memoData using Recoil state
    const memoData = useRecoilValue(memoAdjustmentAtom);

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
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [fileName, setFileName] = useState<string>('');
    const [file, setFile] = useState<any>();
    const [loading, setLoading] = useState(false);

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
            window.location.reload();
            setLoading(true);
        } catch (error) {
            return error;
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setFile({});
    };

    const handleReportUpload = async () => {
        const response = await uploadMemoData(file);
        setIsOpen(true);
        setSnackbarMessage('Upload failed');
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            console.log(fileList[0]);
            setFile(fileList[0]);
            const fileName = fileList[0].name;
            setFileName(fileName);
            console.log('Selected file name:', fileName);
        }
    };

    const openUploadModal = () => {
        setUploadModal(true);
        setFileName('');
        setFile({});
    };

    // Render the component
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
                        <div className={styles["rightSide"]}>
				<div onClick={openUploadModal} className={styles["reportButton"]}>
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
                    'EDIT',
                ]}
                data={memoData}
                columns={[
                    { render: (data) => data.gl_code },
                    { render: (data) => data.gl_description, width: '20%' },
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
