import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";

import { RouterProvider } from "react-router";
import Router from "./router/Router.tsx";
import FormProvider from "./contexts/FormContext.tsx";

createRoot(document.getElementById("root")!).render(
  <FormProvider>
    <StrictMode>
      <RouterProvider router={Router}></RouterProvider>
    </StrictMode>
  </FormProvider>
);
