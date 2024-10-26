// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/index";
import Home from "../views/index.vue";
import SignInPage from "../views/auth/index.vue";
import LoginPage from "../views/auth/login.vue";
import ExpenseDashboard from "../views/ExpenseDashboard.vue"; // Dashboard for tracking expenses
import NotFound from "../views/404.vue";

// Define routes
const routes = [
  { path: "/", component: Home },
  { path: "/auth/", component: SignInPage },
  { path: "/auth/login", component: LoginPage },
  {
    path: "/dashboard",
    component: ExpenseDashboard,
    meta: { requiresAuth: true }, // Protect the dashboard
  },
  // Catch-all route for 404 page
  { path: "/:pathMatch(.*)*", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route guard to protect the dashboard route based on authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isAuthenticated;

  // Redirect to login if trying to access a protected route without being authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth/login");
  } else if (
    (to.path === "/auth/login" || to.path === "/auth/") &&
    isAuthenticated
  ) {
    // Redirect authenticated users away from login/signup pages to the dashboard
    next("/dashboard");
  } else {
    // Proceed if no authentication is required or if user is already authenticated
    next();
  }
});

export default router;
