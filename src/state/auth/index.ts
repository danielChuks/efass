import { atom } from 'recoil';
import { Token } from '../../interfaces/token.interface';

export const authAtom = atom<Token | null>({
    key: 'auth',
    default: null,
});
