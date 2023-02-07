import '@/styles/title.scss';

import { Box, Button, Card, Container, Typography } from '@mui/material';
import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { authActions } from '@/store/store';

const Title: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <Container className="title">
      <Card className={`title-card`}>
        <Button variant="outlined">Button</Button>
        <Typography>Sample text</Typography>
      </Card>
    </Container>
  );
};

export default Title;
