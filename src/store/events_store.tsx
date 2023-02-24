import { create } from 'zustand';

export interface IEvent {
  id: string;
  title: string;
  date: Date | null;
}

export interface IEventsStore {
  events: IEvent[];
  addEvent: (event: IEvent) => void;
  deleteEvent: (event: IEvent) => void;
}

export const useEventsStore = create<IEventsStore>((set) => ({
  events: [],
  addEvent: (event: IEvent) =>
    set((state) => ({
      events: [...state.events, event],
    })),
  deleteEvent: (deleteEvent: IEvent) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== deleteEvent.id),
    })),
}));
