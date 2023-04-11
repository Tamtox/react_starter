import styles from './auth.module.scss';

import { Box, Button, Card, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useReducer } from 'react';
import { MdLockOutline, MdOutlineAccountCircle, MdOutlineEmail } from 'react-icons/md';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

import AuthPassReset from '@/features/auth/auth_pass_reset';
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
  const toggleAuthMode = () => {
    setState({
      isLogin: !state.isLogin,
      label: state.isLogin ? 'Sign Up' : 'Sign In',
    });
  };
  return (
    <Modal
      className={`${styles.auth__modal}`}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card className={`${styles.auth}`}>
        <Box className={`${styles.auth__header}`}>
          <Typography variant="h5" component="h2">
            {state.label}
          </Typography>
        </Box>
        {state.passwordResetMode ? (
          <AuthPassReset
            passwordResetEmail={state.passwordResetEmail}
            authInputsHandler={authInputsHandler}
            togglePasswordResetMode={togglePasswordResetMode}
          />
        ) : (
          <form className={`${styles.auth__signin} ${styles.auth__form}`} onSubmit={authFormSubmitHandler}>
            <Box className={`${styles.auth__inputs}`}>
              <TextField
                className={`${styles.auth__input} scale-in-center`}
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
                  className={`${styles.auth__input} scale-in-center`}
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
                className={`${styles.auth__input} scale-in-center`}
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
                  className={`${styles.auth__input} scale-in-center`}
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
            <Box className={`${styles.auth__buttons}`}>
              <Button
                onClick={togglePasswordResetMode}
                size="large"
                variant="outlined"
                className={`${styles.auth__button}`}
              >
                Reset Password
              </Button>
              <Button type="submit" size="large" variant="contained" className={`${styles.auth__button}`}>
                {state.isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </Box>
            <Typography className={`${styles.auth__toggle}`} onClick={toggleAuthMode} variant="h6" component="h2">
              {state.isLogin ? 'Create new account' : 'Use existing account'}
            </Typography>
          </form>
        )}
      </Card>
    </Modal>
  );
};

export default Auth;
