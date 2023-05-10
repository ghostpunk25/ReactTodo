import { Search, SearchIconWrapper, StyledInputBase } from 'components/SearchBar/SearchBar.style';
import { useContext } from 'react';
import { context } from 'context/context';
import SearchIcon from '@mui/icons-material/Search';


export const SearchBar = () => {
   const ctx = useContext(context)

   const handleFilterTodo = (e) => {
      ctx.filterTodoList(e.target.value)
   };

   return (
      <Search>
         <SearchIconWrapper>
            <SearchIcon />
         </SearchIconWrapper>
         <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleFilterTodo}
         />
      </Search>
   )
}