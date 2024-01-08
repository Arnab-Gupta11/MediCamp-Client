import {
  createBrowserRouter
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import AvailableCamps from '../pages/AvailableCamps/AvailableCamps';
import ContactUs from '../pages/ContactUs/ContactUs';


export  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/register",
          element: <Register></Register>
        },
        {
          path: "/available-camps",
          element: <AvailableCamps></AvailableCamps>
        },
        {
          path: "/contact",
          element: <ContactUs></ContactUs>
        }
      ]
    },
  ]);


