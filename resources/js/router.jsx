import { Navigate, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import ErrorPage from "./ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CardDetail from "./pages/CardDetail";
import Cart from "./pages/Cart";
import ChooseToCreate from "./pages/CRUD/ChooseToCreate";
import CardCreate from "./pages/CRUD/CardCreate";
import CardEdit from "./pages/CRUD/CardEdit";
import CardIndex from "./pages/CRUD/CardIndex";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <Navigate to="/" />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/card-detail/:id",
        element: <CardDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/card/choose-to-create",
        element: <ChooseToCreate />,
      },
      {
        path: "/card/index",
        element: <CardIndex />,
      },
      {
        path: "/card/create",
        element: <CardCreate />,
      },
      {
        path: "/card/edit/:cardId",
        element: <CardEdit />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
