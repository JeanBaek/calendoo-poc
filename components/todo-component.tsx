'use client';

import React, { MouseEventHandler } from 'react';
import { Todo } from '@/store/type';
import { formatDate } from '@/lib/utils';
import TodoSection from '@/components/todo-section';

interface TodoComponentProps {
  date: Date;
  todos: Todo[];
  updateDatePrev: MouseEventHandler<HTMLButtonElement>;
  updateDateNext: MouseEventHandler<HTMLButtonElement>;
  updateTodoCheck: (id: string) => void;
  deleteTodo: (id: string) => void;
  handleShowTodoEditor: (id?: string) => void;
}

export const TodoComponent: React.FC<TodoComponentProps> = ({
  date,
  todos,
  updateDatePrev,
  updateDateNext,
  updateTodoCheck,
  deleteTodo,
  handleShowTodoEditor,
}) => {
  return (
    <div className="border p-4 w-80 relative">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <button onClick={updateDatePrev}>◀</button>
        <h1 className="mb-2 font-extrabold">{formatDate(date)}</h1>
        <button onClick={updateDateNext}>▶</button>
      </div>
      <div>
        <TodoSection
          todos={todos}
          updateTodoCheck={updateTodoCheck}
          deleteTodo={deleteTodo}
          handleShowTodoEditor={handleShowTodoEditor}
        />
      </div>
      <button
        className="w-8 h-8 border rounded-full absolute bottom-2 right-2"
        onClick={() => handleShowTodoEditor()}
      >
        ➕
      </button>
    </div>
  );
};
