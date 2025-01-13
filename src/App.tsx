import { Provider, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import store, { RootState } from "./store";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ProductDetail from "./pages/ProductDetail";
import BrandDetailView from "./pages/BrandDetailView";
import Authenticate from "./pages/Authenticate";
import Orders from "./pages/Orders";
import OrderDetail from "./components/Orders/OrderDetails";
import Restaurants from "./pages/Restaurants";
import ServiceCategories from "./components/Home/ServiceCategories";
import { setAuth, clearAuth } from "./store/auth/authSlice";
import { cartActions } from "./store/cart/cartSlice";
import { AuthRoute } from "./routes/AuthRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useRefreshToken } from "./api/userApi";
import { useCart } from "./api/cartApi";

function AppContent() {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const {
    data: authData,
    isLoading: isAuthLoading,
    isError,
  } = useRefreshToken();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const { data: cartData, isLoading: isCartLoading } = useCart();

  useEffect(() => {
    if (!isAuthLoading) {
      if (authData) {
        queryClient.setQueryData(["auth"], authData);
        dispatch(setAuth(authData));
      } else if (isError) {
        queryClient.setQueryData(["auth"], null);
        dispatch(clearAuth());
      }
    }
  }, [authData, isAuthLoading, isError, dispatch, queryClient]);

  useEffect(() => {
    if (!isAuthLoading) {
      if (token && !isCartLoading && cartData) {
        dispatch(cartActions.setCart(cartData));
      } else if (!token) {
        const localCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
        dispatch(cartActions.setCartForUnauthenticated(localCart));
      }
    }
  }, [isAuthLoading, token, isCartLoading, cartData, dispatch]);

  if (isAuthLoading || isCartLoading) return null;

  const router = createBrowserRouter([
    {
      path: "/authenticate",
      element: <AuthRoute />,
      children: [{ path: "/authenticate", element: <Authenticate /> }],
    },
    { path: "/", element: <Home /> },
    { path: "/restaurants", element: <Restaurants /> },
    { path: "/brands", element: <Brands /> },
    { path: "/brands/:brand", element: <BrandDetailView /> },
    {
      path: "/categories/:category",
      element: <ServiceCategories />,
    },
    { path: "/products/:product", element: <ProductDetail /> },
    { path: "/cart", element: <Cart /> },

    {
      element: <ProtectedRoute />,
      children: [
        { path: "/profile", element: <Profile /> },
        { path: "/orders", element: <Orders /> },
        { path: "/orders/:orderId", element: <OrderDetail /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
