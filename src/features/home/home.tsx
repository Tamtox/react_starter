import './home.scss';

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

import Loading from '@/components/loading/Spinner';
import { IAuthStore, useAuthStore } from '@/store/auth_store';
import { IEvent, IEventsStore, useEventsStore } from '@/store/events_store';

interface IFlatData {
  area: string;
  ceiling: string;
  city: string;
  isFormerDorm: string;
  floor: string;
  imageUrls: string[];
  materials: string;
  price: string;
  rooms: string;
  url: string;
  year: string;
}

interface IHomeState {
  url: string;
  loadData: boolean;
  flatData: IFlatData;
}

const Home: React.FC = (): JSX.Element => {
  const { darkMode, toggleDarkMode } = useAuthStore((state: IAuthStore) => state);
  const { events, setEvents, clearEvents, addEvent, deleteEvent } = useEventsStore((state: IEventsStore) => state);
  const [state, setState] = useReducer((state: IHomeState, action: Partial<IHomeState>) => ({ ...state, ...action }), {
    url: '',
    loadData: false,
    flatData: {
      area: '',
      ceiling: '',
      city: '',
      isFormerDorm: '',
      floor: '',
      imageUrls: [],
      materials: '',
      price: '',
      rooms: '',
      url: '',
      year: '',
    },
  });
  // Query
  const queryClient = new QueryClient();
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: (queryKey) => {
      return 1;
    },
  });
  // const mutation = useMutation({
  //   // mutationFn: (title: string) => {
  //   //   return wait(1).then(() => events.push({ id: crypto.randomUUID(), title }));
  //   // },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['posts']);
  //   },
  // });
  // if (query.isLoading) return <Loading height="100vh" />;
  // if (query.isError) return <pre>{JSON.stringify(query.error)}</pre>;
  const loadData = async () => {
    try {
      const response: { data: { flatData: IFlatData } } = await axios.request({
        url: 'http://localhost:8080/parsePage',
        method: 'POST',
        data: { url: state.url },
      });
      const { flatData } = response.data;
      setState({ flatData });
    } catch (e) {
      console.error(e);
    } finally {
      setState({ loadData: false });
    }
  };
  useEffect(() => {
    if (state.loadData) {
      loadData();
    }
  }, [state.loadData]);
  return (
    <Container maxWidth={false} className="home">
      <Box className={`toolbar`}>
        <TextField
          placeholder="Url eg https://krisha.kz/a/show/49275461"
          value={state.url}
          size="small"
          fullWidth
          onChange={(event) => {
            setState({ url: event.currentTarget.value });
          }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            setState({ loadData: true });
          }}
        >
          Search
        </Button>
      </Box>
      <Box className={`list`}>
        {Object.keys(state.flatData).map((key: string, index: number) => {
          return <Card className="list-item" key={index}>{`${key} - ${state.flatData[key as keyof IFlatData]}`}</Card>;
        })}
      </Box>
    </Container>
  );
};

export default Home;
