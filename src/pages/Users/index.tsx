import { ReactElement, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { Alert, Box, Button, Snackbar, Stack, TextField, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import * as yup from 'yup';

import { useCreateUser } from '../../hooks/mutations';
import { User } from '../../types';

const schema = yup.object({
  loginName: yup.string().required('Login name is required'),
  password: yup.string().required('Password is required')
});

export default function Users(): ReactElement {
  const navigate = useNavigate();
  const useCreate = useCreateUser();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { control, handleSubmit, reset } = useForm<User>({
    defaultValues: {
      loginName: '',
      password: ''
    },
    resolver: yupResolver(schema)
  });

  const handleSave = (values: User) => {
    useCreate.mutate(values, {
      onSuccess: () => {
        reset();
        setOpen(true);
      },
      onError: (error) => {
        const response = error as AxiosError;
        setErrorMessage(response?.response?.data as string);
        setOpenError(true);
      }
    });
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <Box component='form'>
      <Stack spacing={2} m={2} alignItems='center'>
        <Typography variant='h6'>Register</Typography>
        <Box display='flex' alignItems='center' justifyContent={'space-between'}>
          <Controller
            control={control}
            name={'loginName'}
            render={({ field, fieldState }) => (
              <TextField
                id='loginName'
                label='Login Name'
                size={'small'}
                variant={'outlined'}
                inputProps={{ maxLength: 20 }}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message ?? ''}
              />
            )}
          />
        </Box>
        <Box display='flex' alignItems='center' justifyContent={'space-between'}>
          <Controller
            control={control}
            name={'password'}
            render={({ field, fieldState }) => (
              <TextField
                id='password'
                label='Password'
                size={'small'}
                variant={'outlined'}
                inputProps={{ maxLength: 20 }}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message ?? ''}
              />
            )}
          />
        </Box>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Button color='primary' variant='contained' onClick={handleCancel}>
            Back
          </Button>
          <Button
            color='primary'
            variant='contained'
            onClick={handleSubmit((values) => handleSave(values))}>
            Save
          </Button>
        </Stack>
      </Stack>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          User created successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity='error' sx={{ width: '100%' }}>
          {errorMessage ? errorMessage : ''}
        </Alert>
      </Snackbar>
    </Box>
  );
}
