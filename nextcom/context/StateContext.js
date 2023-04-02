
import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
const Context = createContext();


export const StateContext = ({ children }) => {

    //! # This show cart state is used to show and hide the cart
    const [showCart, setShowCart] = useState(false);

    //! # ეს cartItems მდგომარეობა გამოიყენება კალათაში ნივთების შესანახად
    const [cartItems, setCartItems] = useState();

    //? # ეს TotalPrice მდგომარეობა გამოიყენება კალათაში საქონლის მთლიანი ფასის შესანახად
    const [totalPrice, setTotalPrice] = useState();

    //? # ეს totalQuantities მდგომარეობა გამოიყენება კალათაში ნივთების მთლიანი რაოდენობის შესანახად
    const [totalQuantities, setTotalQuantities] = useState();

    //? # ეს რაოდენობრივი მდგომარეობა გამოიყენება კალათაში ნივთების რაოდენობის შესანახად
    const [qty, setQty] = useState(1);

    //! # This function is used to show the cart
    const incQty = () => {
        setQty((prevQty) => prevQty + 1); //? # ეს გამოიყენება კალათაში არსებული ნივთების რაოდენობის გასაზრდელად
    }

     // # This function with this check logic is used to decrease the quantity of the items in the cart and if the quantity is less than 1 then it will not decrease the quantity
    const decQty = () => {
        setQty((prevQty) => {
          if(prevQty - 1 < 1 ) return 1;
            return prevQty - 1; 
        }); 
    } 

    return (
        //! # Context Provider is used to provide the state to the children components and also to update the state
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
            }}
        >
            {children}
        </Context.Provider>

    )
}

export const useStateContext = () => useContext(Context); //? # This is used to use the state in the children components and also to update the state in the children components

