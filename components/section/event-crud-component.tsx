'use client';

import { useState } from 'react';
import { Button } from '@/components/snippet/button';

type Event = {
  summary: string;
  description: string;
};

export const EventsListComponent = () => {
  const [events, setEvents] = useState<Event[] | null>(null);

  const fetchCalendarEvents = async () => {
    const response = await fetch('/api/events/getList');
    const data: { events: Event[] } = await response.json();
    setEvents(data.events);
  };

  return (
    <>
      <Button onClick={fetchCalendarEvents}>이벤트 불러오기</Button>
      {events && (
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li key={index} className="p-4 border rounded shadow">
              <h2 className="text-xl font-bold">{event.summary}</h2>
              <p className="text-gray-600">{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

type CreateRes = {
  success: boolean;
  htmlLink: string;
};

export const EventsCreateComponent = () => {
  const [events, setEvents] = useState<CreateRes | null>(null);

  const createCalendarEvent = async () => {
    const response = await fetch('/api/events/create', {
      method: 'POST',
    });
    const data: CreateRes = await response.json();
    setEvents(data);
  };

  return (
    <>
      <Button onClick={createCalendarEvent}>이벤트 생성</Button>
      {events && (
        <ul className="space-y-4">
          {events && (
            <li key={'create'} className="p-4 border rounded shadow">
              <h2 className="text-xl font-bold">
                {events.success && '성공적으로 이벤트 생성! 🎉'}
              </h2>
              <p className="text-gray-600">{events.htmlLink}</p>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export const EventDeleteComponent = () => {
  const [events, setEvents] = useState<boolean | null>(null);

  const createCalendarEvent = async () => {
    const response = await fetch('/api/events/delete', {
      method: 'DELETE',
    });
    const data: CreateRes = await response.json();
    setEvents(data.success);
  };

  return (
    <>
      <Button onClick={createCalendarEvent}>이벤트 삭제</Button>
      {events && (
        <ul className="space-y-4">
          {events === true && (
            <li key={'delete'} className="p-4 border rounded shadow">
              <h2 className="text-xl font-bold">성공적으로 이벤트 삭제!</h2>
            </li>
          )}
          {/*@ts-ignore*/}
          {events === false && (
            <li key={'delete'} className="p-4 border rounded shadow">
              <h2 className="text-xl font-bold">이벤트 삭제 실패 ㅠㅠ</h2>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export const EventsUpdateComponent = () => {
  const [events, setEvents] = useState<CreateRes | null>(null);

  const createCalendarEvent = async () => {
    const response = await fetch('/api/events/update', {
      method: 'PUT',
    });
    const data: CreateRes = await response.json();
    setEvents(data);
  };

  return (
    <>
      <Button onClick={createCalendarEvent}>이벤트 업데이트</Button>
      {events && (
        <ul className="space-y-4">
          {events && (
            <li key={'create'} className="p-4 border rounded shadow">
              <h2 className="text-xl font-bold">
                {events.success && '성공적으로 이벤트 업데이트! 🎉'}
              </h2>
              <p className="text-gray-600">{events.htmlLink}</p>
            </li>
          )}
        </ul>
      )}
    </>
  );
};
