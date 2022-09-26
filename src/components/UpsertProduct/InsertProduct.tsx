import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import Product from '../../models/Product';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { apiUpsertProduct } from '../../remote/e-commerce-api/productService';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();
export const InsertProduct = () => {
  const navigate = useNavigate(); 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const product: Product = {
      id: -1,
      name: `${data.get('productName')}`,
      quantity: parseInt(`${data.get('quantity')}`),
      price: parseFloat(`${data.get('price')}`),
      description: `${data.get('description')}`,
      image: `${data.get('image')}`
    }
    console.log(product);
    const response = await apiUpsertProduct(product);
    console.log(response);
    navigate('/');
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
             Add Product
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                  required
                  id="productName"
                  name="productName"
                  label="Product Name"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  fullWidth
                  variant="standard"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="price"
                  name="price"
                  label="Price"
                  fullWidth
                  inputProps={{ inputMode: 'decimal' }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  id="description"
                  name="description"
                  label="Description"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="image"
                  name="image"
                  label="Image"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add Product
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}