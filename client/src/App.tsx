import Myform from "./components/Myform";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  const approuter = createBrowserRouter([
    {
      path: "/users",
      element: <User />,
    },
    {
      path: "/",
      element:<Login/>
    },
    {
      path: "/signup",
      element:<Signup/>
    },
    {
      path:"/admin",
      element:<AdminDashboard/>
    },

  ]);

  return (
    <>
      <RouterProvider router={approuter}></RouterProvider>
    </>
  );
}

export default App;
