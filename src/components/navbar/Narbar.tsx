import { ShoppingCartOutlined } from "@mui/icons-material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiLogout } from "../../remote/e-commerce-api/authService";

const Container = styled.div`
  height: 3%;
  background-color: #c6baba;
  border-bottom: 0.3rem ridge black;
  z-index: 4;
`;

const Wrapper = styled.div`\
  padding: 0px 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width:768px){
    flex-direction: column;
  }
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
  text-align: cente;
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
const NotificationTray = styled.div`
  height: 350px;
  width: 300px;
  background-color: gray;
  float: right;
  margin-top: 0.3rem;
  margin-right: 0.3rem;
  position: absolute;
  right: 0%;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  border-top: none;
`;

const Navbar = () => {
  const navigate = useNavigate();
  let [navOpen, setNav] = useState(false);

  const signOut = () => {
    const response = apiLogout();
    window.sessionStorage.clear();
    navigate("/login");
  };

  const showNotifications = () => {
    if (navOpen) {
      setNav(false);
    } else {
      setNav(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo onClick={() => {navigate("/")}}>
            Bizbazaar{" "}
          </Logo>
          <Welcome>
            {window.sessionStorage.getItem("userEmail") ? "Welcome, " + window.sessionStorage.getItem("userFirstName") + "!" : "Shopping as Guest User"}
          </Welcome>
        </Left>
        <Right>
          {window.sessionStorage.getItem("userEmail") ? (
            <>
              <MenuItem onClick={() => navigate("/wishlist")}>WISHLIST</MenuItem>
              <MenuItem onClick={() => navigate("/history")}>ORDER HISTORY</MenuItem>
              <MenuItem onClick={() => signOut()}>LOGOUT</MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => navigate("/register")}>REGISTER</MenuItem>
              <MenuItem onClick={() => navigate("/login")}>LOGIN</MenuItem>
            </>
          )}
          <MenuItem onClick={() => {navigate("/cart")}}>
            <ShoppingCartOutlined />
          </MenuItem>
          <MenuItem onClick={showNotifications}>
            <NotificationsNoneIcon />
          </MenuItem>
        </Right>
      </Wrapper>
      {navOpen && (
        <NotificationTray>
          <NotificationsNoneIcon />
          <br /> 0
        </NotificationTray>
      )}
    </Container>
  );
};

export default Navbar;
