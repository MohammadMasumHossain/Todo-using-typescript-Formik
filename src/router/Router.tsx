import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
  },
]);

export default Router;
