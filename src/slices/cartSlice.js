// src/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

// Load cart state from localStorage if available
const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return initialState;
    }
};

// Save cart state to localStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (err) {
        // Ignore write errors
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: loadState(),
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id && item.size === action.payload.size);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
            state.totalQuantity += action.payload.quantity;
            state.totalPrice += action.payload.price * action.payload.quantity;
            saveState(state); // Save updated state to localStorage
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload);
            if (index >= 0) {
                state.totalQuantity -= state.items[index].quantity;
                state.totalPrice -= state.items[index].price * state.items[index].quantity;
                state.items.splice(index, 1);
                saveState(state); // Save updated state to localStorage
            }
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
