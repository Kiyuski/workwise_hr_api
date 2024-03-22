import { createBrowserRouter, Navigate } from "react-router-dom";
import Notfound from "./views/Notfound";
import Login from "./views/Login";
import Register from "./views/Register";
import GuestLayout from "./Layouts/GuestLayout";
import DefaultLayout from "./Layouts/DefaultLayout";
import Dashboard from "./views/Dashboard";
import Positions from "./views/Positions";
import Department from "./views/Department";
import Employees from "./views/Employees";
import History from "./views/History";
import Reports from "./views/Reports";
import AddExcel from "./views/AddExcel";
import ShowUser from "./views/ShowUser";

const router = createBrowserRouter([
      {
        path: "/",
        element: <DefaultLayout />,
        children: [
          { path: "/", element: <Navigate to="/login" /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/positions", element: <Positions /> },
          { path: "/department", element: <Department />},
          { path: "/employees", element: <Employees />},
          { path: "/employees/add-excel", element: <AddExcel />},
          { path: "/employees/:id", element: <ShowUser />},
          { path: "/history", element: <History />},
          { path: "/reports", element: <Reports />},
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