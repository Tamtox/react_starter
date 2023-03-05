import '@/styles/home.scss';

import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import Loading from '@/components/loading/Loading';
import { IAuthStore, useAuthStore } from '@/store/auth_store';
import { IEvent, IEventsStore, useEventsStore } from '@/store/events_store';

interface IHomeState {
  eventTitle: string;
}

const Home: React.FC = (): JSX.Element => {
  const { darkMode, toggleDarkMode } = useAuthStore((state: IAuthStore) => state);
  const { events, setEvents, clearEvents, addEvent, deleteEvent } = useEventsStore((state: IEventsStore) => state);
  const [state, setState] = useReducer((state: IHomeState, action: Partial<IHomeState>) => ({ ...state, ...action }), {
    eventTitle: '',
  });
  // Query
  const queryClient = new QueryClient();
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: (queryKey) => {
      return 1;
    },
  });
  const mutation = useMutation({
    // mutationFn: (title: string) => {
    //   return wait(1).then(() => events.push({ id: crypto.randomUUID(), title }));
    // },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });
  if (query.isLoading) return <Loading height="100vh" />;
  if (query.isError) return <pre>{JSON.stringify(query.error)}</pre>;
  return (
    <Container maxWidth={false} className="home">
      <Box className={`toolbar`}>
        <TextField
          label="event name"
          value={state.eventTitle}
          onChange={(event) => {
            setState({ eventTitle: event.currentTarget.value });
          }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            // mutation.mutate('new post');
          }}
        >
          Add
        </Button>
      </Box>
      <Box className={`list`}>
        {events.map((event: IEvent) => {
          return <Card key={event.id}>{event.title}</Card>;
        })}
      </Box>
    </Container>
  );
};

export default Home;
