import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch products from JSON file
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        if (Array.isArray(data)) {
          // Assuming the API response is an array of products
          setProducts(data.slice(0, 8)); // Load first 8 products
          setLoading(false);
        } else {
          console.error('Invalid API response:', data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleScroll = () => {
    // Function to load next 3 products when scrolling
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      const currentLength = products.length;
      const nextProducts = products.concat(products.slice(currentLength, currentLength + 3));
      setProducts(nextProducts);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [products]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Qty: {product.qty}</p>
              <div>
                {product.images.map((image, index) => (
                  <img key={index} src={image} alt={`Product ${product.id} - Image ${index + 1}`} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
