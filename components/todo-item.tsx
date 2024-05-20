import React from 'react';
import { Todo } from '@/store/type';
import { formatDate } from '@/lib/utils';

export interface Props {
  todo: Todo;
  onCheck: Function;
  onClick: Function;
  onDelete: Function;
}

const TodoItem: React.FC<Props> = props => {
  const { todo, onCheck, onClick, onDelete } = props;

  const isDue = () => {
    return !todo.completed && new Date(todo.dueDate!) <= new Date();
  };

  return (
    <li
      className="list-none flex flex-wrap items-center bg-gray-100 justify-start mb-2 p-2 rounded-md cursor-pointer active:bg-gray-200 tap-highlight-transparent"
      onClick={() => onClick(todo.id)}
    >
      <div className="flex-none">
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={todo.completed}
          onChange={e => onCheck(todo.id)}
          onClick={e => e.stopPropagation()}
        />
      </div>

      <div
        className={`flex-1 min-w-0 flex items-center gap-2 ${
          todo.completed ? 'text-[#66622a] line-through' : ''
        } ${isDue() ? 'text-orange-600' : ''}`}
      >
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-lg font-bold break-all">{todo.title}</span>
          <div className="break-all">{formatDate(todo.dueDate)}</div>
        </div>
      </div>

      <button
        className="w-8 h-8 p-1 border rounded-full"
        onClick={e => onDelete(e, todo.id)}
      >
        X
      </button>
    </li>
  );
};

export default TodoItem;
