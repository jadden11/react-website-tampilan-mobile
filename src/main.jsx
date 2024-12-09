import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDetail from "./assets/layouts/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/product/:id",
    element: <ProductDetail />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md mx-auto">
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>
);
