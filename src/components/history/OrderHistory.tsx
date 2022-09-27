import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { ShoppingCartOutlined } from "@mui/icons-material";

import { apiGetUserOrders } from "../../remote/e-commerce-api/orderService";

import OrderRequest from "../../models/OrderRequest";
import OrderBox from "./OrderBox";

const Container = styled.div`
  height: 3%;
  background-color: #c6baba;
  border-bottom: 0.3rem ridge black;
`;

const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  padding: 0 0.8rem;
`;

const Welcome = styled.h2`
  margin-top: 2.5%;
  margin-left: 3%;
  font-size: 0.8rem;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const HistoryStyle = styled.div`
  font-size: 2em;
  border-bottom: 8px solid #57c4d0;
  display: inline-block;
`;

const HistoryDisplay = styled.div`
display: flex;
align-items: center;
justify content: center;

`;

const OrderHistory = () => {
  const [orderRequests, setOrders] = useState<OrderRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiGetUserOrders(
        Number(window.sessionStorage.getItem("userID"))
      );
      setOrders(result.payload);
    };
    fetchData();
  }, []);
  const navigate = useNavigate();

  const setSignInSignOut = () => {
    if (window.sessionStorage.getItem("userEmail")) {
      return "SIGN OUT";
    } else {
      return "SIGN IN";
    }
  };

  const signOut = () => {
    window.sessionStorage.clear();
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Container>
        <Wrapper>
          <Left>
            <Logo
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              Bizbazaar{" "}
            </Logo>
          </Left>
          <MenuItem> MY WISHLIST</MenuItem>

          <MenuItem
            onClick={() => {
              signOut();
            }}
          >
            {setSignInSignOut()}
          </MenuItem>
          {/*this should change to SIGN OUT while the user is signed in*/}
          <MenuItem
            onClick={() => {
              navigate("/cart");
            }}
          >
            <ShoppingCartOutlined />
          </MenuItem>
        </Wrapper>
      </Container>

      <HistoryStyle>
        <h2>Order History</h2>
      </HistoryStyle>

      <React.Fragment>
        <HistoryDisplay>
          <div className="HistoryDisplay">
            <h2>Orders</h2>

            {orderRequests.map((or) => (
              <OrderBox key={or.order.id} {...or} />
            ))}
          </div>
        </HistoryDisplay>
      </React.Fragment>
    </React.Fragment>
  );
};

export default OrderHistory;
