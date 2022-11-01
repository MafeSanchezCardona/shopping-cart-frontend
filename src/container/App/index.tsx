import { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider, StyledEngineProvider } from '@mui/material';

import './App.css';

import Basket from '../../pages/Basket';
import Login from '../../pages/Login';
import Products from '../../pages/Products';
import Users from '../../pages/Users';
import theme from '../../theme';

export default function App(): ReactElement {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <BrowserRouter basename={'/'}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/users' element={<Users />} />
            <Route path='/shopping-cart' element={<Basket />} />
            <Route path='/product/new' element={<Products />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
