import styles from './auth.module.scss';

import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { MdOutlineEmail } from 'react-icons/md';

interface AuthPassResetProps {
  passwordResetEmail: string;
  authInputsHandler: (newValue: string, element: string) => void;
  togglePasswordResetMode: () => void;
}

const AuthPassReset = ({ passwordResetEmail, authInputsHandler, togglePasswordResetMode }: AuthPassResetProps) => {
  const passwordResetHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Password reset handler');
    togglePasswordResetMode();
  };
  return (
    <form className={`${styles.auth__passreset} ${styles.auth__form}`} onSubmit={passwordResetHandler}>
      <Box className={`${styles.auth__inputs}`}>
        <TextField
          className={`${styles.auth__input} scale-in-center`}
          value={passwordResetEmail}
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
      <Box className={`${styles.auth__buttons}`}>
        <Button onClick={togglePasswordResetMode} size="large" variant="outlined" className={`${styles.auth__button}`}>
          Back
        </Button>
        <Button type="submit" size="large" variant="contained" className={`${styles.auth__button}`}>
          Reset Password
        </Button>
      </Box>
    </form>
  );
};

export default AuthPassReset;
