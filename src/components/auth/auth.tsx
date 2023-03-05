import './auth.scss';

import { Box, Button, Card, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useReducer } from 'react';
import { MdLockOutline, MdOutlineAccountCircle, MdOutlineEmail } from 'react-icons/md';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

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
  passwordVisible: boolean;
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
    passwordVisible: false,
    passwordRepeat: '',
    passwordResetMode: false,
    passwordResetEmail: '',
  });
  const authInputsHandler = (newValue: string, element: string) => {
    setState({ [element]: newValue });
  };
  const authFormSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const { email, username, password, passwordRepeat } = state;
    // Check if passwords match
    if (password !== passwordRepeat) {
      setState({ label: 'Passwords do not match' });
      return;
    }
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
    <form className={`auth__pass-reset auth__form`} onSubmit={passwordResetHandler}>
      <Box className={`auth__inputs`}>
        <TextField
          className={`auth__input`}
          value={state.passwordResetEmail}
          onChange={(event) => {
            authInputsHandler(event.target.value, 'passwordResetEmail');
          }}
          required
          fullWidth
          type="email"
          autoComplete="email"
          placeholder="Email"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdOutlineEmail className="icon" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className={`auth__buttons`}>
        <Button onClick={togglePasswordResetMode} size="large" variant="outlined" className={`auth__button`}>
          Back
        </Button>
        <Button type="submit" size="large" variant="contained" className={`auth__button`}>
          Reset Password
        </Button>
      </Box>
    </form>
  ) : null;
  return (
    <Modal
      className={`auth__modal`}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card className={`auth`}>
        <Box className={`auth__header`}>
          <Typography variant="h5" component="h2">
            {state.label}
          </Typography>
        </Box>
        {passwordResetNode ? (
          passwordResetNode
        ) : (
          <form className={`auth__sign-in auth__form`} onSubmit={authFormSubmitHandler}>
            <Box className={`auth__inputs`}>
              <TextField
                className={`auth__input`}
                value={state.email}
                onChange={(event) => {
                  authInputsHandler(event.target.value, 'email');
                }}
                required
                fullWidth
                placeholder="Email"
                type="email"
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineEmail className="icon" />
                    </InputAdornment>
                  ),
                }}
              />
              {state.isLogin ? null : (
                <TextField
                  className={`auth__input`}
                  value={state.username}
                  onChange={(event) => {
                    authInputsHandler(event.target.value, 'username');
                  }}
                  required
                  fullWidth
                  placeholder="Username"
                  type="text"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdOutlineAccountCircle className="icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              <TextField
                className={`auth__input`}
                value={state.password}
                onChange={(event) => {
                  authInputsHandler(event.target.value, 'password');
                }}
                required
                fullWidth
                placeholder="Password"
                type={state.passwordVisible ? 'text' : 'password'}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdLockOutline className="icon" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        className={`icon-container`}
                        color="inherit"
                        onClick={() => {
                          setState({ passwordVisible: !state.passwordVisible });
                        }}
                      >
                        {state.passwordVisible ? <RxEyeOpen className="icon" /> : <RxEyeClosed className="icon" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {state.isLogin ? null : (
                <TextField
                  className={`auth__input`}
                  value={state.passwordRepeat}
                  onChange={(event) => {
                    authInputsHandler(event.target.value, 'passwordRepeat');
                  }}
                  required
                  fullWidth
                  placeholder="Repeat Password"
                  type={state.passwordVisible ? 'text' : 'password'}
                  autoComplete="current-password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MdLockOutline className="icon" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          className={`icon-container`}
                          color="inherit"
                          onClick={() => {
                            setState({ passwordVisible: !state.passwordVisible });
                          }}
                        >
                          {state.passwordVisible ? <RxEyeOpen className="icon" /> : <RxEyeClosed className="icon" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </Box>
            <Box className={`auth__buttons`}>
              <Button onClick={togglePasswordResetMode} size="large" variant="outlined" className={`auth__button`}>
                Reset Password
              </Button>
              <Button type="submit" size="large" variant="contained" className={`auth__button`}>
                {state.isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </Box>
            <Typography
              className={`auth__toggle`}
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
