import { useTheme, Typography, List, Drawer, Divider } from '@mui/material';
import { drawerWidth } from 'components/App/App';
import { context } from 'context/context';
import { useContext, useMemo } from 'react';
import { DrawerHeader } from './SideBar.style';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export const SideBar = ({ handleDrawerClose, open }) => {
   const theme = useTheme();
   const ctx = useContext(context);

   const handleTodo = (todo) => {
      ctx.getTodo(todo)
   };

   const normalize = ctx.filterTodo?.toLowerCase();
   const visibleTodo = useMemo(() => {
      return ctx.todosList?.filter(item => item.text.toLowerCase().includes(normalize));
   }, [ctx.todosList, normalize]);

   return (
      <>
         <Drawer
            sx={{
               width: drawerWidth,
               flexShrink: 0,
               '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  position: 'static',
                  '@media (max-width: 599px)': {
                     position: 'fixed',
                     top: '64px',
                  },
               },
            }}
            variant="persistent"
            anchor="left"
            open={open}
         >
            <DrawerHeader>
               <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr'
                     ? <ChevronLeftIcon />
                     : <ChevronRightIcon />}
               </IconButton>
            </DrawerHeader>
            <Divider sx={{ mb: '15px' }} />
            {ctx.todosList && visibleTodo.map(item => (
               <List
                  onClick={() => { handleTodo({ id: item.id, text: item.text, created: item.created }) }}
                  key={item.id}
                  sx={{
                     p: '10px',
                     maxWidth: '240px',
                     borderBottom: '1px solid #000',
                     cursor: 'pointer',
                     transition: 'all 0.3s ease',
                     ':hover': {
                        background: '#ccc',
                     }
                  }}>
                  <Typography
                     sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                     }}>
                     {item.text}
                  </Typography>
                  <Typography
                     sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        fontSize: '12px'
                     }}>
                     {item.created}
                  </Typography>
               </List>
            ))}
         </Drawer>
      </>
   )
}