import { atom } from 'recoil';
import { NoteToPlData } from '../../interfaces/note-to-pl.interface';

export const noteToPlAtom = atom<NoteToPlData[]>({
    default: [],
    key: 'memoAdjustment',
});
