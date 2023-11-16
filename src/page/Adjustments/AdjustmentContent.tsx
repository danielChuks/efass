'use client';
import React, { useEffect, useState } from 'react';
import { PaginatedTable } from '@/components/PaginatedTable';
import SearchBar from '@/components/SearchBar';
import Filter from '@/components/FilterBy';
import { AdjustmentData } from '@/interfaces';
import styles from './index.module.scss';
import { AdjustmentDataDialog } from './AdjustmentDataDialog';
import { useAdjustmentAction } from '../../actions/adjustment';
import { useRecoilValue } from 'recoil';
import { memoAdjustmentAtom } from '../../state/adjustment';

export function AdjustmentContent() {
    const { getMemoData } = useAdjustmentAction();
    const memoData = useRecoilValue(memoAdjustmentAtom);

    const handleAddNewData = () => {};
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
        dr_cr_ind: '',
        amount: '',
        period: '',
        year: '',
        status: '',
    });

    const fetchData = async () => {
        try {
            await getMemoData();
        } catch (error) {}
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const openEditModal = (memoData: AdjustmentData) => {
        setTypeOfModal('editModal');
        setModalHeader('Edit Details');
        setData({
            gl_code: memoData.gl_code,
            gl_description: memoData.gl_description,
            dr_cr_ind: memoData.dr_cr_ind,
            amount: memoData.amount,
            period: memoData.period,
            year: memoData.year,
            status: memoData.status,
        });
        console.log(memoData);
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
                            return data.dr_cr_ind;
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
