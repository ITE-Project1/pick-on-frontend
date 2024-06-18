import React from "react";

function ProductItem({product}) {
  return (
    <div className="product-item-container">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Created At: {new Date(product.createdAt).toLocaleString()}</p>
      <p>Quantity: {product.quantity}</p>
    </div>
  );
}

export default ProductItem;