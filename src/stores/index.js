// src/stores/index.js
import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
import { getCookie } from "../utils/cookies"; // Import cookie utils if needed

const cookieValue = "connect.sid";

const url = "http://localhost:4000/api/v1"; // Ensure this is correct

// Set the cookie using js-cookie
Cookies.set("your_cookie_name", cookieValue);

const api = axios.create({
  withCredentials: true,
});

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    expenses: [], // Holds user expenses
    categories: [], // List of unique categories
  }),
  actions: {
    async login(credentials) {
      try {
        // Make sure to include credentials in the Axios request
        const { data } = await api.post(`${url}/auth/login`, credentials, {
          withCredentials: true,
        });
        this.user = data.user; // Assuming your API returns a user object
        this.isAuthenticated = true;

        console.log("Login successful", data);
      } catch (error) {
        // Improved error handling
        if (error.response) {
          console.error("Login error:", error.response.data);
        } else {
          console.error("Login error:", error.message);
        }
        this.isAuthenticated = false;
      }
    },

    async signup(credentials) {
      // New signup action
      try {
        const { data } = await api.post(`${url}/auth/signup`, credentials, {
          withCredentials: true,
        });
        console.log("Signup successful!");
      } catch (error) {
        // Handle error during signup
        if (error.response) {
          throw new Error(error.response.data.error); // Throw error to be caught in the component
        } else {
          throw new Error("Signup failed: " + error.message);
        }
      }
    },

    // src/stores/index.js
    async fetchExpenses(filters = {}) {
      this.loading = true;
      try {
        // Prepare the query parameters
        const params = {};
        if (filters.startDate) params.startDate = filters.startDate;
        if (filters.endDate) params.endDate = filters.endDate;
        if (filters.category) params.category = filters.category;

        const { data } = await api.get(`${url}/expenses`, {
          params,
          withCredentials: true,
        });
        this.expenses = data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch expenses";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async fetchCategories() {
      try {
        const { data } = await api.get(`${url}/expenses/categories`);
        this.categories = data;
        console.log(this.categories);
      } catch (error) {
        this.error =
          error.response?.data?.error || "Failed to fetch categories";
      }
    },

    // Add new expense
    async addExpense(expenseData) {
      this.loading = true;
      try {
        const { data } = await api.post(`${url}/expenses`, expenseData);
        this.expenses.push(data);
        console.log(data);

        return data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to add expense";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Update existing expense
    async updateExpense(id, expenseData) {
      this.loading = true;
      try {
        const { data } = await api.put(`${url}/expenses/${id}`, expenseData);
        const index = this.expenses.findIndex((e) => e._id === id);
        if (index !== -1) {
          this.expenses[index] = data;
        }
        return data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to update expense";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    // Delete expense
    async deleteExpense(id) {
      this.loading = true;
      try {
        await api.delete(`${url}/expenses/${id}`, {
          method: "POST",
          credentials: "include", // Important for sending cookies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: this.expenses._id }),
        });
        this.expenses = this.expenses.filter((e) => e._id !== id);
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to delete expense";
        throw error;
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.expenses = [];
    },

    checkAuth() {
      // Check if user is authenticated based on cookie
      const token = getCookie("connect.sid"); // Change to your cookie name if needed
      if (token) {
        this.isAuthenticated = true;
        // Optionally fetch user details or set user state from token
      }
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.expenses = [];
    },

    checkAuth() {
      // Check if user is authenticated based on cookie
      const token = getCookie("connect.sid"); // Change to your cookie name if needed
      if (token) {
        this.isAuthenticated = true;
        // Optionally fetch user details or set user state from token
      }
    },
  },

  getters: {
    filteredExpenses: (state) => (filters) => {
      let filtered = state.expenses;
      if (filters.startDate) {
        const start = new Date(filters.startDate);
        filtered = filtered.filter(
          (expense) => new Date(expense.date) >= start
        );
      }
      if (filters.endDate) {
        const end = new Date(filters.endDate);
        filtered = filtered.filter((expense) => new Date(expense.date) <= end);
      }
      if (filters.category) {
        filtered = filtered.filter(
          (expense) => expense.category === filters.category
        );
      }
      return filtered;
    },
  },
  persist: {
    enabled: true,
    storage: localStorage,
    paths: ["user", "isAuthenticated"],
  },
});
