import { ShoppingCartOutlined } from "@mui/icons-material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../context/user.context";
import { apiLogout } from "../../remote/e-commerce-api/authService";


const Container = styled.div`
  // height: 3%;
    background-color: #c6baba;
    border-bottom: .3rem ridge black;
    width = 100vw;
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
  padding: 0 .8rem;

`;

const Welcome = styled.h2`
  margin-top: 2.5%;
  margin-left: 3%;
  font-size: .8rem;
  text-align: cente
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

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); //added this

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
      const response = apiLogout();
      window.sessionStorage.clear()
      navigate('/login')  
  }

  const returnWishList = () => {
    if(window.sessionStorage.getItem("userEmail")){
      return (<MenuItem onClick={() => navigate('/wishlist')}>WISHLIST</MenuItem>)
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
          {returnWishList()}
          <MenuItem onClick={() => {navigate('/register')}}>REGISTER</MenuItem>
          <MenuItem onClick={() => {signOut()}}>{setSignInSignOut()}</MenuItem>
          <MenuItem onClick={() => {navigate('/cart')}}>
              <ShoppingCartOutlined />
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;