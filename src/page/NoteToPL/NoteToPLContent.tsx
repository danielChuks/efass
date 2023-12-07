'use client';
import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '@/components/PaginatedTable';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/FilterBy';
import styles from './index.module.scss';
import { useRecoilValue } from 'recoil';
import { AdjustmentData } from '@/interfaces';
import { useParams } from 'next/navigation';
import PageContent from '../../components/PageContent';
import { FaUpload } from 'react-icons/fa';
import { UploadDialog } from '../../components/UploadDialog';
import SnackbarComponent from '../../components/Snackbar';
import { LoadingScreen } from '../../components/LoadingScreen';
import { NoteToPlData } from '../../interfaces/note-to-pl.interface';
import { noteToPlAtom } from '../../state/noteToPl';
import { useNoteToPLAction } from '../../actions/noteToPl';

export function NoteToPLContent() {
    const { getNoteToPLData, uploadNoteToPLData } =
        useNoteToPLAction();

    const memoData = useRecoilValue(noteToPlAtom);

    const [openModal, setOpenModal] = useState(false);
    const [modalHeader, setModalHeader] = useState('Add New');
    const [typeOfModal, setTypeOfModal] = useState<string>('');
    const [NoteToPLData, setNoteToPLData] = useState<
    NoteToPlData[]
    >([]);
    const [data, setData] = useState<NoteToPlData[]>([]);
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
        const response = await getNoteToPLData();
        try {
            if (response.status === 200) {
                console.log(response?.data);
                setNoteToPLData(response?.data);
            } else {
                setIsOpen(true);
                setSnackbarColor('');
                setSnackbarMessage(
                    'An error occured while fetching, please try again later'
                );
                setTimeout(() => {
                    setIsOpen(false);
                }, 5000);
                setNoteToPLData([]);
            }
        } catch (error) {
            setTimeout(() => {
                setIsOpen(false);
            }, 5000);
            setSnackbarColor('');
            setSnackbarMessage('An error occured');
            setNoteToPLData([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setFile({});
    };

    const handleReportUpload = async () => {
        const response = await uploadNoteToPLData(file);
        try {
            if (response.status === 200) {
                setIsOpen(true);
                setSnackbarColor('#006c33');
                setSnackbarMessage(response?.message);
                  setUploadModal(false);
                  setTimeout(() => {
                      setIsOpen(false);
                  }, 3000);
                fetchData();
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
            {/* {openModal && (
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
            )} */}
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
                    <PaginatedTable<NoteToPlData>
                        headers={[
                            'GL-ACCOUNT',
                            'GL DESCRIPTION',
                            'CURRENT BALANCE',
                            'PREVIOUS BALANCE',
                        ]}
                        data={[]}
                        columns={[
                            { render: (data) => data.gl_account, width: '20%', },
                            {
                                render: (data) => data.gl_description,
                                width: '20%',
                            },
                            { render: (data) => data.current_balance, width: '20%' },
                            { render: (data) => data.previous_balance, width: '20%'}
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
