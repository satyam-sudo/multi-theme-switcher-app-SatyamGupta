// src/components/ThemeToggle/ThemeToggle.tsx
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./ThemeToggle.module.css";

const ThemeToggle: React.FC = () => {
  const { currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleThemeChange = (theme: (typeof themes)[0]) => {
    setTheme(theme);
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.dropdown} ${styles[currentTheme.className]}`}
      ref={dropdownRef}
    >
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select theme"
      >
        <span className={styles.selectedTheme}>{currentTheme.name}</span>
        <svg
          className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="listbox">
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={`${styles.dropdownItem} ${
                currentTheme.id === theme.id ? styles.active : ""
              }`}
              onClick={() => handleThemeChange(theme)}
              role="option"
              aria-selected={currentTheme.id === theme.id}
            >
              <div className={styles.themePreview}>
                <div
                  className={`${styles.colorPreview} ${
                    styles[theme.className + "Preview"]
                  }`}
                />
                <span>{theme.name}</span>
              </div>
              {currentTheme.id === theme.id && (
                <svg
                  className={styles.checkIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
