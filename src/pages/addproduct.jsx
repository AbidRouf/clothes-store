import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { app } from '../firebase';

// Initialize Firebase storage and Firestore database instances
const storage = getStorage(app);
const db = getFirestore(app);

const AddProduct = () => {
  // State variables to manage form inputs and UI states
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productCategory, setProductCategory] = useState(''); // State for category
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleProductSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true
    setMessage(''); // Clear any previous messages

    try {
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `products/${productImage.name}`); // Create a reference to the storage location
      await uploadBytes(storageRef, productImage); // Upload the image
      const imageUrl = await getDownloadURL(storageRef); // Get the URL of the uploaded image

      // Add product data to Firestore
      await addDoc(collection(db, "products"), {
        name: productName, // Product name
        price: parseFloat(productPrice), // Product price converted to a float
        imageUrl: imageUrl, // URL of the uploaded image
        category: productCategory, // Product category
        timeAdded: serverTimestamp() // Timestamp of when the product was added
      });

      setMessage('Product added successfully!'); // Set success message
    } catch (error) {
      console.error('Error adding product: ', error); // Log error to console
      setMessage('Failed to add product. Please try again.'); // Set failure message
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="ProductsPage">

      <div style={styles.container}>
        <h2 style={styles.heading}>Add Product</h2>
        <form onSubmit={handleProductSubmit} style={styles.form}>
          {/* Input for product name */}
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            style={styles.input}
          />
          {/* Input for product price */}
          <input
            type="number"
            name="productPrice"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            style={styles.input}
          />
          {/* Input for product image */}
          <input
            type="file"
            name="productImage"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
            style={styles.input}
          />
          {/* Dropdown for product category */}
          <select
            name="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
            style={styles.select}
          >
            <option value="">Select Category</option>
            <option value="women">Women</option>
            <option value="male">Male</option>
            <option value="kids">kids</option>
          </select>
          {/* Submit button */}
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
        {/* Display message */}
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

// Quick css styling add to own file later

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  select: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff'
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  message: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#28a745'
  }
};

export default AddProduct;
