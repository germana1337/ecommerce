import product from '@/sanity-ecom/schemas/product';
import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
const Context = createContext();

export const StateContext = ({ children }) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);
        setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
        setTotalQuantities((prevQuantities) => prevQuantities + quantity);
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return {
                        ...cartProduct,
                        quantity: cartProduct.quantity + quantity,
                    };
                }
                return cartProduct;
            });
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${quantity} ${product.name} added to cart`);
    }
    // # this togglecartitemquantity function is  for the cart page to increase and decrease the quantity of the product in the cart.
    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);
        index = cartItems.findIndex((item) => item._id === id);

        // # This if statement logic is for the increase button in the cart page and it will increase the quantity of the product in the cart.
        if (value === 'inc') {
            let newCartItems = [...cartItems,
            { ...foundProduct, quantity: foundProduct.quantity + 1 }];
            setCartItems(newCartItems);
            // # This setTotalPrice and setTotalQuantities are for the total price and total quantity of the product in the cart. 
            setTotalPrice((prevPrice) => prevPrice + foundProduct.price);
            setTotalQuantities((prevQuantities) => prevQuantities + 1);

            // # Ths else if statement logic is for the decrease button in the cart page and it will not decrease the quantity if the quantity is 1.
        } else if (value === 'dec') {
            // # This if statement inside of else if statement is for to check the quantity of the product in the cart is 1 or not. and if the quantity is 1 then it will not decrease the quantity. 
            if (foundProduct.quantity > 1) {
                let newCartItems = [...cartItems,
                { ...foundProduct, quantity: foundProduct.quantity - 1 }];
                setCartItems(newCartItems);

                setTotalPrice((prevPrice) => prevPrice - foundProduct.price);
                setTotalQuantities((prevQuantities) => prevQuantities - 1);
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuanitity
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);