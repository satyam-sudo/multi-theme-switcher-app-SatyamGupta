// src/pages/Contact/Contact.tsx
import React, { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { ContactFormData } from "../../types";
import styles from "./Contact.module.css";

const Contact: React.FC = () => {
  const { currentTheme } = useTheme();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "hello@themeapp.com",
      link: "mailto:hello@themeapp.com",
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: "📍",
      title: "Address",
      value: "123 Theme Street, Design City, DC 12345",
      link: "https://maps.google.com",
    },
    {
      icon: "🌐",
      title: "Website",
      value: "www.themeapp.com",
      link: "https://themeapp.com",
    },
  ];

  const socialLinks = [
    { icon: "🐦", name: "Twitter", url: "https://twitter.com" },
    { icon: "💼", name: "LinkedIn", url: "https://linkedin.com" },
    { icon: "📘", name: "Facebook", url: "https://facebook.com" },
    { icon: "📸", name: "Instagram", url: "https://instagram.com" },
  ];

  return (
    <div className={`${styles.container} ${styles[currentTheme.className]}`}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Get In Touch</h1>
        <p className={styles.subtitle}>
          We'd love to hear from you. Send us a message and we'll respond as
          soon as possible.
        </p>
      </section>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Send us a message</h2>

            {isSubmitted && (
              <div className={styles.successMessage}>
                <span className={styles.successIcon}>✅</span>
                <p>Thank you for your message! We'll get back to you soon.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.name ? styles.inputError : ""
                  }`}
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <span className={styles.errorText}>{errors.name}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.input} ${
                    errors.email ? styles.inputError : ""
                  }`}
                  placeholder="Enter your email address"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`${styles.textarea} ${
                    errors.message ? styles.inputError : ""
                  }`}
                  placeholder="Tell us how we can help you"
                  rows={6}
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <span className={styles.errorText}>{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className={styles.spinner}></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoContainer}>
            <h2 className={styles.infoTitle}>Contact Information</h2>
            <p className={styles.infoDescription}>
              Reach out to us through any of these channels
            </p>

            <div className={styles.contactList}>
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className={styles.contactItem}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.contactIcon}>{item.icon}</span>
                  <div className={styles.contactDetails}>
                    <span className={styles.contactTitle}>{item.title}</span>
                    <span className={styles.contactValue}>{item.value}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className={styles.socialSection}>
              <h3 className={styles.socialTitle}>Follow Us</h3>
              <div className={styles.socialLinks}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <span>{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.hoursSection}>
              <h3 className={styles.hoursTitle}>Business Hours</h3>
              <div className={styles.hoursList}>
                <div className={styles.hoursItem}>
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className={styles.hoursItem}>
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className={styles.hoursItem}>
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
