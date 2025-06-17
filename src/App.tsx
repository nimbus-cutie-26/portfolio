import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SplashCursor from "./Animation/SplashCursor";
import { AdminLoginRoute } from "./Routes/AdminRoutes/AdminRoutes";

const router = createBrowserRouter([
    AdminLoginRoute, // add more routes here if needed
]);

const App: React.FC = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default App;
