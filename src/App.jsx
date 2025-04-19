import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AdminLogin from "./pages/AdminLogin";
import CreateUser from "./pages/CreateUser";
import UserList from "./pages/UserList";
import { setUsers } from "./store/authSlice";
import { userdata } from "./users";
import Products from "./pages/Products";
import { setProducts } from "./store/productSlice";
import { products } from "./products";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const Root = ({ children }) => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },

  {
    path: "/admin/users",
    element: <UserList />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/users/new",
    element: <CreateUser />,
  },
  {
    path: "/admin/users/edit/:id",
    element: <CreateUser />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.auth);
  const userExist = JSON.parse(localStorage.getItem("users"));
  const productExist = JSON.parse(localStorage.getItem("products"));

  useEffect(() => {
    if (userExist) {
      dispatch(setUsers(userExist));
    } else {
      dispatch(setUsers(userdata));
    }

    if (productExist) {
      dispatch(setProducts(productExist));
    } else {
      dispatch(setProducts(products));
    }
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
