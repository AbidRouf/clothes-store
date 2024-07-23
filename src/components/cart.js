import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../slices/cartSlice';
import '../styles/cart.css'; // Make sure you have this stylesheet

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice) || 0;
    const dispatch = useDispatch();

    const handleRemove = (id, size) => {
        dispatch(removeFromCart({ id, size }));
    };

    return (
        <div className="cart">
            <h1 className="cart__title">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={`${item.id}-${item.size}`} className="cart__item">
                            <img src={item.imageUrl} alt={item.name} className="cart__item-image" />
                            <div className="cart__item-details">
                                <h2>{item.name}</h2>
                                <p>Size: {item.size}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: £{item.price.toFixed(2)}</p>
                                <button onClick={() => handleRemove(item.id, item.size)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    <h2>Total Quantity: {totalQuantity}</h2>
                    <h2>Total Price: £{totalPrice.toFixed(2)}</h2>
                </div>
            )}
        </div>
    );
};

export default Cart;
