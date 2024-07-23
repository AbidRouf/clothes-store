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
    <div className="ProductsPage flex justify-center items-center min-h-screen bg-antiquewhite-100">

      <div className="max-w-md w-full p-6 text-center border border-gray-300 rounded-lg bg-white shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Add Product</h2>
        <form onSubmit={handleProductSubmit} className="flex flex-col">
          {/* Input for product name */}
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="mb-4 p-2 text-lg border border-gray-300 rounded"
          />
          {/* Input for product price */}
          <input
            type="number"
            name="productPrice"
            placeholder="Product Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
            className="mb-4 p-2 text-lg border border-gray-300 rounded"
          />
          {/* Input for product image */}
          <input
            type="file"
            name="productImage"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
            className="mb-4 p-2 text-lg border border-gray-300 rounded"
          />
          {/* Dropdown for product category */}
          <select
            name="productCategory"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            required
            className="mb-4 p-2 text-lg border border-gray-300 rounded bg-white"
          >
            <option value="">Select Category</option>
            <option value="women">Women</option>
            <option value="male">Male</option>
            <option value="kids">Kids</option>
          </select>
          {/* Submit button */}
          <button type="submit" disabled={loading} className="py-2 px-4 text-lg text-white bg-blue-500 hover:bg-blue-600 rounded">
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
        {/* Display message */}
        {message && <p className="mt-4 text-lg text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default AddProduct;
