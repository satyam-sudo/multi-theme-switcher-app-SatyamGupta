// src/services/api.ts
import { Product } from "../types";

class ApiService {
  private baseURL = "https://fakestoreapi.com";

  private async request<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  async getProducts(limit?: number): Promise<Product[]> {
    const endpoint = limit ? `/products?limit=${limit}` : "/products";
    return this.request<Product[]>(endpoint);
  }

  async getProduct(id: number): Promise<Product> {
    return this.request<Product>(`/products/${id}`);
  }

  async getCategories(): Promise<string[]> {
    return this.request<string[]>("/products/categories");
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.request<Product[]>(`/products/category/${category}`);
  }
}

export const apiService = new ApiService();
