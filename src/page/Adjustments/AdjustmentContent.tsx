'use client';
import React, { useState } from 'react';
import { PaginatedTable } from '@/components/PaginatedTable';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/FilterBy';
import { AdjustmentData } from '@/interfaces';
import styles from './index.module.scss';
import { testData } from './testData';
import { AdjustmentDataDialog } from './AdjustmentDataDialog';

export function AdjustmentContent() {
    const handleAddNewData = () => {
        console.log('add new date');
    };
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [typeOfModal, setTypeOfModal] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalHeader, setModalHeader] = useState('Add New');
    const [modalAction, setModalAction] = useState(() => handleAddNewData);

    const [data, setData] = useState<AdjustmentData>({
        gl_code: '',
        gl_description: '',
        dr_cr_ind_type: '',
        amount: '',
        period: '',
        year: '',
        status: '',
    });

    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    //listen for click on add button
    // const openAddModal = () => {
    //     setTypeOfModal('');
    //     setModalHeader('Add New');
    //     setOpenModal(true);
    //     setData({
    //         gl_code: '',
    //         gl_description: '',
    //         dr_cr_ind_type: '',
    //         amount: '',
    //         period: '',
    //         year: '',
    //         status: '',
    //     });
    //     setModalAction(() => handleAddNewData);
    // };
    const openEditModal = (data: AdjustmentData) => {
        setTypeOfModal('editModal');
        setModalHeader('Edit Details');
        setData({
            gl_code: data.gl_code,
            gl_description: data.gl_description,
            dr_cr_ind_type: data.dr_cr_ind_type,
            amount: data.amount,
            period: data.period,
            year: data.year,
            status: data.status,
        });
        console.log(data);
        setOpenModal(true);
        setModalAction(() => editGl);
    };
    const editGl = (data: AdjustmentData) => {
        console.log('edit data', data);
    };
    return (
        <div className={styles['content']}>
            {openModal && (
                <AdjustmentDataDialog
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
                />
            )}
            <div className={styles['content_header']}>
                <div className={styles['search']}>
                    <SearchBar />
                    <Filter options={[]} />
                </div>

                {/* <CustomButton
                    text={'Edit'}
                    icon={<BsPlusLg size={22} color={'#fff'} />}
                    handleAction={openAddModal}
                /> */}
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
                data={testData}
                // loading={loading}
                columns={[
                    {
                        render: (data, index) => {
                            return data.gl_code;
                        },
                    },
                    {
                        render: (data, index) => {
                            return data.gl_description;
                        },
                        width: '20%',
                    },
                    {
                        render: (data, index) => {
                            return data.dr_cr_ind_type;
                        },
                        // width: '50%',
                    },
                    {
                        render: (data, index) => {
                            return data.amount;
                        },
                        width: '15%',
                    },
                    {
                        render: (data, index) => {
                            return data.period;
                        },
                        width: '15%',
                    },
                    {
                        render: (data, index) => {
                            return data.year;
                        },
                        width: '15%',
                    },

                    {
                        render: (data, index) => {
                            return data.status;
                        },
                        width: '15%',
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
                                    Edit
                                </div>
                            );
                        },
                        width: '10%',
                    },
                ]}
            />
        </div>
    );
}

export default AdjustmentData;
