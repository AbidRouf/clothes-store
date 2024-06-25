import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the import path as needed
import { Link } from 'react-router-dom'; // Import Link
import '../styles/products.css'; // Use the same CSS as in NewIn component





/////////////////////////////////////////////////////////////////////////////////////////// LEARN














const ResultPage = () => {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search).get('query');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollection = collection(db, 'products');
                const productSnapshot = await getDocs(productCollection);
                
                // Filter results manually
                const matchedProducts = productSnapshot.docs.filter(doc => {
                    const product = doc.data();
                    return product.name.toLowerCase().includes(queryParam.toLowerCase());
                }).map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort the products by name in ascending order for consistency
                matchedProducts.sort((a, b) => a.name.localeCompare(b.name));

                setProducts(matchedProducts);
            } catch (error) {
                console.error('Error fetching search results: ', error);
            }
        };

        fetchProducts();
    }, [queryParam]);

    return (
        <div className="ProductsPage">
            <h1 className="ProductsPage__title">Search Results for "{queryParam}"</h1>
            <div className="products">
                {products.length > 0 ? (
                    products.map(product => (
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
                    ))
                ) : (
                    <p>No products found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default ResultPage;
