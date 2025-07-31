// src/components/Layout/Layout.tsx
import React, { ReactNode } from "react";
import { useTheme } from "../../context/ThemeContext";
import Header from "../Header/Header";
import styles from "./Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentTheme } = useTheme();

  return (
    <div className={`${styles.layout} ${styles[currentTheme.className]}`}>
      <Header />
      <main className={styles.main}>
        {currentTheme.id === "theme2" && (
          <aside className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              <h3 className={styles.sidebarTitle}>Navigation</h3>
              <nav className={styles.sidebarNav}>
                <a href="/" className={styles.sidebarLink}>
                  Dashboard
                </a>
                <a href="/about" className={styles.sidebarLink}>
                  About Us
                </a>
                <a href="/contact" className={styles.sidebarLink}>
                  Contact
                </a>
                <a href="#" className={styles.sidebarLink}>
                  Settings
                </a>
              </nav>

              <div className={styles.sidebarSection}>
                <h4 className={styles.sidebarSubtitle}>Quick Stats</h4>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Users</span>
                  <span className={styles.statValue}>1,234</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Products</span>
                  <span className={styles.statValue}>567</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Sales</span>
                  <span className={styles.statValue}>$12.3K</span>
                </div>
              </div>
            </div>
          </aside>
        )}
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
