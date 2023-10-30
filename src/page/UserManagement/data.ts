import { tableHeader, data } from '../../interfaces';

export const header: readonly tableHeader[] = [
    { id: 'name', label: 'S/N', align: 'left', minWidth: 170 },
    { id: 'code', label: 'USERNAME', minWidth: 100 },
    {
        id: 'population',
        label: 'EMAIL ADDRESS',
        minWidth: 170,
        align: 'center',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'LAST ACTIVITY DATE',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'STATUS',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
    {
        id: 'density',
        label: 'ACTION',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

export const tableData: data[] = [
    { name: 'test', code: 'test1', population: 1, size: 1, density: 3},
    { name: 'test', code: 'test2', population: 1, size: 1, density: 13 },
    { name: 'test', code: 'test3', population: 1, size: 1, density: 15 },
    { name: 'test', code: 'test6', population: 1, size: 1, density: 12 },
    { name: 'test', code: 'test4', population: 1, size: 1, density: 10 },
    { name: 'test', code: 'test10', population: 1, size: 1, density: 61 },
    { name: 'test', code: 'test12', population: 1, size: 1, density: 91 },
    { name: 'test', code: 'test14', population: 1, size: 1, density: 11 },
];
