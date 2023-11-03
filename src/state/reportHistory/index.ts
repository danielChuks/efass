import { atom } from 'recoil';
import { history } from '../../interfaces/history.interface';

export const reportHistoryAtom = atom<any[]>({
    default: [],
    key: 'reportHistory',
});
