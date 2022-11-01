import { ReactElement, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import {
  Alert,
  Box,
  Button,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography
} from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useCreateProduct } from '../../hooks/mutations';
import { Product } from '../../types';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  type: yup.string().required('Type is required'),
  description: yup.string().required('Description is required')
});

type LocationState = {
  userId: number;
};

export default function Products(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const useCreate = useCreateProduct();
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm<Product>({
    defaultValues: {
      name: '',
      description: ''
    },
    resolver: yupResolver(schema)
  });

  const handleSave = (values: Product) => {
    useCreate.mutate(values, {
      onSuccess: () => {
        reset();
        setOpen(true);
      }
    });
  };

  const handleCancel = () => {
    navigate('/shopping-cart', {
      state: {
        userId: (location.state as LocationState).userId
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component='form'>
      <Stack spacing={2} m={2} alignItems='center'>
        <Typography variant='h6'>Create Product</Typography>
        <Box alignItems='center' justifyContent={'space-between'}>
          <Controller
            control={control}
            name={'name'}
            render={({ field, fieldState }) => (
              <TextField
                id='name'
                label='Name'
                size={'small'}
                variant={'outlined'}
                inputProps={{ maxLength: 30 }}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message ?? ''}
              />
            )}
          />
        </Box>
        <Box
          display='flex'
          alignItems='center'
          justifyContent={'space-between'}
          sx={{
            '& .MuiTextField-root': { width: '196px' }
          }}>
          <Controller
            control={control}
            name={'type'}
            render={({ field, fieldState }) => (
              <TextField
                id='type'
                label='Type'
                select
                size={'small'}
                variant={'outlined'}
                inputProps={{ width: '100%' }}
                onChange={field.onChange}
                value={field.value}
                error={!!fieldState.error}
                helperText={fieldState.error?.message ?? ''}>
                <MenuItem key={'Books'} value={'Books'}>
                  Books
                </MenuItem>
                <MenuItem key={'Music'} value={'Music'}>
                  Music
                </MenuItem>
                <MenuItem key={'Games'} value={'Games'}>
                  Games
                </MenuItem>
              </TextField>
            )}
          />
        </Box>
        <Box display='flex' alignItems='center' justifyContent={'space-between'}>
          <Controller
            control={control}
            name={'description'}
            render={({ field, fieldState }) => (
              <TextField
                id='description'
                label='Description'
                size={'small'}
                variant={'outlined'}
                inputProps={{ maxLength: 100 }}
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
          Product created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
