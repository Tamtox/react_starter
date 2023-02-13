import './auth.scss';

import { Box, Button, Card, Input, Modal, TextField, Typography } from '@mui/material';
import React, { useReducer } from 'react';

import { useAuthStore } from '@/store/auth_store';

type Props = {
  open: boolean;
  handleClose: (e: any) => void;
};

interface State {
  label: string;
  isLogin: boolean;
  email: string;
  username: string;
  password: string;
  passwordRepeat: string;
  passwordResetMode: boolean;
  passwordResetEmail: string;
}

const Auth = ({ open, handleClose }: Props): JSX.Element => {
  const { authToken, darkMode } = useAuthStore((state) => state);
  const [state, setState] = useReducer((state: State, action: Partial<State>) => ({ ...state, ...action }), {
    label: 'Sign In',
    isLogin: true,
    email: '',
    username: '',
    password: '',
    passwordRepeat: '',
    passwordResetMode: false,
    passwordResetEmail: '',
  });
  const authInputsHandler = (newValue: string, element: string) => {
    setState({ [element]: newValue });
  };
  const authFormSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submit handler');
  };
  // Password reset
  const togglePasswordResetMode = () => {
    setState({
      passwordResetMode: !state.passwordResetMode,
      passwordResetEmail: '',
      label: state.passwordResetMode ? (state.isLogin ? 'Sign In' : 'Sign Up') : 'Reset Password',
    });
  };
  const passwordResetHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Password reset handler');
    togglePasswordResetMode();
  };
  const passwordResetNode = state.passwordResetMode ? (
    <form className={`auth-pass-reset auth-form`} onSubmit={passwordResetHandler}>
      <Box className={`auth-inputs`}>
        <TextField
          className={`auth-input`}
          value={state.passwordResetEmail}
          onChange={(event) => {
            authInputsHandler(event.target.value, 'passwordResetEmail');
          }}
          required
          fullWidth
          label="Email Address"
          type="email"
          autoComplete="email"
        />
      </Box>
      <Box className={`auth-buttons`}>
        <Button onClick={togglePasswordResetMode} size="large" variant="outlined" className={`auth-button`}>
          Back
        </Button>
        <Button type="submit" size="large" variant="contained" className={`auth-button`}>
          Reset Password
        </Button>
      </Box>
    </form>
  ) : null;
  return (
    <Modal
      className={`auth-modal`}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card className={`auth`}>
        <Box className={`auth-header`}>
          <Typography variant="h5" component="h2">
            {state.label}
          </Typography>
        </Box>
        {passwordResetNode ? (
          passwordResetNode
        ) : (
          <form className={`auth-login auth-form`} onSubmit={authFormSubmitHandler}>
            <Box className={`auth-inputs`}>
              <TextField
                className={`auth-input`}
                value={state.email}
                onChange={(event) => {
                  authInputsHandler(event.target.value, 'email');
                }}
                required
                fullWidth
                label="Email Address"
                type="email"
                autoComplete="email"
              />
              {state.isLogin ? null : (
                <TextField
                  className={`auth-input`}
                  value={state.username}
                  onChange={(event) => {
                    authInputsHandler(event.target.value, 'username');
                  }}
                  required
                  fullWidth
                  label="Username"
                  type="text"
                />
              )}
              <TextField
                className={`auth-input`}
                value={state.password}
                onChange={(event) => {
                  authInputsHandler(event.target.value, 'password');
                }}
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
              />
              {state.isLogin ? null : (
                <TextField
                  className={`auth-input`}
                  value={state.passwordRepeat}
                  onChange={(event) => {
                    authInputsHandler(event.target.value, 'passwordRepeat');
                  }}
                  required
                  fullWidth
                  label="Repeat Password"
                  type="password"
                  autoComplete="current-password"
                />
              )}
            </Box>
            <Box className={`auth-buttons`}>
              <Button onClick={togglePasswordResetMode} size="large" variant="outlined" className={`auth-button`}>
                Reset Password
              </Button>
              <Button type="submit" size="large" variant="contained" className={`auth-button`}>
                {state.isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </Box>
            <Typography
              className={`auth-toggle`}
              onClick={() => {
                setState({ isLogin: !state.isLogin, label: state.isLogin ? 'Sign Up' : 'Sign In' });
              }}
              variant="h6"
              component="h2"
            >
              {state.isLogin ? 'Create new account' : 'Use existing account'}
            </Typography>
          </form>
        )}
      </Card>
    </Modal>
  );
};

export default Auth;
