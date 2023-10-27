export interface tableHeader {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: string;
    format?: (value: number) => string;
}

export interface data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}
