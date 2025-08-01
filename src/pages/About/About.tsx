// src/pages/About/About.tsx
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import styles from "./About.module.css";

const About: React.FC = () => {
  const { currentTheme } = useTheme();

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "UI/UX Designer",
      bio: "Passionate about creating beautiful and intuitive user experiences.",
      avatar: "👩‍🎨",
    },
    {
      name: "Mike Chen",
      role: "Frontend Developer",
      bio: "React enthusiast with expertise in modern web technologies.",
      avatar: "👨‍💻",
    },
    {
      name: "Emily Davis",
      role: "Product Manager",
      bio: "Drives product vision and ensures user needs are met.",
      avatar: "👩‍💼",
    },
  ];

  const features = [
    {
      icon: "🎨",
      title: "Dynamic Theming",
      description:
        "Switch between multiple themes with smooth transitions and persistent storage.",
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description:
        "Optimized for all screen sizes from mobile to desktop with modern layouts.",
    },
    {
      icon: "⚡",
      title: "Performance First",
      description:
        "Built with React best practices for fast loading and smooth interactions.",
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description:
        "Implemented with security best practices and robust error handling.",
    },
    {
      icon: "🌐",
      title: "API Integration",
      description:
        "Seamless integration with external APIs for dynamic content loading.",
    },
    {
      icon: "♿",
      title: "Accessible",
      description:
        "Built with accessibility in mind, ensuring inclusive user experiences.",
    },
  ];

  return (
    <div className={`${styles.container} ${styles[currentTheme.className]}`}>
      <section className={styles.hero}>
        <h1 className={styles.title}>About TrendLoom</h1>
        <p className={styles.subtitle}>
          A showcase of modern React development with dynamic theming
          capabilities
        </p>
      </section>

      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.missionText}>
            We believe that great user interfaces should be both beautiful and
            functional. TrendLoom demonstrates how modern web applications can
            provide users with personalized experiences through dynamic theming
            while maintaining excellent performance and accessibility standards.
          </p>
          <p className={styles.missionText}>
            Built with React, TypeScript, and modern CSS techniques, this
            application showcases best practices in frontend development
            including responsive design, state management, API integration, and
            user experience optimization.
          </p>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Key Features</h2>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>Meet Our Team</h2>
        <div className={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <div key={index} className={styles.teamCard}>
              <div className={styles.avatar}>{member.avatar}</div>
              <h3 className={styles.memberName}>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberBio}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.technologies}>
        <h2 className={styles.sectionTitle}>Technologies Used</h2>
        <div className={styles.techGrid}>
          <div className={styles.techItem}>
            <span className={styles.techIcon}>⚛️</span>
            <span className={styles.techName}>React 18</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techIcon}>📘</span>
            <span className={styles.techName}>TypeScript</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techIcon}>🎨</span>
            <span className={styles.techName}>CSS Modules</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techIcon}>🔄</span>
            <span className={styles.techName}>Context API</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techIcon}>🛣️</span>
            <span className={styles.techName}>React Router</span>
          </div>
          <div className={styles.techItem}>
            <span className={styles.techIcon}>🌐</span>
            <span className={styles.techName}>REST API</span>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            Ready to Experience Dynamic Theming?
          </h2>
          <p className={styles.ctaDescription}>
            Try switching between our three unique themes using the dropdown in
            the header
          </p>
          <div className={styles.ctaButtons}>
            <button className={styles.primaryButton}>Try Themes Now</button>
            <button className={styles.secondaryButton}>View Source Code</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
