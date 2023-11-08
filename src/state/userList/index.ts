import { atom } from 'recoil';
import { User} from '../../interfaces';

export const userAtom = atom<User[]>({
    default: [],
    key: 'User',
});
