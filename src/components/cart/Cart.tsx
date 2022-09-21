import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import { productProps } from "../display-products/ProductCard";
import Navbar from "../navbar/Narbar";
import { Badge } from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const RemoveButton = styled.button`
  width: 10%;
  height: 10%;
  padding: 10px;
  margin-right: 10px;
  align-self: center;
  background-color: black;
  color: white;
  font-weight: 600;
  font-size: .7rem;
  cursor: pointer;
`;

const CounterButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  cursor: pointer;
`;

export const Cart = () => {
  //imports the cart from CartContext
  const { cart, setCart } = useContext(CartContext);

  const navigate = useNavigate();

  //removes item from cart array by index
  const removeItem = (props:productProps) => {
    const newCart = [...cart]
    const index = newCart.indexOf(props.product)
    newCart.splice(index, 1)
    setCart(newCart)
  }

  //increases the passed in product quantity by 1
  const increaseQuantity = (props:productProps) =>{
    const newCart = [...cart]
    const index = newCart.indexOf(props.product)
    newCart[index].quantity += 1; 
    setCart(newCart)
  }

  //decreases the passed in product quantity by 1, or removes it if quantity is 0
  const decreaseQuantity = (props:productProps) =>{
    const newCart = [...cart]
    const index = newCart.indexOf(props.product)
    if(newCart[index].quantity !== 1){
      newCart[index].quantity -= 1; 
      setCart(newCart)
    } else {
      removeItem({product:props.product, key:props.product.id})
    }
  }

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton onClick={() => {navigate('/')}}>CONTINUE SHOPPING</TopButton>
          <TopButton onClick={() => {navigate('/checkout')}}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {
              cart.map((product)=> (
                <>
                  <Product>
                    <ProductDetail>
                      <Image src={product.image} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.name}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.id}
                        </ProductId>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        {/* Adds custom made buttons that call the newly made functions */}
                        <ProductAmount>
                          <CounterButton onClick={()=>decreaseQuantity({product:product, key:product.id})}>
                            <Badge color="primary">
                              <RemoveCircle />
                            </Badge>
                          </CounterButton>
                          {product.quantity} 
                          <CounterButton onClick={()=>increaseQuantity({product:product, key:product.id})}>
                            <Badge color="primary">
                              <AddCircle />
                            </Badge>
                          </CounterButton>
                        </ProductAmount>

                      </ProductAmountContainer>
                      <ProductPrice>$ {product.price}</ProductPrice>
                    </PriceDetail>
                    <RemoveButton onClick={()=>removeItem({product:product, key:product.id})}>Remove Item</RemoveButton>

                  </Product>
                  <Hr/>
                </>
              ))
            }
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 
                  {cart.reduce<number>((total, product) => total + product.price * product.quantity, 0)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 
                {cart.reduce<number>((total, product) => total + product.price * product.quantity, 0)}
              </SummaryItemPrice>
            </SummaryItem>
            <Button onClick={() => {navigate('/checkout')}}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};
