import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { SettingsButton } from '../Button';
import InputGroup from '../Input';
import { SelectGroup } from '../SelectGroup';
import { AiOutlineClose, AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useGlMapppingActions } from '../../actions/glmapping';
interface DialogProps {
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
    fetchAllData?: any;
    updateData?: any;
    deleteData?: any;
    itemCodes?: any;
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
    updateData,
    deleteData,
    itemCodes,
}: DialogProps) => {
    const { getStatementCodes } = useGlMapppingActions();
    const [statementCodes, setStatementCodes] = useState([]);
    useEffect(() => {
        fetchStatementCodes();
    }, []);
    const fetchStatementCodes = async () => {
        const response = await getStatementCodes();
        try {
            if (response?.data) {
                console.log(response?.data);
                setStatementCodes(response?.data);
            } else {
                setStatementCodes([]);
            }
        } catch (error) {
            setStatementCodes([]);
        }
    };

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
                            value={data?.statementDesc}
                            name="statementDesc"
                            placeholder=""
                            disabled={true}
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
                            value={data?.itemDesc}
                            name="itemDesc"
                            placeholder=""
                            disabled={true}
                            handleChange={handleInputchange}
                            required={true}
                        />

                        <InputGroup
                            type="text"
                            label="Ledger Number"
                            value={data.ledgerNo}
                            name="ledgerNo"
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
                                    onClick={() =>
                                        deleteData(data.statementCode)
                                    }
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
