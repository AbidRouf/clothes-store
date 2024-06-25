import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css"


const footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <Link to="/">

          </Link>
          <div className="footer__list">
            <Link to="/" className="footer__link">
              Home
            </Link>
            <span className="footer__link no-cursor">About</span>
            <Link to="/books" className="footer__link">
              Books
            </Link>
            <Link to="/cart" className="footer__link">
              Cart
            </Link>
          </div>
          <div className="footer__copyright">Copyright &copy; 2024 Abid</div>
        </div>
      </div>
    </footer>
  );
};

export default footer;
