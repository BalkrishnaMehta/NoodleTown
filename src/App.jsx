import Cart from "./pages/Cart";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import BrandDetailView from "./pages/BrandDetailView";
import { Provider } from "react-redux";
import store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
