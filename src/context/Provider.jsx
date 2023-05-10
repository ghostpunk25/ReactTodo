import { useState } from "react";
import { context } from './context';


export const Provider = ({ children }) => {
   const [todosList, setTodosList] = useState(null);
   const [workSpaceActive, setWorkSpaceActive] = useState(false);
   const [todo, setTodo] = useState(null);
   const [filterTodo, setFilterTodo] = useState('');

   const filterTodoList = (item) => {
      setFilterTodo(item);
   };

   const getTodo = (todo) => {
      setTodo(todo)
      if (todo && typeof todo !== 'function') {
         setTodosList(prevState => {
            const index = prevState.findIndex((item) => item.id === todo.id);
            if (index !== -1) {
               const updatedList = [...prevState];
               updatedList[index] = { ...updatedList[index], text: todo.text };
               return updatedList
            } else {
               return [...prevState, { ...todo }];
            };
         });
      };
   };

   const deleteTodo = (id) => {
      setTodosList(prevState => prevState.filter(item => item.id !== id));
   };

   const getTodosList = (todos) => {
      setTodosList(todos);
   };

   const handleWorkSpaceActive = (bool) => {
      setWorkSpaceActive(bool);
   };

   const providerValue = {
      todosList,
      getTodosList,
      workSpaceActive,
      handleWorkSpaceActive,
      todo,
      getTodo,
      deleteTodo,
      filterTodo,
      filterTodoList
   };

   return <context.Provider value={providerValue}>{children}</context.Provider>;
};