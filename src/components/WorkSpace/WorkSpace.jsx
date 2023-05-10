import { Button, Box, Typography } from '@mui/material';
import { addTodo } from 'services/indexedDB';
import { context } from 'context/context';
import { useContext, useEffect, useState } from 'react';
import { Main, DrawerHeader } from './WorkSpace.style';

export const WorkSpace = ({ open }) => {
   const ctx = useContext(context);
   const [text, setText] = useState('');

   const handleEditTodo = () => {
      ctx.handleWorkSpaceActive(false)
      ctx.getTodo(prevState => {
         return { ...prevState, text: text }
      });
   };

   useEffect(() => {
      setText(ctx.todo?.text);
      if (!ctx.todo) {
         return
      };
      ctx.getTodo(ctx.todo);
      addTodo(ctx.todo);
   }, [ctx.todo?.text]);

   return (
      <Main open={open}>
         <DrawerHeader />
         <Typography
            sx={{
               textAlign: 'center',
               background: '#ccc',
               py: '5px',
               borderRadius: '20px',
               mb: '10px'
            }}>
            {ctx.todo?.created ?? null}
         </Typography>
         {
            ctx.workSpaceActive
               ? <form>
                  <Box component='textarea' name="textarea" value={text ?? ''}
                     onChange={e => setText(e.target.value)}
                     sx={{
                        width: '100%',
                        height: '70vh',
                        resize: 'vertical',
                        border: 'none',
                        outline: 'none',
                        fontSize: '18px',
                     }}></Box>
                  <Button onClick={handleEditTodo} variant="contained"
                     sx={{
                        display: 'flex',
                        ml: 'auto'
                     }}>
                     Save
                  </Button>
               </form>
               : <form >
                  <Box disabled component='textarea' name="textarea" value={text ?? ''}
                     sx={{
                        width: '100%',
                        height: '80vh',
                        resize: 'vertical',
                        border: 'none',
                        outline: 'none',
                        background: 'none',
                        fontSize: '18px',
                     }}>
                  </Box>
               </form>
         }
      </Main >
   )
}