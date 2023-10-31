'use client';
import styles from './index.module.scss';
import { useRecoilValue } from 'recoil';
import { settingsAtom } from '../../state/settings';
import { useSettingsActions } from '../../actions/settings';
import { useEffect, useState } from 'react';
import BaseLayout from '../../components/BaseLayout';
import Card from '../../components/Card/index';
import { CustomButton } from '@/components/Button';
import { BsPlusLg } from 'react-icons/bs';
import Dialog from '../../components/Dialog';
import { DASHBOARD_PAGES } from '../../enums';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {MaterialTable} from '../../components/MaterialTable';

export const UserManagement = () => {
    const { getSettings } = useSettingsActions();
    const darkMode = useRecoilValue(settingsAtom);
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState('');
    const addUser = () => {
        setOpenModal(true);
    };
    const createUser = () => {
        console.log(data);
    };
    useEffect(() => {
        getSettings();
    }, [getSettings]);

    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#DFE9FF',
            color: theme.palette.common.black,
            fontWeight: '600',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

	const columnHeader = [
		{ id: "1", label: "Name", minWidth: 170 },
		{ id: "2", label: "ISO\u00a0Code", minWidth: 100 },
		{ id: "3", label: "Name", minWidth: 170 },
		{ id: "4", label: "ISO\u00a0Code", minWidth: 100 },
  ]

    // console.log(darkMode);
    return (
        <BaseLayout page={DASHBOARD_PAGES.USER_MANAGEMENT}>
            {openModal && (
                <Dialog
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    handleAction={createUser}
                    header={'Create User'}
                    data={data}
                    setData={setData}
                    handleInputchange={handleInputchange}
                    error={error}
                    errorText={errorText}
                />
            )}
            <div className={styles['container']}>
                <h4>USER MANAGEMENT</h4>
            </div>
            <div className={styles['card-body']}>
                <Card title={'Users Created'} content={'0'} />
                <Card title={'Active Users'} content={'0'} />
                <Card title={'Inactive Users'} content={'0'} />
            </div>
            <div className={styles['table_container']}>
                <div className={styles['create_btn']}>
                    <CustomButton
                        text={'Create User'}
                        icon={<BsPlusLg size={18} />}
                        handleAction={addUser}
                    />
                </div>
                {/* <div className={styles['empty_state']}>
                    <Image className="" src={emptyImage} alt="logo" />
                    <p>No data found</p>
                </div> */}
         {/* <Paper
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        marginTop: '5rem',
                    }}
                >
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead sx={{ backgroundColor: 'red' }}>
                                <TableRow>
                                    {header.map((column) => (
                                        <StyledTableCell
                                            key={column.id}
                                            align={'center'}
                                            style={{
                                                minWidth: column.minWidth,
                                            }}
                                        >
                                            {column.label}
                                        </StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableData
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={row.code}
                                            >
                                                {header.map((column) => {
                                                    const value =
                                                        row[column.id];
                                                    return (
                                                        <StyledTableCell
                                                            key={column.id}
                                                            align={'center'}
                                                        >
                                                            {column.format &&
                                                            typeof value ===
                                                                'number'
                                                                ? column.format(
                                                                      value
                                                                  )
                                                                : value}
                                                        </StyledTableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>        */}
				<MaterialTable 
				columnHeader={columnHeader}
				/>
            </div>
        </BaseLayout>
    );
};
