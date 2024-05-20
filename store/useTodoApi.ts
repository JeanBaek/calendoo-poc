import { EventDto, Todo } from '@/store/type';
import { formatDate } from '@/lib/utils';

type CreateRes = {
  success: boolean;
  htmlLink: string;
};

const useTodoApi = () => {
  const getCalendarEvents = async (date: Date) => {
    const response = await fetch(`/api/events/getList/${formatDate(date)}`);
    const data: { events: EventDto[] } = await response.json();

    return data.events.map(event => {
      const date = event.start.date || event.start.dateTime;
      return {
        id: event.id,
        title: event.summary,
        dueDate: date ? new Date(date) : new Date(),
        completed: /isCompleted/.test(event.description || ''),
      };
    });
  };

  const createCalendarEvent = async (requestBody: Todo) => {
    const endDate = new Date(requestBody.dueDate);
    endDate.setDate(endDate.getDate() + 1);

    const response = await fetch('/api/events/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...requestBody,
        startDate: formatDate(requestBody.dueDate),
        endDate: formatDate(endDate),
      }),
    });

    const data: CreateRes = await response.json();

    return data;
  };

  const updateCalendarEvent = async (requestBody: Todo) => {
    const endDate = new Date(requestBody.dueDate);
    endDate.setDate(endDate.getDate() + 1);

    const response = await fetch('/api/events/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...requestBody,
        startDate: formatDate(requestBody.dueDate),
        endDate: formatDate(endDate),
      }),
    });

    const data: CreateRes = await response.json();

    return data;
  };

  const deleteCalendarEvent = async (id: string) => {
    const response = await fetch(`/api/events/delete/${id}`, {
      method: 'DELETE',
    });

    const data: CreateRes = await response.json();

    return data.success;
  };

  return {
    getCalendarEvents,
    createCalendarEvent,
    updateCalendarEvent,
    deleteCalendarEvent,
  };
};

export default useTodoApi;
