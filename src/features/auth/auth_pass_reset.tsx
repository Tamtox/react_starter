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
    <form className={`auth__pass-reset auth__form`} onSubmit={passwordResetHandler}>
      <div>Pass Reset</div>
      {/* <Box className={`auth__inputs`}>
        <TextField
          className={`auth__input scale-in-center`}
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
      <Box className={`auth__buttons`}>
        <Button onClick={togglePasswordResetMode} size="large" variant="outlined" className={`auth__button`}>
          Back
        </Button>
        <Button type="submit" size="large" variant="contained" className={`auth__button`}>
          Reset Password
        </Button>
      </Box> */}
    </form>
  );
};

export default AuthPassReset;
