import { Config } from '../../interfaces/config.interface';

export const defaultConfig: Config = {
    apiUrl: process.env.apiUrl || ''
};
