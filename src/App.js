import React, { useEffect, useState } from "react";
import { getToken } from "./api/storage/token";
import { UserContext } from "./context/UserContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ROUTER from "./navigation";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Main from "./pages/Main";
import Homepage from "./pages/Homepage";
import AddRecipe from "./pages/AddRecipe";
import NotFound from "./pages/404NotFound";

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser(true);
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: ROUTER.LOGIN,
      element: <Login />,
    },
    {
      path: ROUTER.REGISTER,
      element: <Register />,
    },

    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: ROUTER.ADD_RECIPE,
          element: <AddRecipe />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
};

export default App;
