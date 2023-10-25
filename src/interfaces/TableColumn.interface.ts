import { CSSProperties } from 'react';

export interface TableColumn {
    key: string;
    render: (
        cell: any,
        rowData?: object,
        index?: number,
    ) => JSX.Element | string | number;
    style?: CSSProperties;
}

export interface TableHeaderColumn {
    value: string;
    style?: CSSProperties;
}
