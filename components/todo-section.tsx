import React from 'react';
import { Todo } from '@/store/type';
import TodoItem from './todo-item';

export interface Props {
  todos: Todo[];
  updateTodoCheck: (id: string) => void;
  deleteTodo: (id: string) => void;
  handleShowTodoEditor: (id: string) => void;
}

const TodoSection: React.FC<Props> = props => {
  const { todos, updateTodoCheck, deleteTodo, handleShowTodoEditor } = props;

  const handleCheckTodo = (id: string) => {
    updateTodoCheck(id);
  };

  const handleClickTodo = (id: string) => {
    handleShowTodoEditor(id);
  };

  const handleDeleteTodo = (e: MouseEvent, id: string) => {
    e.stopPropagation();
    deleteTodo(id);
  };

  if (!todos.length) return null;

  return (
    <ul className="py-4">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onCheck={handleCheckTodo}
          onClick={handleClickTodo}
          onDelete={handleDeleteTodo}
        />
      ))}
    </ul>
  );
};

export default TodoSection;
