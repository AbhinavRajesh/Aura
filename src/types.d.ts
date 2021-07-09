export interface User {
  email: string;
  [year: number]: Object<Mood>;
}

export interface Mood {
  date: number;
  mood: number;
  notes: string;
}

export interface Calendar {
  notes: string;
  color: string;
}
