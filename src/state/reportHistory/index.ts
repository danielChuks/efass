import { atom } from 'recoil';
import { ReportHistory } from '@/interfaces';

export const reportHistoryAtom = atom<ReportHistory[]>({
    default: [],
    key: 'reportHistory',
});
