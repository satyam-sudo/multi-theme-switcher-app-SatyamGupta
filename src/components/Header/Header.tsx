// src/components/Header/Header.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  const { currentTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`${styles.header} ${styles[currentTheme.className]}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/" className={styles.logoLink}>
            <span className={styles.logoText}>ThemeApp</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link
            to="/"
            className={`${styles.navLink} ${
              isActive("/") ? styles.active : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`${styles.navLink} ${
              isActive("/about") ? styles.active : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`${styles.navLink} ${
              isActive("/contact") ? styles.active : ""
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className={styles.themeToggleWrapper}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
