import {
    SearchOutlined,
    ShoppingCartOutlined,
    StarOutlined
  } from "@mui/icons-material";

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import { TextField } from "@mui/material";
import { apiAddWishlistProduct, apiDeleteWishlistProduct, apiGetAllWishlistProducts } from "../../remote/e-commerce-api/wishlistService";
  
  const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  `;
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  
  const Image = styled.img`
    height: 75%;
    z-index: 2;
  `;
  
  const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: #e9f5f5;
      transform: scale(1.1);
    }
  `;

  type BackgroundColorProps = {
    starClicked: boolean;
    starDisplay: boolean;
  }
  
  const IconStar = styled.div<BackgroundColorProps>`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({starClicked}) => starClicked ? 'lightgreen' : 'white'};
    display: ${({starDisplay}) => starDisplay ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
      background-color: ${({starClicked}) => starClicked ? '#e9f5f5' : ''};
      transform: scale(1.1);
    }
  `;

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const BoxIcons = styled.div`
    display: flex;
    flex-flow: row;
    justify-content: left;
  `;
  
  export interface productProps {
      product: Product,
      key: number,
  }

  export const ProductCard = (props: productProps) => {

    const { cart, setCart } = useContext(CartContext);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [starClicked, setStarClicked] = React.useState(false);
    const [starDisplay, setStarDisplay] = React.useState(true);
    const [wishlist, setWishlist] = React.useState<Product[]>([]);
    const [triggerEffect, setTriggerEffect] = React.useState(false);

    const addItemToCart = (product: Product) => {

      const newCart = [...cart]
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.id === product.id
      })

      if (index === -1) newCart.push(product)
      else newCart[index].quantity += product.quantity

      setCart(newCart)
      window.sessionStorage.setItem("cart", JSON.stringify(newCart))
    }

    function isUserCustomer() {
      const id:string|null = window.sessionStorage.getItem("userID")
      if(id === null){
        setStarDisplay(false);
      }
    }

    // Simulates star icon click or leave it blank
    function isWishlistProduct() {

      for(let i = 0; i < wishlist.length; i++){

        if(wishlist[i].id == props.product.id){
          setStarClicked(true);
        }
      }
    }

    // useEffect: When triggerred, checks and sets the wishlist star icon
    React.useEffect(()=>{
      isUserCustomer();
      isWishlistProduct();
      gatherAllWishlistProducts();
    },[triggerEffect])

    // API Call: Get All Products from Wishlist Database
    const gatherAllWishlistProducts = async () => {
      const id:string|null = window.sessionStorage.getItem("userID")
      const tempWishList:Product[] = []

      if(id !== null){
        const response = await apiGetAllWishlistProducts(Number.parseInt(id));
        for(let i=0; i<response.payload.length; i++){
          tempWishList.push({
            id: response.payload[i].id,
            name: response.payload[i].name,
            quantity: response.payload[i].quantity,
            price: response.payload[i].price,
            description: response.payload[i].description,
            image: response.payload[i].image
          })
        }
        setWishlist(wishlist => tempWishList)
        setTriggerEffect(true);
      } else {
        console.log("no id")
      }
    };

    // API Call: Add Product to Wishlist Database
    const handleOnAddWishlist = async (product: Product) => {
      const id:string|null = window.sessionStorage.getItem("userID")
      
      if(id !== null){
        apiAddWishlistProduct(Number.parseInt(id), product.id)
        setWishlist( old => [...old, product] );
      }
    };
    

    // API Call: Remove Product from Wishlist Database
    const handleOnRemoveWishlist = async (product: Product) => {
      const id:string|null = window.sessionStorage.getItem("userID")
      const tempWishList:Product[] = [...wishlist]
      const tempWishListIndex = tempWishList.indexOf(product)
      
      if(id !== null){
        apiDeleteWishlistProduct(Number.parseInt(id), product.id)
        tempWishList.splice(tempWishListIndex,1)
        setWishlist(wishlist => tempWishList)
      }
    };

    // handle OnClick Wishlist: Add/Remove WishList API Call
    function handleWishlistClick(){
      //Case: Product is IN wishlist, call Remove wishlist API
      if(starClicked){
        handleOnRemoveWishlist(props.product);
      } 
      //Case: Product is NOT in wishlist, call Add wishlist API
      else{
        handleOnAddWishlist(props.product);
      }
      setStarClicked(!starClicked)
    }

    function updateQuantity(event: any) {
      props.product.quantity = +event.target.value > 0 ? +event.target.value : 1
    }

    return (
      <Container>
        <Circle />
        <Image src={props.product.image} onClick={handleOpen} />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.product.name}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.product.description}<br />
              ${props.product.price}
            </Typography>
            <br />
            <form>
              <TextField id="outlined-number" label="Number" type="number" onChange={(event) => {updateQuantity(event)}} defaultValue="1" InputLabelProps={{shrink: true}} InputProps={{inputProps: {min: 1}}} />
              <BoxIcons>
                <Icon>
                  <ShoppingCartOutlined onClick={() => {addItemToCart({...props.product})}} />
                </Icon>
                <IconStar starClicked={starClicked} starDisplay={starDisplay} onClick={() => {handleWishlistClick()}}>
                  <StarOutlined />
                </IconStar>
              </BoxIcons>              
            </form>
          </Box>
        </Modal>
      </Container>
    );
  };