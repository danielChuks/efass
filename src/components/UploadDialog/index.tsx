import React, { useState } from 'react';
import styles from './index.module.scss';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { SettingsButton } from '../Button';
import InputGroup from '../Input';
import { SelectGroup } from '../Select/Index';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';

interface DialogProps {
    typeOfModal?: string;
    openModal: boolean;
    // header: string;
    // data: any;
    error: boolean;
    errorText: string;
    disabled?: boolean;
    setOpenModal: (value: boolean) => void;
    handleAction: (value: any) => void;
    // setData: (value: any) => void;
    handleInputchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const UploadDialog = ({
    openModal,
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
                        fontSize: '18px',
                        fontFamily: 'inter',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <p>Upload Report</p>
                    <AiOutlineClose
                        className={styles['cursor']}
                        onClick={() => setOpenModal(false)}
                        size={24}
                    />
                </DialogTitle>

                <DialogContent>
                    <div className={styles['dialog_content']}>
                        <label className={styles['file_label']} htmlFor="file">
                            <InputGroup
                                id="file"
                                type="file"
                                label="Upload file"
                                name="file"
                                placeholder="click to upload a file"
                                disabled={disabled}
                                handleChange={handleInputchange}
                                required={true}
                            />
                        </label>

                        <button>Upload</button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
