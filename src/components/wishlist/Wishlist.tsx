import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductModel from "../../models/Product";
import { apiGetAllWishlistProducts,apiDeleteWishlistProduct } from "../../remote/e-commerce-api/wishlistService";
import Navbar from "../navbar/Narbar";

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
  flex-wrap: wrap;
`;

const ProductDetail = styled.div`
  flex: 4;
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
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 12px;
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

const ButtonContainer = styled.div`
    display: flex;
    flex: 1;
    min-width: 350px;
    padding: 10px;
    flex-direction: row;
    align-items: center;
`;

const RemoveButton = styled.button`
  padding: 10px;
  margin-right: 15px;
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

export const Wishlist = () => {
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState<ProductModel[]>([]);

    const handleOnDelete = async (product: ProductModel) => {
      const id:string|null = window.sessionStorage.getItem("userID")
      const tempWishList:ProductModel[] = [...wishlist]
      const tempWishListIndex = tempWishList.indexOf(product)
      
      if(id !== null){
        apiDeleteWishlistProduct(Number.parseInt(id), product.id)
        tempWishList.splice(tempWishListIndex,1)
        setWishlist(wishlist => tempWishList)
      }      

    };
    
    const handleSubmit = async () => {
        const id:string|null = window.sessionStorage.getItem("userID")
        const tempWishList:ProductModel[] = []
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
        } else {
            console.log("no id")
        }
        
      };
      

    useEffect(()=>{
        handleSubmit();
    },[])

    return (<Container>
    <Navbar />
    <Wrapper>
      <Title>Wishlist</Title>
      <Top>
        <TopButton onClick={() => {navigate('/')}}>CONTINUE SHOPPING</TopButton>
      </Top>
      <Bottom>
        <Info>
        {
              wishlist.map((product)=> ( 
                <div key={product.id}>
                  <Product>
                    <ProductDetail key="product detail">
                      <Image src={product.image} />
                      <Details>
                        <ProductName>
                            <b>Product:</b> {product.name}
                        </ProductName>
                        <ProductPrice>$ {product.price}</ProductPrice>
                        <ProductAmount>Quantity: {product.quantity}</ProductAmount>
                      </Details>
                    </ProductDetail>
                    <ButtonContainer>
                        <RemoveButton>Add to Cart</RemoveButton>
                        <RemoveButton onClick={() => {handleOnDelete(product)}
                          }
                          >Remove Item
                        </RemoveButton>
                    </ButtonContainer>
                    

                  </Product>
                  <Hr/>
                </div>
              ))
            }
        </Info>
      </Bottom>
      
    </Wrapper>
  </Container>);
}