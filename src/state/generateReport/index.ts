import { atom } from 'recoil';
import { Report } from '../../interfaces';

export const generateReportAtom = atom<Report[]>({
    default: [],
    key: 'generateReport',
});

// export const generateReportInformationAtom = atom<>({
//     default:{},
//     key:'generateReportInformation'
// })

export const selectedDateAtom = atom<string>({
    default: '',
    key: 'selectedDate',
});


