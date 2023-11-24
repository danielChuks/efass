import { atom } from 'recoil';

export const usernameAtom = atom<string>({
    default: '',
    key: 'username',
});
