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
import React, { useEffect, useReducer } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import Loading from '@/components/loading/Loading';
import { IAuthStore, useAuthStore } from '@/store/auth_store';
import { IPostsStore, usePostsStore } from '@/store/posts_store';

interface IHomeState {
  search: string;
  page: string;
  query: string;
}

function wait(durationSeconds: number) {
  return new Promise((resolve) => setTimeout(resolve, durationSeconds * 1000));
}

const Home: React.FC = (): JSX.Element => {
  const { darkMode, toggleDarkMode } = useAuthStore((state: IAuthStore) => state);
  const { posts, addPost, deletePost } = usePostsStore((state: IPostsStore) => state);
  const [state, setState] = useReducer((state: IHomeState, action: Partial<IHomeState>) => ({ ...state, ...action }), {
    search: '',
    query: 'name',
    page: '1',
  });
  // Query
  const queryClient = new QueryClient();
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: (queryKey) =>
      wait(1).then(() => {
        return [...posts];
      }),
  });
  const mutation = useMutation({
    mutationFn: (title: string) => {
      return wait(1).then(() => posts.push({ id: crypto.randomUUID(), title }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });
  if (query.isLoading) return <Loading height="100vh" />;
  if (query.isError) return <pre>{JSON.stringify(query.error)}</pre>;
  return (
    <Container maxWidth={false} className="home">
      <Box className={`toolbar`}>
        <Button
          variant="outlined"
          onClick={() => {
            mutation.mutate('new post');
          }}
        >
          Add
        </Button>
      </Box>
      <Box className={`list`}>
        {query.data.map((post) => (
          <Card key={post.id}>{post.title}</Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
