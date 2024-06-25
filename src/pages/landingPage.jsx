import React, { useRef, useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/products.css';
import { Link } from 'react-router-dom';


const LandingPage = () => {
    // Refs for the containers of new-in and trending products
    const newInContainerRef = useRef(null);
    const trendingContainerRef = useRef(null);

    // State to manage the visibility of the left scroll arrows
    const [showLeftArrowNewIn, setShowLeftArrowNewIn] = useState(false);
    const [showLeftArrowTrending, setShowLeftArrowTrending] = useState(false);

    // State to hold the products data
    const [newInProducts, setNewInProducts] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);

    // useEffect to fetch products data from Firestore when the component mounts
    useEffect(() => {
        // Initially hide the left arrow
        setShowLeftArrowNewIn(false);
        setShowLeftArrowTrending(false);

        // Function to fetch products from Firestore
        const fetchProducts = async () => {
            try {
                const productsQuery = query(collection(db, "products"), orderBy("timeAdded", "desc"));
                const querySnapshot = await getDocs(productsQuery);
                const products = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setNewInProducts(products);
                // For simplicity,  trending products are the same as new-in products
                setTrendingProducts(products);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    // useEffect to handle the visibility of the left arrows based on scroll position
    useEffect(() => {
        // Function to handle scroll events and update arrow visibility
        const handleScroll = (ref, setShowLeftArrow) => {
            if (ref.current) {
                const handleScrollEvent = () => {
                    // Show the left arrow if scrolled right, hide if at the beginning
                    if (ref.current.scrollLeft > 0) {
                        setShowLeftArrow(true);
                    } else {
                        setShowLeftArrow(false);
                    }
                };
                // Add scroll event listener to the container
                ref.current.addEventListener('scroll', handleScrollEvent);
                handleScrollEvent(); // Call it initially to set the correct state
                return () => ref.current.removeEventListener('scroll', handleScrollEvent); // Cleanup
            }
        };

        handleScroll(newInContainerRef, setShowLeftArrowNewIn);
        handleScroll(trendingContainerRef, setShowLeftArrowTrending);
    }, [newInContainerRef, trendingContainerRef]);

    // Function to handle horizontal scrolling of the containers
    const scroll = (ref, direction) => {
        if (direction === 'left') {
            ref.current.scrollBy({ left: -200, behavior: 'smooth' });
        } else {
            ref.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    return (
        <div className="landingPage">
            <div className="welcome">
                Welcome to Khafor
            </div>

            <div className="new-in">
                <h1 className="new-in__title">New in</h1>
                <button
                    className="scroll-arrow left"
                    style={{ display: showLeftArrowNewIn ? 'block' : 'none' }}
                    onClick={() => scroll(newInContainerRef, 'left')}
                    aria-label="Scroll left"
                >
                    &lt;
                </button>
                <div className="new-in__container" ref={newInContainerRef}>
                    <div className="new-in__products">
                        {newInProducts.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} className="link">

                                <div key={product.id} className="product-card">
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
                <button
                    className="scroll-arrow right"
                    onClick={() => scroll(newInContainerRef, 'right')}
                    aria-label="Scroll right"
                >
                    &gt;
                </button>

                <Link to="/newIn" className='subNav__title' ><button className="shop-now">Shop now</button></Link>

            </div>

            <div className="trending new-in">
                <h1 className="new-in__title">What's Trending</h1>
                <button
                    className="scroll-arrow left"
                    style={{ display: showLeftArrowTrending ? 'block' : 'none' }}
                    onClick={() => scroll(trendingContainerRef, 'left')}
                    aria-label="Scroll left"
                >
                    &lt;
                </button>
                <div className="new-in__container" ref={trendingContainerRef}>
                    <div className="new-in__products">
                        {trendingProducts.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} className="link">
                                <div key={product.id} className="product-card">
                                    <img src={product.imageUrl} alt={product.name} className="product-card__image" />
                                    <div className="product-card__details">
                                        <h2 className="product-card__name">{product.name}</h2>
                                        <p className="product-card__description">{product.description}</p>
                                        <p className="product-card__price">{"£" + product.price}</p>
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>
                <button
                    className="scroll-arrow right"
                    onClick={() => scroll(trendingContainerRef, 'right')}
                    aria-label="Scroll right"
                >
                    &gt;
                </button>
                <Link to="/trending" className='subNav__title' ><button className="shop-now">Shop now</button></Link>
            </div>
        </div>
    );
};

export default LandingPage;
