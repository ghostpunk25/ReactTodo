import { Toolbar, IconButton, Box } from '@mui/material';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { useContext } from 'react';
import { context } from 'context/context';
import { AppBar } from 'components/Header/Header.style';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';


export const Header = ({ handleDrawerOpen, open, handleAddTodo, handleRemoveTodo }) => {
   const ctx = useContext(context)

   return (
      <AppBar open={open} >
         <Toolbar
            sx={{
               justifyContent: 'space-between',
               height: '64px'
            }}>
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center'
               }}>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: 'none' }) }}
               >
                  <MenuIcon />
               </IconButton>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleAddTodo}
                  edge="start"
                  sx={{ mr: 2, }}
               >
                  <AddIcon />
               </IconButton>
               <IconButton
                  disabled={!ctx.todo}
                  onClick={handleRemoveTodo}
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  sx={{ mr: 2, }}
               >
                  <DeleteIcon />
               </IconButton>
               <IconButton
                  disabled={!ctx.todo}
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={ctx.handleWorkSpaceActive}
                  sx={{ mr: 2, }}
               >
                  <BorderColorIcon />
               </IconButton>
            </Box>
            <SearchBar />
         </Toolbar>
      </AppBar >
   )
}