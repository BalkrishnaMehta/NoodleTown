import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import BrandDetailView from "./pages/BrandDetailView";

import store from "./store";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/categories", element: <Categories /> },
    { path: "/categories/:index", element: <BrandDetailView /> },
    { path: "/cart", element: <Cart /> },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
