import React, { useState } from 'react';
import styles from './index.module.scss';
import '../../styles/index.scss';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { SettingsButton } from '../Button';
import InputGroup from '../Input';
import { AiOutlineClose } from 'react-icons/ai';
import { useUserListActions } from '../../actions/userManagement';
import { User } from '../../interfaces';

interface DialogProps {
    openModal: boolean;
    header: string;
    data: any;
    error: boolean;
    errorText: string;
    setOpenModal: (value: boolean) => void;
    handleAction: (value: any) => void;
    setData: (value: any) => void;
    handleInputchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCreateUser: any;
}

export const UserDialog = ({
    openModal,
    header,
    data,
    error,
    errorText,
    setOpenModal,
    handleAction,
    handleInputchange,
    handleCreateUser
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
                            label="Username"
                            value={data?.username}
                            name="username"
                            placeholder=""
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <InputGroup
                            type="password"
                            label="Password"
                            value={data?.password}
                            name="password"
                            placeholder=""
                            handleChange={handleInputchange}
                            required={true}
                        />
{/* 
                        <InputGroup
                            type="password"
                            label="Confirm Password"
                            value={data?.nopassword}
                            name="password"
                            placeholder=""
                            handleChange={handleInputchange}
                            required={true}
                        /> */}

                        <SettingsButton
                            text={header}
                            handleAction={handleCreateUser}
                            error={error}
                            errorText={errorText}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
