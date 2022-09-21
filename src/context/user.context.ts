import React from "react";
import User from "../models/User";

//put in models when done

interface UserContextState {
    user : User,
    setUser: (user:User) => void;
}

// Define the Cart Context
// This will provided at the top level of the component hierarchy
// Then any child component will be able to access the cart info
// by using the useContext hook as follows:
// const { cart, setCart } = useContext(CartContext);
// And then the cart can be used and updated in a standard fashion
export const UserContext = React.createContext<UserContextState>({
    user: {
        id: 0,
        email: "",
        firstName: "",
        lastName: ""
    },
    setUser: () => {}
});