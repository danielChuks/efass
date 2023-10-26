import { atom } from 'recoil';
import { Report } from '../../interfaces';

export const generateReportAtom = atom<Report[]>({
    default: [],
    key: 'generateReport',
});
