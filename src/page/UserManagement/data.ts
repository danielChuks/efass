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
    { name: 'test', code: 'test', population: 1, size: 1, density: 1 },
    { name: 'test', code: 'test', population: 1, size: 1, density: 1 },
    { name: 'test', code: 'test', population: 1, size: 1, density: 1 },
    { name: 'test', code: 'test', population: 1, size: 1, density: 1 },
    { name: 'test', code: 'test', population: 1, size: 1, density: 1 },
    { name: 'test', code: 'test', population: 1, size: 1, density: 1 },
    { name: 'test', code: 'test', population: 1, size: 1, density: 1 },
    { name: 'test', code: 'test', population: 1, size: 1, density: 1 },
];
