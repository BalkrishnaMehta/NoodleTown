import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Brands from "./pages/Brands";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import BrandDetailView from "./pages/BrandDetailView";
import Authenticate from "./pages/Authenticate";

import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRoute from "./routes/AuthRoute";

import store from "./store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/authenticate",
      element: <AuthRoute />,
      children: [{ path: "/authenticate", element: <Authenticate /> }],
    },
    {
      element: <ProtectedRoute />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/brands", element: <Brands /> },
        { path: "/brands/:brand", element: <BrandDetailView /> },
        {
          path: "/brands/:brand/categories/:category/products/:product",
          element: <ProductDetail />,
        },
        { path: "/cart", element: <Cart /> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
