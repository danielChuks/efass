import { atom } from "recoil";

export const settingsAtom = atom({
    default: {
        darkMode: false,
        notificationSounds: true,
    },
    key: 'settings-atom'
});
