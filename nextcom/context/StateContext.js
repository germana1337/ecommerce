import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
const Context = createContext();

//* # I make this state context component to hold the state of the cart. I use the useState hook to create the state variables. I then create the functions that will be used to update the state variables. I then return the state variables and the functions in an object. I then wrap the children in the context provider and pass the object as the value. I then export the context and the context provider. I then import the context provider into the _app.js file and wrap the children in it. I then import the context into the components that need to access the state variables and functions. I then destructure the state variables and functions from the context. I then use the state variables and functions in the components.
export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);

    //? # This onAdd function is for adding a product to the cart. It takes in the product and the quantity as arguments. It then checks if the product is already in the cart. If it is, it then maps through the cart items and updates the quantity of the product in the cart. If it is not, it then adds the product to the cart. It then updates the total price and total quantities in the cart. It then uses the toast library to display a success message.
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        const updatedCartItems = checkProductInCart
            ? cartItems.map((cartProduct) =>
                cartProduct._id === product._id
                    ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
                    : cartProduct
            )
            : [...cartItems, { ...product, quantity }];
        //* # this newtotalprice and newtotalqountities are variables that are used to update the total price and total quantities in the cart. They are set to the current total price and total quantities in the cart plus the price of the product times the quantity of the product. They are then used to update the total price and total quantities in the cart.
        const newTotalPrice = totalPrice + product.price * quantity.toFixed(2)
        const newTotalQuantities = totalQuantities + quantity;
        setCartItems(updatedCartItems);
        setTotalPrice(newTotalPrice);
        setTotalQuantities(newTotalQuantities);
        toast.success(`${quantity} ${product.name} added to cart`);
    };
    //* # With using this onRemove function, I can remove a product from the cart. It takes in the product as an argument. It then finds the product in the cartItems array that matches the id of the product that was passed in. It then creates a new array of cartItems and filters out the product that was passed in. It then sets the cartItems to the new array, the total price to the new total price, and the total quantities to the new total quantities.
    const onRemove = (product) => {
        const foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);
        const newTotalPrice = totalPrice - foundProduct.price * foundProduct.quantity;
        const newTotalQuantities = totalQuantities - foundProduct.quantity;
        setCartItems(newCartItems);
        setTotalPrice(newTotalPrice);
        setTotalQuantities(newTotalQuantities);
    };
    // # Here togglecartitemquanitity is a function that takes in an id and a value. It then finds the product in the cartItems array that matches the id. If it doesn't find a match, it returns. If it does find a match, it then finds the index of the product in the cartItems array. It then creates a new array of cartItems and sets the quantity of the product to the new quantity. It then sets the cartItems to the new array, the total price to the new total price, and the total quantities to the new total quantities.
    const toggleCartItemQuanitity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        if (!foundProduct) return;
        const index = cartItems.indexOf(foundProduct);
        const newCartItems = [...cartItems];
        const newTotalPrice = totalPrice + (value === 'inc' ? foundProduct.price : -foundProduct.price) * foundProduct.quantity;
        const newTotalQuantities = totalQuantities + (value === 'inc' ? 1 : -1);
        const newQuantity = foundProduct.quantity + (value === 'inc' ? 1 : -1);
        if (newQuantity > 0) {
            newCartItems.splice(index, 1, { ...foundProduct, quantity: newQuantity });
            setCartItems(newCartItems);
            setTotalPrice(newTotalPrice);
            setTotalQuantities(newTotalQuantities);
        }
    };
    

    const incQty = () => setQty((prevQty) => prevQty + 1);

    const decQty = () =>
        setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));

    const [qty, setQty] = useState(1);

    // # This value is what is passed to the provider. It is an object that contains all the state variables and functions that are used in the app.
    const value = {
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,

    };

    
    //! # This is the provider that wraps the children and passes the value to the children and i use it in the _app.js file.
    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useStateContext = () => useContext(Context);
