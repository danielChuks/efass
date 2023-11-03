import { CSSProperties } from 'react';

export interface PaginatedTableColumn<T = any> {
    render: (
        data: T,
        index: number,
    ) => JSX.Element | string | number;
    style?: CSSProperties;
    disableClick?: boolean;
    width?: string | number;
}

export interface PaginatedTableHeaderColumn {
    value: string;
    style?: CSSProperties;
}
