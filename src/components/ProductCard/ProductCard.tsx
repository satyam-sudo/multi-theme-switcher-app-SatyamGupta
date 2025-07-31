// src/components/ProductCard/ProductCard.tsx
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Product } from "../../types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { currentTheme } = useTheme();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className={styles.star}>
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className={styles.starHalf}>
          ☆
        </span>
      );
    }

    return stars;
  };

  return (
    <div className={`${styles.card} ${styles[currentTheme.className]}`}>
      <div className={styles.imageContainer}>
        {imageLoading && (
          <div className={styles.imagePlaceholder}>
            <div className={styles.imageSpinner}></div>
          </div>
        )}
        {!imageError ? (
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoading ? "none" : "block" }}
          />
        ) : (
          <div className={styles.imageError}>
            <span>📦</span>
            <p>Image not available</p>
          </div>
        )}
        <div className={styles.category}>{product.category}</div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{truncateText(product.title, 60)}</h3>

        <p className={styles.description}>
          {truncateText(product.description, 100)}
        </p>

        <div className={styles.rating}>
          <div className={styles.stars}>{renderStars(product.rating.rate)}</div>
          <span className={styles.ratingText}>
            {product.rating.rate} ({product.rating.count} reviews)
          </span>
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>{formatPrice(product.price)}</div>
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
