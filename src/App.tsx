import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { CartContext } from './context/cart.context';
import { UserContext } from './context/user.context';
import ProductItem from './models/Product';
import User from './models/User';
import { AppRoutes } from './router/AppRoutes';

function App() {
  const [cart, setCart] = useState<ProductItem[]>([]);
  const [user, setUser] = useState<User>({
    id: 0,
    email: "",
    firstName: "",
    lastName: ""
});
  const value = { cart, setCart };

  return (
    <UserContext.Provider value={{user, setUser}}>
      <CartContext.Provider value={value}>
        <Router>
          <AppRoutes></AppRoutes>
        </Router>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
