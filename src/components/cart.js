import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromCart } from '../slices/cartSlice';
import '../styles/cart.css'; // Make sure you have this stylesheet

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const totalPrice = useSelector(state => state.cart.totalPrice) || 0; // Provide default value if undefined
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    console.log('Cart Items:', cartItems); // Debugging line

    return (
        <div className="cart">
            <h1 className="cart__title">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    {cartItems.map(item => (
                        <div key={item.id} className="cart__item">
                            {/* Check and adjust the image URL */}
                            <img src={item.imageUrl} alt={item.name} className="cart__item-image" />
                            <div className="cart__item-details">
                                <h2>{item.name}</h2>
                                <p>Size: {item.size}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: £{item.price.toFixed(2)}</p>
                                <button onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}

                    <h2>Total Quantity: {totalQuantity}</h2>
                    <h2>Total Price: £{totalPrice.toFixed(2)}</h2>
                </div>
            )}
            {/* Uncomment the following line to enable continue shopping link */}
            {/* <Link to="/">Continue Shopping</Link> */}
        </div>
    );
};

export default Cart;
