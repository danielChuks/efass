'use client';
import React, { useState, useEffect } from 'react';
import { PaginatedTable } from '@/components/PaginatedTable';
import styles from './index.module.scss';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/FilterBy';
import { CustomButton } from '@/components/Button';
import {  CustomGL } from '@/interfaces';
import { BsPlusLg } from 'react-icons/bs';
// import { dummyData } from './data';
import { GlDialog } from '@/components/GlDialog';
import PageContent from '../../components/PageContent';
import { useGlMapppingActions } from '../../actions/glmapping';
import SnackbarComponent from '../../components/Snackbar';

function GlMappingContent() {
    const {
        getStatementDescription,
        getItemDescription,
        postGlData,
        getAllGlData,
    } = useGlMapppingActions();
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [typeOfModal, setTypeOfModal] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalHeader, setModalHeader] = useState('Add New');
    // const [modalAction, setModalAction] = useState(() => handleAddNewGl);
    const [status, setStatus] = useState(false);
    const [data, setData] = useState<CustomGL>({
        statementCode: '',
        statementDesc: '',
        itemCode: '',
        itemDesc: '',
        ledgerNo: '',
    });
    const [allGlData, setAllGlData] = useState([]);
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackBarColor, setSnackbarColor] = useState<string>('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const handleAddNewGl = async () => {
        console.log(data)
        const response = await postGlData(data);
        try {
            if (response?.data) {
                console.log('added succesfully');
                setSnackbarMessage('Added succesfully');
                setSnackbarColor('#006c33');
                fetchAllGlData();
                setOpenModal(false);
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 10000);
            } else {
                setSnackbarMessage('An error occured, please try again later');
                setSnackbarColor('');
                setOpenModal(false);
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 7000);
            }
        } catch (error) {
            setOpenModal(false);
            setSnackbarMessage('An error occured, please try again later');
            setSnackbarColor('');
            setTimeout(() => {
                setIsSnackbarOpen(false);
            }, 7000);
        }
    };

   
    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'itemCode') {
            fetchItemDescription(e.target.value);
            return;
        }
        if (e.target.name === 'statementCode') {
            fetchStatementDescription(e.target.value);
            return;
        }
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data)
    };

    const fetchItemDescription = async (itemCode: string) => {
        const response = await getItemDescription(itemCode);
        console.log(response);
        try {
            if (response?.data) {
                setData({
                    ...data,
                    itemDesc: response?.data,
                    itemCode: itemCode,
                });
            } else {
                setIsSnackbarOpen(true);
                setSnackbarColor('');
                setSnackbarMessage(
                    'Unable to generate description for the selected item code, please try again later'
                );
            }
        } catch (error) {
            return error;
        }
    };

    const fetchStatementDescription = async (statementCode: string) => {
        const response = await getStatementDescription(statementCode);
        try {
            if (response?.data) {
                setData({
                    ...data,
                    statementDesc: response?.data,
                    statementCode: statementCode,
                });
            } else {
                setSnackbarMessage(
                    'Unable to generate description for the selected statement code, please try again later'
                );
            }
        } catch (error) {
            return error;
        }
    };

    //listen for click on add button
    const openAddModal = () => {
        setTypeOfModal('');
        setModalHeader('Add New');
        setOpenModal(true);
        setData({
            statementCode: '',
            statementDesc: '',
            itemCode: '',
            itemDesc: '',
            ledgerNo: '',
        });
        setStatus(true)
    };
    const openEditModal = (data: CustomGL) => {
        setTypeOfModal('editModal');
        setModalHeader('Edit Details');
        setData({
            statementCode: data.statementCode,
            statementDesc: data.statementDesc,
            itemCode: data.itemCode,
            itemDesc: data.itemDesc,
            ledgerNo: data.ledgerNo,
        });
        console.log(data);
        setOpenModal(true);
        setStatus(false)
    };
    const editGl = async (data: CustomGL) => {
        const response = await postGlData(data);
    };

    const fetchAllGlData = async () => {
        const response = await getAllGlData();
        try {
            if (response?.data) {
                setAllGlData(response?.data);
            } else {
                setAllGlData([]);
                setSnackbarMessage(
                    'Unable to fetch data, please try again later'
                );
                setSnackbarColor('');
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 10000);
            }
        } catch (error) {
            setAllGlData([]);
            setSnackbarMessage('Unable to fetch data, please try again later');
            setSnackbarColor('');
            setTimeout(() => {
                setIsSnackbarOpen(false);
            }, 10000);
        }
    };

    const handleClose = () => {
        setIsSnackbarOpen(false);
    };

    useEffect(() => {
        fetchAllGlData();
    }, []);

    return (
        <div className={styles['content']}>
            {openModal && (
                <GlDialog
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    handleAction={status ? handleAddNewGl : editGl}
                    header={modalHeader}
                    data={data}
                    setData={setData}
                    handleInputchange={handleInputchange}
                    error={error}
                    errorText={errorText}
                    typeOfModal={typeOfModal}
                    SnackbarMessage={SnackbarMessage}
                    snackBarColor={snackBarColor}
                    isSnackbarOpen={isSnackbarOpen}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarColor={setSnackbarColor}
                    setIsSnackbarOpen={setIsSnackbarOpen}
                />
            )}
            <SnackbarComponent
                handleClose={handleClose}
                isopen={isSnackbarOpen}
                message={SnackbarMessage}
                color={snackBarColor}
            />

            <div className={styles['content_header']}>
                <PageContent>
                    <div className={styles['rightSide']}>
                        <div
                            onClick={openAddModal}
                            className={styles['reportButton']}
                        >
                            Add New
                            <BsPlusLg />
                        </div>
                    </div>

                    <PaginatedTable<CustomGL>
                        headers={[
                            'STATEMENT CODE',
                            'STATEMENT DESCRIPTION',
                            'ITEM CODE',
                            'ITEM DESCRIPTION',
                            'LEDGER NUMBER',
                            'ACTION',
                        ]}
                        data={allGlData}
                        // loading={loading}
                        columns={[
                            {
                                render: (data, index) => {
                                    return data.statementCode;
                                },
                            },
                            {
                                render: (data, index) => {
                                    return data.statementDesc;
                                },
                                width: '20%',
                            },
                            {
                                render: (data, index) => {
                                    return data.itemCode;
                                },
                                // width: '50%',
                            },
                            {
                                render: (data, index) => {
                                    return data.itemDesc;
                                },
                                width: '15%',
                            },
                            {
                                render: (data, index) => {
                                    return data.ledgerNo;
                                },
                                // width: '50%',
                            },
                            {
                                render: (data, index) => {
                                    return (
                                        <div
                                            className={styles['viewButton']}
                                            onClick={() => {
                                                openEditModal(data);
                                            }}
                                        >
                                            View Details
                                        </div>
                                    );
                                },
                                width: '10%',
                            },
                        ]}
                    />
                </PageContent>
                {/* <div className={styles["search"]}>
					<SearchBar />
					<Filter options={[]} />
				</div> */}
            </div>
        </div>
    );
}

export default GlMappingContent;
