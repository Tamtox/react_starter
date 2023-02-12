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
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useReducer } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import Loading from '@/components/loading/Loading';
import { IAuthStore, useAuthStore } from '@/store/auth_store';

interface IHomeState {
  search: string;
  page: string;
  query: string;
}

const myPosts = [
  { id: '1', title: 'Post 1' },
  { id: '2', title: 'Post 2' },
  { id: '3', title: 'Post 3' },
  { id: '4', title: 'Post 4' },
  { id: '5', title: 'Post 5' },
  { id: '6', title: 'Post 6' },
  { id: '7', title: 'Post 7' },
  { id: '8', title: 'Post 8' },
];

function wait(durationSeconds: number) {
  return new Promise((resolve) => setTimeout(resolve, durationSeconds * 1000));
}

const Home: React.FC = (): JSX.Element => {
  const { darkMode, toggleDarkMode } = useAuthStore((state: IAuthStore) => state);
  const [state, setState] = useReducer((state: IHomeState, action: Partial<IHomeState>) => ({ ...state, ...action }), {
    search: '',
    query: 'name',
    page: '1',
  });
  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1).then(() => [...myPosts]),
  });
  const posMutation = useMutation({});
  if (postQuery.isLoading) return <Loading height="100vh" />;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;
  return (
    <Container maxWidth={false} className="home">
      <Box className={`toolbar`}>
        <Button variant="outlined">Reset</Button>
      </Box>
      <Box className={`list`}>
        {postQuery.data.map((post) => (
          <Card key={post.id}>{post.title}</Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
