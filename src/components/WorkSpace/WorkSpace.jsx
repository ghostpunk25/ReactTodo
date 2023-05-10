import { Box, Typography } from '@mui/material';
import { addTodo } from 'services/indexedDB';
import { context } from 'context/context';
import { useContext, useEffect, useRef, useState } from 'react';
import { Main, DrawerHeader } from './WorkSpace.style';

export const WorkSpace = ({ open }) => {
   const ctx = useContext(context);
   const [text, setText] = useState('');
   const textArea = useRef(null)

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
         {ctx.workSpaceActive
            ? <Box>
               <Box ref={textArea} component='textarea' name="textarea" value={text ?? ''}
                  placeholder='New note...'
                  onChange={e => setText(e.target.value)}
                  onBlur={handleEditTodo}
                  sx={{
                     width: '100%',
                     height: '80vh',
                     resize: 'none',
                     border: 'none',
                     outline: 'none',
                     fontSize: '18px',
                     mb: '5px'
                  }}>
               </Box>
            </Box>
            : <Box disabled component='textarea' name="textarea" value={text ?? ''}
               placeholder='Emty note...'
               sx={{
                  width: '100%',
                  height: '80vh',
                  resize: 'none',
                  border: 'none',
                  outline: 'none',
                  background: 'none',
                  fontSize: '18px',
               }}>
            </Box>
         }
      </Main >
   )
}