import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import SingleCharacter from "./pages/SingleCharacter";
import SinglePlanet from "./pages/SinglePlanet";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/character/:id", element: <SingleCharacter /> },
            { path: "/planet/:id", element: <SinglePlanet /> },
        ],
    },
]);

export default router;
