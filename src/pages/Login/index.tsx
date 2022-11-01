import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router';

import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';

import { useUser } from '../../hooks/queries';
import { User } from '../../types';

export default function Login(): ReactElement {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [open, setOpen] = useState(false);
  const { data, refetch } = useUser(username, password, {
    onSuccess: (data: User) => {
      if (data && data.userId) {
        navigate('/shopping-cart', {
          state: {
            userId: data.userId
          }
        });
      } else {
        setOpen(true);
      }
    },
    enabled: false
  });

  const handleLogin = () => {
    refetch();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = () => {
    navigate('/users');
  };

  return (
    <Box component='form'>
      <Stack spacing={2} m={2} alignItems='center'>
        <Typography variant='h6'>Login</Typography>
        <Box display='flex' alignItems='center' justifyContent={'space-between'}>
          <TextField
            id='username'
            label='Login Name'
            size={'small'}
            variant={'outlined'}
            value={username}
            inputProps={{ maxLength: 20 }}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Box>
        <Box display='flex' alignItems='center' justifyContent={'space-between'}>
          <TextField
            id='password'
            label='Password'
            size={'small'}
            variant={'outlined'}
            value={password}
            inputProps={{ maxLength: 20 }}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Box>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Button color='primary' variant='contained' onClick={handleRegister}>
            Register
          </Button>
          <Button color='primary' variant='contained' onClick={handleLogin}>
            Login
          </Button>
        </Stack>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }}>
            Please enter the correct login name and password
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
}
