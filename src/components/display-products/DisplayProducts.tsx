import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";
import AddCardIcon from '@mui/icons-material/AddCard';
import { useNavigate } from 'react-router-dom';



const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Button = styled.button`
    width: 10em;
    height: 10em;
    padding: 10px;
`;

export const DisplayProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetAllProducts()
      setProducts(result.payload)
    }
    fetchData()
  }, [])

  function addProduct() {
    console.log('add product');
    navigate('/UpsertProduct',{state:{}});
  }

  function displayAddProductCard() {    
    if (window.sessionStorage.getItem('userType') === '1') {
        return (
          <Container onClick={() => addProduct()}>
          <Button >
            <AddCardIcon />
            <p>Add Item</p>
         </Button>
        </Container>
        )
    }
  }
  
  return (
    <React.Fragment>
        <Navbar/>
        <Container>
        {products.map((item) => (
            <ProductCard product={item} key={item.id} />
        ))}
        </Container>
        {displayAddProductCard()}
    </React.Fragment>
    
  );
};