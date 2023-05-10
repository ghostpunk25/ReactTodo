import { Box, CssBaseline } from '@mui/material';
import { Header } from 'components/Header/Header';
import { SideBar } from 'components/SideBar/SideBar';
import { WorkSpace } from 'components/WorkSpace/WorkSpace';
import { context } from 'context/context';
import { useContext, useEffect, useState } from 'react';
import { createIndexedDB } from 'services/indexedDB';
import { getAllTodos } from 'services/indexedDB';
import { addTodo } from 'services/indexedDB';
import { removeTodo } from 'services/indexedDB';
import { formattedDate } from 'services/indexedDB';
import { nanoid } from 'nanoid'

export const drawerWidth = 240;

export const App = () => {
  const [open, setOpen] = useState(true);
  const ctx = useContext(context);

  useEffect(() => {
    createIndexedDB()
    getAllTodos(ctx.getTodosList)
  }, [])

  const handleAddTodo = () => {

    const todoDefault = {
      id: nanoid(10),
      text: '',
      created: formattedDate
    };

    addTodo(todoDefault)
    ctx.getTodo(todoDefault)
    ctx.handleWorkSpaceActive(true)
  }

  const handleRemoveTodo = () => {
    removeTodo(ctx.todo.id)
    ctx.deleteTodo(ctx.todo.id)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
      }}>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden'
        }}>
        <CssBaseline />
        <Header
          handleRemoveTodo={handleRemoveTodo}
          handleAddTodo={handleAddTodo}
          open={open}
          handleDrawerOpen={handleDrawerOpen} />
        <SideBar
          open={open}
          handleDrawerClose={handleDrawerClose} />
        <WorkSpace
          open={open} />
      </Box>
    </Box>
  );
}