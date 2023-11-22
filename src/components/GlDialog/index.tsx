import React, { useState } from 'react';
import styles from './index.module.scss';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { SettingsButton } from '../Button';
import InputGroup from '../Input';
import { SelectGroup } from '../Select';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

interface DialogProps {
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
export const GlDialog = ({
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
}: DialogProps) => {
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
                        color: '#0D1740',
                        fontWeight: 'bold',
                        fontFamily: 'Baloo 2',
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
                        <SelectGroup
                            label="Statement Code"
                            value={data?.statement_code}
                            name="statement_code"
                            placeholder=""
                            options={['001', '002', '003']}
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <InputGroup
                            type="text"
                            label="Statement Description"
                            value={data?.statement_description}
                            name="statement_description"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <SelectGroup
                            label="Item Code"
                            options={['001', '002', '003']}
                            value={data.item_code}
                            name="item_code"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <InputGroup
                            type="text"
                            label="Item Description"
                            value={data?.item_description}
                            name="item_description"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <InputGroup
                            type="text"
                            label="Ledger Number"
                            value={data.ledger_number}
                            name="ledger_number"
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
                                text={header}
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
