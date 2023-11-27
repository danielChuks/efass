import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { BiSearch } from 'react-icons/bi';
import { searchAtom } from '../../state/search';
import { useRecoilValue } from 'recoil';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#F3F3F4',
    marginLeft: 0,
    width: '400px',
    height: 44,
    border: '0.1px solid #ccc',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.3rem',
    color: '#9E9EA6',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1.5, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        fontSize: '14px',
        width: '40%',
        color: '#343A40',
        [theme.breakpoints.up('sm')]: {
            width: '52ch',
            '&:focus': {
                width: '40ch',
            },
        },
    },
}));

interface SearchProps {
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    searchValue: string;
    placeHolder: string;
}


export default function SearchBar({
    handleSearchChange,
    searchValue,
    placeHolder,
}: SearchProps) {
    return (
        <div>
            <Search>
                <SearchIconWrapper>
                    <BiSearch />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder={placeHolder ? placeHolder : 'Search...'}
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={handleSearchChange}
                />
            </Search>
        </div>
    );
}
