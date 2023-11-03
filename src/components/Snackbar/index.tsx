'use client';
import React, { useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface SnackbarProps {
    isopen: boolean;
    // position: any;
    handleClose: () => void;
    // handleOpen:()=> void;
    message: string;
}

const SnackbarComponent = ({
    isopen,
    // position,
    handleClose,
    message,
}: SnackbarProps) => {

    return (
        <>
            <Snackbar
                ContentProps={{
                    sx: {
                        background: '#d32f2f',
                        fontFamily: 'Baloo 2',
                    },
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={isopen}
                onClose={handleClose}
                message={message}
                key={'bottom' + 'center'}
            />
        </>
    );
};

export default SnackbarComponent;
