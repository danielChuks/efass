'use client';
import React, { useState, useEffect } from 'react';
import { PaginatedTable } from '@/components/PaginatedTable';
import styles from './index.module.scss';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/FilterBy';
import { CustomButton } from '@/components/Button';
import { GL, CustomGL } from '@/interfaces';
import { BsPlusLg } from 'react-icons/bs';
// import { dummyData } from './data';
import { GlDialog } from '@/components/GlDialog';
import PageContent from '../../components/PageContent';
import { useGlMapppingActions } from '../../actions/glmapping';
import SnackbarComponent from '../../components/Snackbar';

function GlMappingContent() {
    const handleAddNewGl = async () => {
         const addData = {
             itemCode: data?.itemCode,
             itemDesc: data?.itemDescription,
             ledgerNo: data?.ledgerNumber,
             statementCode: data?.statementCode,
             statementDesc: data?.statementDescription,
         };
        const response = await postGlData(addData);
        try {
            if (response?.data) {
                console.log('added succesfully');
                setSnackbarMessage('Added succesfully');
                setSnackbarColor('#006c33');
                fetchAllGlData();
                setOpenModal(false)
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
    const [modalAction, setModalAction] = useState(() => handleAddNewGl);
    const [data, setData] = useState<CustomGL>({
        statementCode: '',
        statementDescription: '',
        itemCode: '',
        itemDescription: '',
        ledgerNumber: '',
    });
    const [allGlData, setAllGlData] = useState([]);
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackBarColor, setSnackbarColor] = useState<string>('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

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
    };

    const fetchItemDescription = async (itemCode: string) => {
        const response = await getItemDescription(itemCode);
        console.log(response);
        try {
            if (response?.data) {
                setData({
                    ...data,
                    itemDescription: response?.data,
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
                    statementDescription: response?.data,
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
            statementDescription: '',
            itemCode: '',
            itemDescription: '',
            ledgerNumber: '',
        });
        setModalAction(() => handleAddNewGl);
    };
    const openEditModal = (data: CustomGL) => {
        setTypeOfModal('editModal');
        setModalHeader('Edit Details');
        setData({
            statementCode: data.statementCode,
            statementDescription: data.statementDescription,
            itemCode: data.itemCode,
            itemDescription: data.itemDescription,
            ledgerNumber: data.ledgerNumber,
        });
        console.log(data);
        setOpenModal(true);
        setModalAction(() => editGl(data));
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
                setSnackbarMessage('Unable to fetch data, please try again later');
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
                    handleAction={modalAction}
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
                                    return data.statementDescription;
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
                                    return data.itemDescription;
                                },
                                width: '15%',
                            },
                            {
                                render: (data, index) => {
                                    return data.ledgerNumber;
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
