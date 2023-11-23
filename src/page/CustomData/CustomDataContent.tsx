'use client';
import React, { useState } from 'react';
import { PaginatedTable } from '@/components/PaginatedTable';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/FilterBy';
import { CustomButton } from '@/components/Button';
import { CustomData } from '@/interfaces';
import { dummyData } from './data';
import styles from './index.module.scss';
import { BsPlusLg } from 'react-icons/bs';
import { CustomDataDialog } from '@/components/CustomDataDialog';
import PageContent from '../../components/PageContent';

function CustomDataContent() {
    const handleAddNewData = () => {};
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const [loading, setLoading] = useState<boolean>(true);
    const [typeOfModal, setTypeOfModal] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalHeader, setModalHeader] = useState('Add New');
    const [modalAction, setModalAction] = useState(() => handleAddNewData);
    const [data, setData] = useState<CustomData>({
        reference_code: '',
        reference_description: '',
        reference_type: '',
        reference_value: '',
    });

    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    //listen for click on add button
    const openAddModal = () => {
        setTypeOfModal('');
        setModalHeader('Add New');
        setOpenModal(true);
        setData({
            reference_code: '',
            reference_description: '',
            reference_type: '',
            reference_value: '',
        });
        setModalAction(() => handleAddNewData);
    };
    const openEditModal = (data: CustomData) => {
        setTypeOfModal('editModal');
        setModalHeader('Edit Details');
        setData({
            reference_code: data.reference_code,
            reference_description: data.reference_description,
            reference_type: data.reference_type,
            reference_value: data.reference_value,
        });

        setOpenModal(true);
        setModalAction(() => editGl);
    };
    const editGl = (data: CustomData) => {};
    return (
        <div>
            {openModal && (
                <CustomDataDialog
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
            <div>
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
                    <PaginatedTable<CustomData>
                        headers={[
                            'REFERENCE CODE',
                            'REFERENCE DESCRIPTION',
                            'REFERENCE TYPE',
                            'REFERENCE VALUE',
                            'ACTION',
                        ]}
                        data={dummyData}
                        // loading={loading}
                        columns={[
                            {
                                render: (data, index) => {
                                    return data.reference_code;
                                },
                            },
                            {
                                render: (data, index) => {
                                    return data.reference_description;
                                },
                                width: '20%',
                            },
                            {
                                render: (data, index) => {
                                    return data.reference_type;
                                },
                                // width: '50%',
                            },
                            {
                                render: (data, index) => {
                                    return data.reference_value;
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
                                            View Details
                                        </div>
                                    );
                                },
                                width: '10%',
                            },
                        ]}
                    />
                </PageContent>
            </div>
        </div>
    );
}

export default CustomDataContent;
