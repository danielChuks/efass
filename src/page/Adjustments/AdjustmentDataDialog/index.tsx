import React, { useState } from 'react';
import styles from './index.module.scss';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { SettingsButton } from '../../../components/Button';
import InputGroup from '../../../components/Input';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { SelectGroup } from '../../../components/Select';

interface AdjustmentDataProps {
    typeOfModal?: string;
    openModal: boolean;
    header: string;
    data: any;
    error: boolean;
    errorText: string;
    disabled?: boolean;
    setOpenModal: (value: boolean) => void;
    handleAction: (value: any) => void;
    setData: (value: any) => void;
    handleInputchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const AdjustmentDataDialog = ({
    typeOfModal,
    openModal,
    header,
    data,
    error,
    errorText,
    disabled,
    setOpenModal,
    handleAction,
    handleInputchange,
}: AdjustmentDataProps) => {
    return (
        <div>
            <Dialog
                open={openModal}
                sx={{ width: '40rem', margin: 'auto', px: 2 }}
                onClose={() => setOpenModal(false)}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle
                    id="alert-dialog-title"
                    sx={{
                        backgroundColor: '#d9e8dc',
                        color: '#000000',
                        fontWeight: 'bold',
                        fontFamily: 'inter',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <p>{header}</p>
                    <AiOutlineClose
                        className={styles['cursor']}
                        onClick={() => setOpenModal(false)}
                        size={24}
                    />
                </DialogTitle>

                <DialogContent>
                    <div className={styles['dialog_content']}>
                        <InputGroup
                            type="text"
                            label="GL Code"
                            value={data?.gl_code}
                            name="gl_code"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <InputGroup
                            type="text"
                            label="GL Description"
                            value={data?.gl_description}
                            name="gl_description"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <InputGroup
                            type="text"
                            label="DR CR IND"
                            value={data?.dr_cr_ind}
                            name="dr_cr_ind_type"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <SelectGroup
                            label="Status"
                            options={['P', 'N']}
                            value={data?.status}
                            name="status"
                            placeholder={''}
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <InputGroup
                            type="text"
                            label="amount"
                            value={data?.amount}
                            name="amount"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />
                        <InputGroup
                            type="text"
                            label="period"
                            value={data?.period}
                            name="period"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />
                        <InputGroup
                            type="text"
                            label="year"
                            value={data?.year}
                            name="year"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        {typeOfModal === 'editModal' ? (
                            <div className={styles['buttonGroup']}>
                                <button className={styles['modifyButton']}>
                                    <BiEdit size={24} /> Modify
                                </button>
                                <button className={styles['removeButton']}>
                                    <AiOutlineDelete size={24} /> Remove
                                </button>
                            </div>
                        ) : (
                            <SettingsButton
                                text={'Save Settings'}
                                handleAction={handleAction}
                                error={error}
                                errorText={errorText}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
