import { ShoppingCartOutlined } from "@mui/icons-material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../context/user.context";

const Container = styled.div`
  height: 3%;
  background-color: #c6baba;
  border-bottom: .3rem ridge black;
  z-index:4;
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
  padding: 0 .8rem;

`;

const Welcome = styled.h2`
  margin-top: 2.5%;
  margin-left: 3%;
  font-size: .8rem;
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
  background-Color: gray;
  float: right;
  margin-top:.3rem;
  margin-right:.3rem;
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
  const { user, setUser } = useContext(UserContext); //added this
  let [ navOpen, setNav] = useState(false);

  const checkUser = () => {
    if(window.sessionStorage.getItem("userFirstName")){
      return "Welcome, " + window.sessionStorage.getItem("userFirstName") + "!"
    } else {
      return "Shopping as Guest User"
    }
  }

  const setSignInSignOut = () => {
    if(window.sessionStorage.getItem("userEmail")){
      return "SIGN OUT"
    } else {
      return "SIGN IN"
    }
  }

  const signOut = () =>{
    window.sessionStorage.clear()
    navigate('/login')
  }
  const showNotifications = () =>{
    if(navOpen == true) {
        setNav(false);
    } else {
      setNav(true);
    }
    
  }

  return (
    <Container>
      <Wrapper>
        <Left>
        <Logo onClick={() => {navigate('/')}}>
          Bizbazaar </Logo>
        <Welcome>{checkUser()}</Welcome>
        </Left>
        <Right>
          <MenuItem>WISHLIST</MenuItem>
          <MenuItem onClick={() => {navigate('/history')}}>ORDER HISTORY</MenuItem>
          <MenuItem onClick={() => {navigate('/register')}}>REGISTER</MenuItem>
          <MenuItem onClick={() => {signOut()}}>{setSignInSignOut()}</MenuItem>
          <MenuItem onClick={() => {navigate('/cart')}}>
              <ShoppingCartOutlined />
          </MenuItem>
          <MenuItem onClick={showNotifications}>
              <NotificationsNoneIcon/>
          </MenuItem>
          
        </Right>
      </Wrapper>
      {navOpen &&
      <NotificationTray><NotificationsNoneIcon /><br /> 0</NotificationTray>
      }
      
    </Container>
  );
};

export default Navbar;