import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";

import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Details from "../pages/Details";
import Admin from "../Admin";
import AdminLogin from "../pages/AdminLogin";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import AdminOrders from "../pages/AdminOrders";
import ProtectedRoute from "./ProtectedRoute";
import AddProduct from "../pages/AddProduct";
import UpdateProduct from "../pages/UpdateProduct";
import Shop from "../pages/Shop";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/shop", element: <Shop /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/details/:id", element: <Details /> },
    ],
  },

  // Admin Routes

  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "/admin", element: <AdminLogin /> },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute>
            {" "}
            <Dashboard />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <ProtectedRoute>
            <AdminOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <ProtectedRoute>
            <Products />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/add-product",
        element: (
          <ProtectedRoute>
            <AddProduct />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/update-product/:id",
        element: (
          <ProtectedRoute>
            <UpdateProduct />{" "}
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
