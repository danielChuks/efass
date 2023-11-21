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
import { useRouter } from 'next/navigation';

// Define the AdjustmentContent component
export function AdjustmentContent() {
    const { getMemoData, updateMemoData } = useAdjustmentAction();
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
        } catch (error) {
            return error;
        }
    };

    return (
        <div className={styles['content']}>
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
        </div>
    );
}
