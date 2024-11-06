import  { createContext, useContext, useReducer } from 'react';

const EventContext = createContext(null);

/* eslint-disable react/prop-types */

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    default:
      return state;
  }
};

const initialEvents = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    date: '2024-04-15',
    time: '09:00',
    location: 'Innovation Center',
    description: 'Annual technology conference featuring industry leaders and innovators.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200',
    category: 'Technology',
  },
  {
    id: '2',
    title: 'Music Festival',
    date: '2025-01-20',
    time: '18:00',
    location: 'Central Park',
    description: 'A night of live music featuring local and international artists.',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1200',
    category: 'Entertainment',
  },
  {
    id: '3',
    title: 'Marriage Festival',
    date: '2024-12-20',
    time: '18:00',
    location: 'Mysure Palace',
    description: 'Celebrate your love story with us.',
    image: 'https://cdn0.weddingwire.in/vendor/9975/3_2/960/jpg/25659423-175199439745803-2051114183330359789-n_15_59975.jpeg',
    category: 'Marriage',
  }
];

export const EventProvider = ({ children }) => {
  const [state, dispatch] = useReducer(eventReducer, { events: initialEvents });

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
};
