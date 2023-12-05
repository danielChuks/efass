import { atom } from 'recoil';
import { BalanceSheetData } from '../../interfaces';

export const balanceSheetAtom = atom<BalanceSheetData[]>({
    default: [],
    key: 'balanceSheet',
});
