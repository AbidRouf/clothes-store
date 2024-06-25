import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

const Women = () => {
    // State to hold the women's products data
    const [products, setProducts] = useState([]);

    // useEffect to fetch women's products data from Firestore when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsQuery = query(
                    collection(db, "products"),
                    where("category", "==", "women")
                );
                const querySnapshot = await getDocs(productsQuery);
                const productsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching women's products: ", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="ProductsPage">
            <h1 className="ProductsPage__title">Women's Collection</h1>
            <div className="products">
                {products.map(product => (
                    <Link to={`/product/${product.id}`} key={product.id} className="link">
                        <div className="product-card">
                            <img src={product.imageUrl} alt={product.name} className="product-card__image" />
                            <div className="product-card__details">
                                <h2 className="product-card__name">{product.name}</h2>
                                <p className="product-card__description">{product.description}</p>
                                <p className="product-card__price">£{product.price}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Women;
