
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import Product from '../../models/Product';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom'
import { apiUpsertProduct } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
const theme = createTheme();
export const UpsertProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getProduct = () => {
    if (location.state.product)
      return location.state.product
    else
      return []
  }
  const editProduct = getProduct()

  const header = () => {

    if (editProduct.length <= 0) {
      return (
        <Typography component="h1" variant="h5">
          Add Product
        </Typography>
      )
    } else {
      return (
        <Typography component="h1" variant="h5">
          Edit Product
        </Typography>
      )
    }
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (editProduct.length <= 0) {
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
      if (response.status >= 200 && response.status < 300) navigate('/')

    } else {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const product: Product = {
        id: editProduct.id,
        name: `${data.get('productName')}`,
        quantity: parseInt(`${data.get('quantity')}`),
        price: parseFloat(`${data.get('price')}`),
        description: `${data.get('description')}`,
        image: `${data.get('image')}`
      }
      console.log(product);
      const response = await apiUpsertProduct(product);
      if (response.status >= 200 && response.status < 300) navigate('/')
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
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
          {header()}
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
                  defaultValue={editProduct.name}
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
                  defaultValue={editProduct.quantity}
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
                  defaultValue={editProduct.price}
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
                  defaultValue={editProduct.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="image"
                  name="image"
                  label="Image"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  defaultValue={editProduct.image}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}