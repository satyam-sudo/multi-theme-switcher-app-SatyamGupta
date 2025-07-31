// src/pages/Home/Home.tsx
import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { apiService } from "../../services/api";
import { Product } from "../../types";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  const { currentTheme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getProducts(6); // Limit to 6 products
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div className={`${styles.container} ${styles[currentTheme.className]}`}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading amazing products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.container} ${styles[currentTheme.className]}`}>
        <div className={styles.error}>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button className={styles.retryButton} onClick={handleRefresh}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles[currentTheme.className]}`}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to TrendLoom</h1>
        <p className={styles.subtitle}>
          Experience the power of dynamic theming with our multi-theme
          application. Switch between themes and watch the entire interface
          transform!
        </p>
        <button className={styles.ctaButton}>Explore Themes</button>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Key Features</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎨</div>
            <h3>Dynamic Theming</h3>
            <p>
              Switch between multiple themes instantly with smooth transitions
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📱</div>
            <h3>Responsive Design</h3>
            <p>Perfect experience across all devices and screen sizes</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Fast Performance</h3>
            <p>Optimized for speed with modern React best practices</p>
          </div>
        </div>
      </section>

      <section className={styles.products}>
        <h2 className={styles.sectionTitle}>Featured Products</h2>
        <p className={styles.sectionDescription}>
          Discover our curated selection of products from our partner store
        </p>

        <div className={styles.productGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.stats}>
        <div className={styles.statGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>3</div>
            <div className={styles.statLabel}>Unique Themes</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Responsive</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>∞</div>
            <div className={styles.statLabel}>Possibilities</div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Home;
