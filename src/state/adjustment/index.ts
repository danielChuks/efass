import { atom } from 'recoil';
import { AdjustmentData } from '../../interfaces';

export const memoAdjustmentAtom = atom<AdjustmentData[]>({
    default: [],
    key: 'memoAdjustment',
});
