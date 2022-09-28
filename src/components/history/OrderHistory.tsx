import React, { useEffect, useState } from "react";

import styled from "styled-components";

import { apiGetUserOrders } from "../../remote/e-commerce-api/orderService";

import OrderRequest from "../../models/OrderRequest";
import OrderBox from "./OrderBox";
import Navbar from "../navbar/Narbar";

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

  return (
    <React.Fragment>
      <Navbar />
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
