export type Movie = {
  id: string;
  title: string;
  created_at?: string;
  watched?: boolean;
};

export type Event = {
  title: string;
  date: string;
  emoji: string;
  label: string;
};

export type Letter = {
  id: string;
  emoji: string;
  message: string;
  sender?: string;
  created_at: string;
};
