'use client';
import React, { useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';

interface SnackbarProps {
    isopen: boolean;
    color?: string;
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
    color,
}: SnackbarProps) => {
    return (
        <>
            <Snackbar
                ContentProps={{
                    sx: {
                        background: color ? color : '#d32f2f',
                        fontFamily: 'inter',
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
