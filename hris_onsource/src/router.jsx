import { createBrowserRouter, Navigate } from "react-router-dom";
import Notfound from "./views/Notfound";
import Login from "./views/Login";
import Register from "./views/Register";
import GuestLayout from "./Layouts/GuestLayout";
import DefaultLayout from "./Layouts/DefaultLayout";
import Dashboard from "./views/Dashboard";

const router = createBrowserRouter([
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          { path: "/", element: <Navigate to="/login" /> },
          { path: "/Dashboard", element: <Dashboard /> },
        ]
        
      },
      {
        path: "/",
        element: <GuestLayout />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },

        ]
        
      },
      {
        path: "*",
        element: <Notfound />,
      
      },
    
  ]);


  export { router };