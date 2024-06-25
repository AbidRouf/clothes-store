import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import "../styles/nav.css";
import searchIcon from "../images/searchIcon.png";
import profile from "../images/user.png";
import basket from "../images/cart.png";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Nav = () => {
    // State to manage the current search query input by the user
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    // State to store the filtered products that match the search query
    const [filteredProducts, setFilteredProducts] = useState([]);
    // State to control whether the dropdown with search results is visible
    const [showDropdown, setShowDropdown] = useState(false);
    // Reference for the dropdown menu, used to detect clicks outside the dropdown
    const dropdownRef = useRef(null);
    // Reference for the search input, used to detect clicks outside the search bar
    const searchRef = useRef(null);
    // Hook for navigation, used to programmatically navigate to different routes
    const navigate = useNavigate();
    // Hook to detect changes in the URL, used to reset the search query on navigation
    const location = useLocation();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productData = querySnapshot.docs.map(doc => ({
                    id: doc.id, // get id of product
                    ...doc.data() // Spread operator to merge document data with the id
                }));
                setProducts(productData); // Update state with fetched products
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };
        fetchProducts();
    }, []); // Empty dependency array means this useEffect runs only once when the component mounts





    // resets (and hides dropdown) search when url changes
    useEffect(() => {
        setSearchQuery('');
        setShowDropdown(false);
    }, [location]); // The useEffect runs whenever the location (URL) changes





    // removes dropdown if anywhere on page pressed
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside the dropdown and the search input
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !searchRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        // event listener to detect clicks outside the dropdown
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [dropdownRef, searchRef]); // Depend on the dropdown and search references to handle cleanup





    // Updates the search query and filters products based on user input
    const handleInputChange = (e) => {
        const userinput = e.target.value;
        setSearchQuery(userinput);

        // removes whitespace
        if (userinput.trim()) {
            // show filtered options. include ensures "a" would show apple
            let matches = products.filter(product =>
                product.name.toLowerCase().includes(userinput.trim().toLowerCase())
            );

            // Sort matches to prioritize exact matches first, then partial matches, and sort them alphabetically
            matches = matches.sort((a, b) => {
                const userinputLower = userinput.trim().toLowerCase();
                if (a.name.toLowerCase() === userinputLower) return -1;
                if (b.name.toLowerCase() === userinputLower) return 1;
                return a.name.localeCompare(b.name);
            });
            setFilteredProducts(matches);
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };





    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (filteredProducts.length === 1) {
            // If there is only one filtered product, navigate directly to its page
            navigate(`/product/${filteredProducts[0].id}`);
        } else {
            // Navigate to a search results page with the search query
            navigate(`/search?query=${searchQuery.trim()}`);
        }
        setSearchQuery('');
        setShowDropdown(false);
    };


    

    // Navigate to the product page
    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
        setSearchQuery('');
        setShowDropdown(false);
    };

    return (
        <div className="nav">
            <div className="navTop">
                <div className="logo">
                    <Link to="/" className='subNav__title'>Khafor</Link>
                </div>
                <div className="logo">
                    <Link to="/addproduct" className='subNav__title'>Add Product</Link>
                </div>

                {/* SEARCH BAR */}
                <div className="search" ref={searchRef}>
                    <form onSubmit={handleSearchSubmit} className="search__body">
                        <input
                            className="search__body--input"
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleInputChange}
                        />

                        {/* search button */}
                        <button type="submit" className="search__logo-button">
                            <img className="search__logo nav__img" src={searchIcon} alt='Search' />
                        </button>
                    </form>

                    {/* Conditional rendering of the dropdown */}
                    {showDropdown && (
                        <div className="dropdown" ref={dropdownRef}>
                            {/* Check if there are any filtered products */}
                            {filteredProducts.length > 0 ? (
                                // Map through the filtered products to display each one in the dropdown if x > 0 is true
                                filteredProducts.map(product => (
                                    <div
                                        key={product.id} // Unique key for each product
                                        className="dropdown-item"
                                        onClick={() => handleProductClick(product.id)} // Navigate to the product page on click
                                    >
                                        {product.name}
                                    </div>
                                ))
                            ) : (
                                <div className="dropdown-item">No results found</div>
                            )}
                        </div>
                    )}
                </div>

                {/* ICONS */}
                <div className="nav__tools">
                    <div className="basket">
                        <button className='button'>
                            <img className="search__logo nav__img" src={basket} alt='Basket' />
                        </button>
                    </div>
                    <div className="account">
                        <button className='button'>
                            <img className="search__logo nav__img" src={profile} alt='Profile' />
                        </button>
                    </div>
                </div>
            </div>
            <hr className="nav-line" />
            <div className="subNav">
                <div className="subNav__titles">
                    <Link to="/newIn" className='subNav__title'>NEW IN</Link>
                    <Link to="/women" className='subNav__title'>WOMEN</Link>
                    <Link to="/men" className='subNav__title'>MEN</Link>
                    <Link to="/summer" className='subNav__title'>SUMMER</Link>
                    <Link to="/kids" className='subNav__title'>KIDS</Link>
                </div>
            </div>
            <hr className="nav-line" />
        </div>
    );
};

export default Nav;
