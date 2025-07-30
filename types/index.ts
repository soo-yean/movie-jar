export type Movie = {
  id: string;
  title: string;
  created_at?: string;
  watched?: boolean;
};

export type Event = {
  title: string;
  start: string;
  end: string;
  emoji: string;
  label: string;
};

export type Letter = {
  id: string;
  emoji: string;
  message: string;
  sender?: string;
  created_at?: string;
};

export type Dday = {
  id: string;
  event: string;
  date: string;
  created_at?: string;
};
