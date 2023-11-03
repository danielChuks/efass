import { atom } from 'recoil';
import { Users } from '../../interfaces';

export const userAtom = atom<Users[]>({
    default: [],
    key: 'User',
});
