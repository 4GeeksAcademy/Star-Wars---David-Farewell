import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "./pages/Home";
import SingleCharacter from "./pages/SingleCharacter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/character/:id", element: <SingleCharacter /> },
    ],
  },
]);

export default router;
