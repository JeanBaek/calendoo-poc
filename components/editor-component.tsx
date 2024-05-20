import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { Todo } from '@/store/type';
import { formatDate } from '@/lib/utils';
import {
  ADD_TODO_BUTTON_DESCRIPTION,
  ADD_TODO_PAGE_TITLE,
  CANCEL_EDITOR_BUTTON_DESCRIPTION,
  EDIT_TODO_BUTTON_DESCRIPTION,
  EDIT_TODO_PAGE_TITLE,
  FORM_DATE_PLACEHOLDER,
  FORM_TITLE_PLACEHOLDER,
  INITIAL_FORM_TODO,
} from '@/store/constant';

interface EditorComponentProps {
  show: boolean;
  date: Date;
  targetTodo?: Todo;
  handleSave: (formTodo: Todo) => void;
  handleCancel: MouseEventHandler<HTMLButtonElement>;
}

export const EditorComponent: React.FC<EditorComponentProps> = ({
  show,
  date,
  targetTodo,
  handleSave,
  handleCancel,
}) => {
  const [formTodo, setFormTodo] = useState({
    ...INITIAL_FORM_TODO,
    dueDate: formatDate(date),
  });

  useEffect(() => {
    if (targetTodo) {
      setFormTodo({
        ...targetTodo,
        dueDate: formatDate(targetTodo.dueDate),
      });
    } else {
      initForm();
    }

    return initForm;
  }, [targetTodo]);

  const initForm = () => {
    setFormTodo({
      ...INITIAL_FORM_TODO,
      dueDate: formatDate(date),
    });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormTodo(prevTodo => ({ ...prevTodo, [name]: value }));
  };

  const onSave = () => {
    handleSave({ ...formTodo, dueDate: new Date(formTodo.dueDate) });
    initForm();
  };

  const allowSubmit = () => {
    // TODO: targetTodo 있을 때, 변경 사항 있어야 return true
    return !!(formTodo.title && formTodo.dueDate);
  };

  return (
    <div className="border w-80 min-h-5">
      {show ? (
        <div>
          <div className="flex justify-between p-4">
            <button type="reset" onClick={handleCancel}>
              {CANCEL_EDITOR_BUTTON_DESCRIPTION}
            </button>
            <h1 className="mb-2 font-extrabold">
              {targetTodo ? EDIT_TODO_PAGE_TITLE : ADD_TODO_PAGE_TITLE}
            </h1>
            <button type="button" onClick={onSave} disabled={!allowSubmit()}>
              {targetTodo
                ? EDIT_TODO_BUTTON_DESCRIPTION
                : ADD_TODO_BUTTON_DESCRIPTION}
            </button>
          </div>

          <div className="mt-4">
            <div className="field title mx-4">
              <input
                type="text"
                id="title"
                name="title"
                placeholder={FORM_TITLE_PLACEHOLDER}
                value={formTodo.title}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mt-4 mb-4">
            <div className="field mx-4">
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                placeholder={FORM_DATE_PLACEHOLDER}
                value={formTodo.dueDate}
                className={formTodo.dueDate ? 'has-value' : ''}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
