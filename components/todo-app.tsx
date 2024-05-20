'use client';

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from '@/store/type';
import useTodoStore from '@/store/useTodoStore';
import { CalendarComponent } from '@/components/calendar-component';
import { TodoComponent } from '@/components/todo-component';
import { EditorComponent } from '@/components/editor-component';

const TodoApp = () => {
  const {
    date,
    todos,

    updateDate,
    updateDatePrev,
    updateDateNext,

    addTodo,
    updateTodo,
    updateTodoCheck,
    deleteTodo,
  } = useTodoStore();
  const [showTodoEditor, setShorTodoEditor] = useState(false);
  const [targetTodo, setTargetTodo] = useState<Todo | undefined>(undefined);

  const handleShowTodoEditor = (id?: string) => {
    setShorTodoEditor(true);

    if (id) {
      const foundTodo = id ? todos.find(todo => todo.id === id) : undefined;
      setTargetTodo(foundTodo);
    } else {
      setTargetTodo(undefined);
    }
  };

  const handleSaveEditor = (formTodo: Todo) => {
    if (targetTodo) {
      updateTodo({
        ...formTodo,
        dueDate: new Date(formTodo.dueDate),
      });
    } else {
      addTodo({
        ...formTodo,
        id: uuidv4(),
        dueDate: new Date(formTodo.dueDate),
        completed: false,
      });
    }

    initEditor();
  };

  const initEditor = () => {
    setShorTodoEditor(false);
    setTargetTodo(undefined);
  };

  return (
    <div className="flex justify-between">
      <CalendarComponent value={date} onChange={updateDate} />
      <TodoComponent
        date={date}
        todos={todos}
        updateDatePrev={updateDatePrev}
        updateDateNext={updateDateNext}
        updateTodoCheck={updateTodoCheck}
        deleteTodo={deleteTodo}
        handleShowTodoEditor={handleShowTodoEditor}
      />
      <EditorComponent
        show={showTodoEditor}
        date={date}
        targetTodo={targetTodo}
        handleSave={handleSaveEditor}
        handleCancel={initEditor}
      />
    </div>
  );
};

export default TodoApp;
