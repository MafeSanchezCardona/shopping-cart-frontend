import { ReactElement, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import {
  TableRow,
  Box,
  Button,
  MenuItem,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Typography,
  TableBody,
  Grid,
  Alert,
  Snackbar
} from '@mui/material';

import { AxiosError } from 'axios';

import { useCreateBasket } from '../../hooks/mutations';
import { useSearchAllProducts, useSearchCart, useSearchProducts } from '../../hooks/queries';
import { Product } from '../../types';

type LocationState = {
  userId: number;
};

export default function Basket(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();

  const [productName, setProductName] = useState<string>('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [selected, setSelected] = useState<Product>();
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const createItemBasket = useCreateBasket();
  const { data: products } = useSearchAllProducts({
    enabled: true
  });

  const { data, refetch: refetchProducts } = useSearchProducts(productName, type, {
    enabled: true
  });

  const { data: cartData, refetch } = useSearchCart((location.state as LocationState).userId, {
    enabled: true
  });

  const handleCreateProduct = () => {
    navigate('/product/new', {
      state: {
        userId: (location.state as LocationState).userId
      }
    });
  };

  const handleAddProductToCart = () => {
    createItemBasket.mutate(
      {
        userId: (location.state as LocationState).userId,
        productId: selected?.id,
        quantity: quantity
      },
      {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          const response = error as AxiosError;
          setErrorMessage(response?.response?.data as string);
          setOpenError(true);
        }
      }
    );
  };

  const getProduct = (productId: number) => {
    return Array.isArray(products)
      ? products.filter((product) => product.id === productId)[0]
      : undefined;
  };

  const handleCloseError = () => {
    setOpenError(false);
  };

  return (
    <Box alignItems={'center'}>
      <Stack spacing={2} m={2}>
        <Stack direction={'row'} spacing={1}>
          <Button color='primary' variant='contained' onClick={handleCreateProduct}>
            Create Product
          </Button>
        </Stack>

        <Typography variant='h6'>Products</Typography>
        <Stack
          direction={'row'}
          spacing={1}
          sx={{
            '& .MuiTextField-root': { width: '300px' }
          }}>
          <TextField
            id='productName'
            label='Product Name'
            size={'small'}
            variant={'outlined'}
            value={productName}
            inputProps={{ maxLength: 30 }}
            onChange={(event) => {
              setProductName(event.target.value);
            }}
          />
          <TextField
            id='type'
            label='Type'
            select
            defaultValue={''}
            size={'small'}
            variant={'outlined'}
            inputProps={{ width: '100%' }}
            onChange={(event) => {
              setType(event.target.value);
            }}
            value={type}>
            <MenuItem key={'all'} value={''}>
              All
            </MenuItem>
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
          <Button color='primary' variant='contained' onClick={() => refetchProducts()}>
            Search
          </Button>
        </Stack>
        <Stack spacing={1}>
          <Grid container width={1}>
            <Grid item xs={8}>
              <TableContainer>
                <Table sx={{ width: 750 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align='right'>ID</TableCell>
                      <TableCell align='left'>Product Name</TableCell>
                      <TableCell align='left'>Type</TableCell>
                      <TableCell align='left'>Description</TableCell>
                      <TableCell align='left'>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(data)
                      ? data?.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onSelect={() => setSelected(row)}>
                            <TableCell align='right'>{row.id}</TableCell>
                            <TableCell align='left'>{row.name}</TableCell>
                            <TableCell align='left'>{row.type}</TableCell>
                            <TableCell align='left'>{row.description}</TableCell>
                            <TableCell align='left'>
                              <Stack
                                direction={'row'}
                                spacing={1}
                                sx={{
                                  '& .MuiTextField-root': { width: '100px' }
                                }}>
                                <TextField
                                  id='quantity'
                                  size={'small'}
                                  variant={'outlined'}
                                  inputProps={{ maxLength: 3 }}
                                  onChange={(event) => setQuantity(Number(event.target.value))}
                                />
                                <Button
                                  color='secondary'
                                  variant='contained'
                                  onClick={handleAddProductToCart}>
                                  Add
                                </Button>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={4}>
              <Typography variant='h6'>Products in cart</Typography>
              <TableContainer>
                <Table sx={{ width: 400 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell align='left'>Product Name</TableCell>
                      <TableCell align='left'>Type</TableCell>
                      <TableCell align='left'>Quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(cartData)
                      ? cartData?.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align='left'>{getProduct(row.productId)?.name}</TableCell>
                            <TableCell align='left'>{getProduct(row.productId)?.type}</TableCell>
                            <TableCell align='left'>{row.quantity}</TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity='error' sx={{ width: '100%' }}>
          {errorMessage ? errorMessage : ''}
        </Alert>
      </Snackbar>
    </Box>
  );
}
