import { atom } from "recoil";

export const authAtom = atom({
    key: 'auth-atom',
    default: {
        isLoggedIn: false,
        token: '',
    },
});

export const tokenAtom = atom<string | null>({
    key: 'token-atom',
    default: null,
});