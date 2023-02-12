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
import React, { useEffect, useReducer } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '@/components/loading/Loading';
import { authActions } from '@/store/store';
import { RootState } from '@/store/store';

interface IHomeState {
  search: string;
  page: string;
  query: string;
}

const Home: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const [state, setState] = useReducer((state: IHomeState, action: Partial<IHomeState>) => ({ ...state, ...action }), {
    search: '',
    query: 'name',
    page: '1',
  });
  return (
    <Container maxWidth={false} className="home">
      <Card>
        <Button variant="outlined">123</Button>
      </Card>
    </Container>
  );
};

export default Home;
