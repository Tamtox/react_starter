import '@/styles/title.scss';

import { Box, Button, Container } from '@mui/material';
import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { authActions } from '@/store/store';

const Title: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <Container className="title">
      <Button
        variant="outlined"
        onClick={() => {
          dispatch(authActions.toggleDarkMode());
        }}
      >
        Button
      </Button>
    </Container>
  );
};

export default Title;
