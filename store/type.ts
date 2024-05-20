export interface Todo {
  id: string;
  title: string;
  dueDate: Date;
  completed: boolean;
}

export interface EventDto {
  id: string;
  status: 'confirmed';

  created: '2024-05-20T06:53:31.000Z';
  updated: '2024-05-20T06:53:31.867Z';
  summary: string;
  description?: string;

  start: {
    date?: '2024-05-01';
    dateTime?: '2024-05-20T17:30:00+09:00';
    timeZone: 'Asia/Seoul';
  };
  end: {
    date?: '2024-05-01';
    dateTime?: '2024-05-20T18:30:00+09:00';
    timeZone: 'Asia/Seoul';
  };
}
