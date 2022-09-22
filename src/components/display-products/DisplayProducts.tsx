import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const DisplayProducts = () => {

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetAllProducts()
      setProducts(result.payload)
    }
    fetchData()
  }, [])
  
  return (
    <React.Fragment>
        <Navbar/>
        <Container>
        {products.map((item) => (
            <ProductCard product={item} key={item.id} />
        ))}
        </Container>
    </React.Fragment>
    
  );
};