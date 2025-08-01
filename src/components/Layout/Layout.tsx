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
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;
