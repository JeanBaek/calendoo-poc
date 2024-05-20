import { useEffect, useState } from 'react';
import { Todo } from './type';
import useTodoApi from '@/store/useTodoApi';

const useTodoStore = () => {
  const {
    getCalendarEvents,
    createCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
  } = useTodoApi();
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = (reqDate = date) => {
    getCalendarEvents(reqDate).then(res => setTodos(res));
  };

  const updateDate = (newDate: Date) => {
    setDate(newDate);
    fetchTodos(newDate);
  };

  const updateDatePrev = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    updateDate(newDate);
  };

  const updateDateNext = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    updateDate(newDate);
  };

  const addTodo = (newTodo: Todo) => {
    createCalendarEvent(newTodo).then(() => fetchTodos());
  };

  const updateTodo = (updatedTodo: Todo) => {
    updateCalendarEvent(updatedTodo).then(() => fetchTodos());
  };

  const updateTodoCheck = (id: string) => {
    const targetTodo = todos.find(todo => todo.id === id);
    if (!targetTodo) throw new Error("There's no target todo exist");

    const nextCheckState = !targetTodo.completed;

    updateCalendarEvent({
      ...targetTodo,
      completed: nextCheckState,
    }).then(() => fetchTodos());
  };

  const deleteTodo = (id: string) => {
    const targetTodo = todos.find(todo => todo.id === id);
    if (!targetTodo) throw new Error("There's no target todo exist");

    deleteCalendarEvent(id).then(() => fetchTodos());
  };

  return {
    date,
    todos,

    updateDate,
    updateDatePrev,
    updateDateNext,

    addTodo,
    updateTodo,
    updateTodoCheck,
    deleteTodo,
  };
};

export default useTodoStore;
