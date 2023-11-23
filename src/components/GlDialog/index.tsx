import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { SettingsButton } from '../Button';
import InputGroup from '../Input';
import { SelectGroup } from '../Select';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useGlMapppingActions } from '../../actions/glmapping';
import SnackbarComponent from '../Snackbar';
import { GL, CustomGL } from '@/interfaces';
interface DialogProps {
    SnackbarMessage: string;
    snackBarColor: string;
    isSnackbarOpen: boolean;
    setSnackbarMessage: (value: any) => void;
    setSnackbarColor: (value: any) => void;
    setIsSnackbarOpen: (value: boolean) => void;
    typeOfModal?: string;
    openModal: boolean;
    header: string;
    data: any;
    error: boolean;
    isError?: boolean;
    errorText?: string;
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
    isError,
    errorText,
    disabled,
    setOpenModal,
    handleAction,
    handleInputchange,
    SnackbarMessage,
    snackBarColor,
    isSnackbarOpen,
    setSnackbarMessage,
    setSnackbarColor,
    setIsSnackbarOpen,
}: DialogProps) => {
    const { getItemCodes, getStatementCodes, deleteGlData, updateGlData } =
        useGlMapppingActions();
    const [itemCodes, setItemCodes] = useState([]);
    const [statementCodes, setStatementCodes] = useState([]);
    // const [SnackbarMessage, setSnackbarMessage] = useState<string>('');
    // const [snackBarColor, setSnackbarColor] = useState<string>('');
    // const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    useEffect(() => {
        fetchItemCodes();
        fetchStatementCodes();
    }, []);
    const fetchItemCodes = async () => {
        const response = await getItemCodes();
        try {
            if (response?.data) {
                setItemCodes(response?.data);
            } else {
                setItemCodes([]);
            }
        } catch (error) {
            setItemCodes([]);
        }
    };

    const fetchStatementCodes = async () => {
        const response = await getStatementCodes();
        try {
            if (response?.data) {
                setStatementCodes(response?.data);
            } else {
                setStatementCodes([]);
            }
        } catch (error) {
            setStatementCodes([]);
        }
    };
    const deleteData = async (itemCode: string) => {
        const response = await deleteGlData(itemCode);
        try {
            if (response?.data) {
                console.log(response);
                setSnackbarColor('#006c33');
                setIsSnackbarOpen(true);
                setSnackbarMessage('Data deleted successfully');
            } else {
                setIsSnackbarOpen(true);
                setSnackbarColor('');
                setSnackbarMessage(response?.message || 'An error occured');
            }
        } catch (error) {
            setIsSnackbarOpen(true);
            setSnackbarColor('');
            setSnackbarMessage(response?.message || 'An error occured');
        }
    };

    const updateData = async (data: CustomGL) => {
        const editData = {
            itemCode: data?.itemCode,
            itemDesc: data?.itemDescription,
            ledgerNo: data?.ledgerNumber,
            statementCode: data?.statementCode,
            statementDesc: data?.statementDescription,
        };
        const response = await updateGlData(editData);
        try {
            if (response?.data) {
                setSnackbarColor('#006c33');
                setIsSnackbarOpen(true);
                setSnackbarMessage('Data updated successfully');
            } else {
                setIsSnackbarOpen(true);
                setSnackbarColor('');
                setSnackbarMessage(response?.message || 'An error occured');
            }
        } catch (error) {
            setIsSnackbarOpen(true);
            setSnackbarColor('');
            setSnackbarMessage(response?.message || 'An error occured');
        }
    };
    const handleClose = () => {
        setIsSnackbarOpen(false);
    };
    return (
        <div>
            <Dialog
                open={openModal}
                sx={{ width: '40rem', margin: 'auto', px: 2 }}
                onClose={() => setOpenModal(false)}
                aria-labelledby="alert-dialog-title"
            >
                <SnackbarComponent
                    handleClose={handleClose}
                    isopen={isSnackbarOpen}
                    message={SnackbarMessage}
                    color={snackBarColor}
                />
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
                            value={data?.statementCode}
                            name="statementCode"
                            placeholder=""
                            options={statementCodes}
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                            isError={isError}
                            errorText={errorText}
                        />

                        <InputGroup
                            type="text"
                            label="Statement Description"
                            value={data?.statementDescription}
                            name="statementDescription"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <SelectGroup
                            label="Item Code"
                            options={itemCodes}
                            value={data.itemCode}
                            name="itemCode"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <InputGroup
                            type="text"
                            label="Item Description"
                            value={data?.itemDescription}
                            name="itemDescription"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <InputGroup
                            type="text"
                            label="Ledger Number"
                            value={data.ledgerNumber}
                            name="ledgerNumber"
                            placeholder=""
                            disabled={disabled}
                            handleChange={handleInputchange}
                            required={true}
                        />
                        {typeOfModal === 'editModal' ? (
                            <div className={styles['buttonGroup']}>
                                <button
                                    onClick={() => updateData(data)}
                                    className={styles['modifyButton']}
                                >
                                    <BiEdit size={24} /> Modify
                                </button>
                                <button
                                    onClick={() => deleteData(data.itemCode)}
                                    className={styles['removeButton']}
                                >
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
