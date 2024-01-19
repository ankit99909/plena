import React, { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define initial state and reducer
const initialState = {
    cartItems: [],
    totalItems: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_CART_ITEMS":
            return {
                ...state,
                cartItems: action.payload,
                totalItems: action.payload.reduce((total, item) => total + item.quantity, 0),
            };
        case "ADD_TO_CART":
            return {
                ...state,
                totalItems: action.payload.reduce((total, item) => total + item.quantity, 0),
            };
        case "CLEAR_CART":
            return {
                ...state,
                cartItems: [],
                totalItems: 0,
            };
        default:
            return state;
    }
};

// Create the context
const CartContext = createContext();

// Create the provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart items from AsyncStorage on mount
    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const cartItemsJson = await AsyncStorage.getItem("cartItems");
                const loadedCartItems = cartItemsJson ? JSON.parse(cartItemsJson) : [];
                dispatch({ type: "LOAD_CART_ITEMS", payload: loadedCartItems });
            } catch (error) {
                console.error("Error loading cart items:", error);
            }
        };

        loadCartItems();
    }, []);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

// Create a custom hook to use the context
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
