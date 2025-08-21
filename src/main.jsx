import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/main.css";
import "./index.css";
import Router from "./Router.jsx";
import { Provider } from "react-redux";
import store, { persistor } from "./network/store.js";
import "./assets/css/cbt_success/style.css";
import "./components/Navbar/nav.css";
import "./assets/css/home-page/style.css";
import "./assets/css/home-page/responsive.css";
import { PersistGate } from "redux-persist/integration/react";
import { HelmetProvider } from "react-helmet-async";
import DefaultMeta from "./view/DefaultMeta.jsx";
import ErrorBoundary from "../src/components/ErrorBoundary/ErrorBoundary.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <DefaultMeta />
          <Router />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
