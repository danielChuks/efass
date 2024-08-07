'use client';
import React, { useState, useEffect } from 'react';
import { PaginatedTable } from '@/components/PaginatedTable';
import styles from './index.module.scss';
import { CustomGL } from '@/interfaces';
import { BsPlusLg } from 'react-icons/bs';
import { GlDialog } from '@/components/GlDialog';
import PageContent from '../../components/PageContent';
import { useGlMapppingActions } from '../../actions/glmapping';
import SnackbarComponent from '../../components/Snackbar';
import SearchBar from '../../components/SearchBar';

function GlMappingContent() {
    const {
        getStatementDescription,
        getItemDescription,
        postGlData,
        getAllGlData,
        deleteGlData,
        updateGlData,
        getItemCodes,
    } = useGlMapppingActions();
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [typeOfModal, setTypeOfModal] = useState<string>('');
    const [openDialogModal, setOpenDialogModal] = useState<boolean>(false);
    const [modalHeader, setModalHeader] = useState('Add New');
    const [data, setData] = useState<CustomGL>({
        statementCode: '',
        statementDesc: '',
        itemCode: '',
        itemDesc: '',
        ledgerNo: '',
    });
    const [itemCodes, setItemCodes] = useState([]);
    const [allGlData, setAllGlData] = useState<CustomGL[]>([]);
    const [SnackbarMessage, setSnackbarMessage] = useState<string>('');
    const [snackBarColor, setSnackbarColor] = useState<string>('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>('');
    useEffect(() => {
        fetchAllGlData();
    }, []);

    const handleAddNewGl = async () => {
        if (
            !data.statementCode ||
            !data.statementDesc ||
            !data.itemCode ||
            !data.itemDesc ||
            !data.ledgerNo
        ) {
            setSnackbarMessage('Please fill in all fields');
            setSnackbarColor('');
            setIsSnackbarOpen(true);
            return;
        }
        const response = await postGlData(data);

        try {
            if (response?.data) {
                setIsSnackbarOpen(true);
                setSnackbarMessage('Added succesfully');
                setSnackbarColor('#006c33');
                setOpenDialogModal(false);
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 10000);
                fetchAllGlData();
            } else {
                setIsSnackbarOpen(true);
                setSnackbarMessage(
                    response?.responseMessage ||
                        'An error occured, please try again later'
                );
                setSnackbarColor('');
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 7000);
            }
        } catch (error) {
            setIsSnackbarOpen(true);
            setSnackbarMessage(
                response?.responseMessage ||
                    'An error occured, please try again later'
            );
            setSnackbarColor('');
            setTimeout(() => {
                setIsSnackbarOpen(false);
            }, 7000);
        }
    };

    const fetchItemCodes = async (statementCode: string) => {
        const response = await getItemCodes(statementCode);
        try {
            if (response?.data) {
                setItemCodes(response?.data);
            } else {
                setItemCodes([]);
            }
        } catch (error) {
            setItemCodes([]);
        }
    };

    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'itemCode') {
            fetchItemDescription(data?.statementCode, e.target.value);
            return;
        }
        if (e.target.name === 'statementCode') {
            fetchStatementDescription(e.target.value.toString());
            fetchItemCodes(e.target.value.toString());
            return;
        }
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const fetchItemDescription = async (
        statementCode: string,
        itemCode: string
    ) => {
        const response = await getItemDescription(statementCode, itemCode);
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

    //open modal to add new data
    const openAddModal = () => {
        setTypeOfModal('');
        setModalHeader('Add New');
        setOpenDialogModal(true);
        setData({
            statementCode: '',
            statementDesc: '',
            itemCode: '',
            itemDesc: '',
            ledgerNo: '',
        });
    };

    //trigger modal with edit and delete
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
        setOpenDialogModal(true);
    };

    //fetch all gl data
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

    //delete data from dialog
    const deleteData = async (itemCode: string) => {
        const response = await deleteGlData(itemCode);
        try {
            if (response?.responseMessage) {
                setOpenDialogModal(false);
                setSnackbarColor('#006c33');
                setIsSnackbarOpen(true);
                setSnackbarMessage(response?.responseMessage);
                fetchAllGlData();
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 10000);
            } else {
                setIsSnackbarOpen(true);
                setSnackbarColor('');
                setSnackbarMessage(response?.message || 'An error occured');
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 7000);
            }
        } catch (error) {
            setIsSnackbarOpen(true);
            setSnackbarColor('');
            setSnackbarMessage(response?.message || 'An error occured');
            setTimeout(() => {
                setIsSnackbarOpen(false);
            }, 7000);
        }
    };

    //update data on dialog
    const updateData = async (data: CustomGL) => {
        if (
            !data.statementCode ||
            !data.statementDesc ||
            !data.itemCode ||
            !data.itemDesc ||
            !data.ledgerNo
        ) {
            setSnackbarMessage('Please fill in all fields');
            setSnackbarColor('');
            setIsSnackbarOpen(true);
            return; // Exit the function if validation fails
        }
        const response = await updateGlData(data);
        try {
            if (response?.data) {
                setOpenDialogModal(false);
                setSnackbarColor('#006c33');
                setIsSnackbarOpen(true);
                setSnackbarMessage('Data updated successfully');
                fetchAllGlData();
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 7000);
            } else {
                setIsSnackbarOpen(true);
                setSnackbarColor('');
                setSnackbarMessage(response?.message || 'An error occured');
                setTimeout(() => {
                    setIsSnackbarOpen(false);
                }, 7000);
            }
        } catch (error) {
            setIsSnackbarOpen(true);
            setSnackbarColor('');
            setSnackbarMessage(response?.message || 'An error occured');
            setTimeout(() => {
                setIsSnackbarOpen(false);
            }, 7000);
        }
    };

    const handleClose = () => {
        setIsSnackbarOpen(false);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setReportData(defaultData);
        setSearchValue(e.target.value);
        if (e.target.value) {
            // Filter reportData based on the lowercase search value in the return_code field
            const filteredData = allGlData.filter((item) =>
                item.statementCode
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
            setAllGlData(filteredData);
        } else {
            fetchAllGlData();
        }
    };
    return (
        <div className={styles['content']}>
            {openDialogModal && (
                <GlDialog
                    openModal={openDialogModal}
                    setOpenModal={setOpenDialogModal}
                    handleAction={handleAddNewGl}
                    header={modalHeader}
                    data={data}
                    setData={setData}
                    handleInputchange={handleInputchange}
                    error={error}
                    errorText={errorText}
                    typeOfModal={typeOfModal}
                    deleteData={deleteData}
                    updateData={updateData}
                    itemCodes={itemCodes}
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
                    <div className={styles['glHeader']}>
                        <SearchBar
                            handleSearchChange={handleSearchChange}
                            searchValue={searchValue}
                            placeHolder={'Search by statement code'}
                        />
                        <div className={styles['rightSide']}>
                            <div
                                onClick={openAddModal}
                                className={styles['reportButton']}
                            >
                                Add New
                                <BsPlusLg />
                            </div>
                        </div>
                    </div>

                    <PaginatedTable<CustomGL>
                        key={isSnackbarOpen ? 'A' : 'B'}
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
                                render: (data) => {
                                    return data.statementCode;
                                },
                            },
                            {
                                render: (data) => {
                                    return data.statementDesc;
                                },
                                width: '20%',
                            },
                            {
                                render: (data) => {
                                    return data.itemCode;
                                },
                                // width: '50%',
                            },
                            {
                                render: (data) => {
                                    return data.itemDesc;
                                },
                                width: '15%',
                            },
                            {
                                render: (data) => {
                                    return data.ledgerNo;
                                },
                                // width: '50%',
                            },
                            {
                                render: (data) => {
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
