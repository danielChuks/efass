import { atom } from 'recoil';
import { ReportData } from '../../interfaces';

export const generateReportAtom = atom<ReportData[]>({
    default: [],
    key: 'generateReport',
});

export const generateReportInformationAtom = atom<any>({
    default:[],
    key:'generateReportInformation'
})

export const selectedDateAtom = atom<string>({
    default: '',
    key: 'selectedDate',
});

export const selectedGroupAtom = atom<string>({
    default: '',
    key: 'selectedGroup',
});


