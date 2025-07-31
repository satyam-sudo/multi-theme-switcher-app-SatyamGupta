// src/types/index.ts

export interface Theme {
  id: string;
  name: string;
  className: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
