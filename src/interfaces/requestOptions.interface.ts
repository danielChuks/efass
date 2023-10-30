import { RequestMethod } from '../enums';

interface PrefixType {
    [name: string]: any;
}

export interface RequestOptions {
    method: RequestMethod;
    headers: PrefixType;
    body?: string;
}
