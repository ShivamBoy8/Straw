import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store.js";
import { ToastProvider } from "./components/Loader/ToastProvider.jsx";
import ScrollToTop from "./utils/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <ScrollToTop/>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </Provider>,
);
