// ProductPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/product.css';





///////////////////////////////// INCOMPLETE ///////////////////////////////////////









const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching product: ', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        // Placeholder function for adding to cart
        // You can integrate with your cart logic here
        alert(`Added ${quantity} x ${product.name} (Size: ${size}) to the cart!`);
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-page">
            <img src={product.imageUrl} alt={product.name} className="product-page__image" />
            <div className="product-page__details">
                <h1 className="product-page__name">{product.name}</h1>
                <p className="product-page__description">{product.description}</p>
                <p className="product-page__price">£{product.price}</p>
                <p className="product-page__additional-details">
                    Category: {product.category || 'Uncategorized'}<br />
                    Stock: {product.stock || 'In Stock'}
                </p>
                <div className="product-page__actions">
                    <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="product-page__select"
                    >
                        <option value="">Choose size</option>
                        <option value="S">Small</option>
                        <option value="M">Medium</option>
                        <option value="L">Large</option>
                        <option value="XL">Extra Large</option>
                    </select>
                    <div className="product-page__quantity">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                            min="1"
                        />
                    </div>
                    <button onClick={handleAddToCart} className="product-page__add-to-cart">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
