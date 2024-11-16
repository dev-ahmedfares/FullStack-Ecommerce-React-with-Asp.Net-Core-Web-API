import { createRoot } from "react-dom/client";
import AppRouter from "@routes/AppRouter";
// Redux
import { Provider } from "react-redux";
import { persistor, store } from "@store/store";
import { PersistGate } from "redux-persist/integration/react";
// Axios
import "./services/Axios/axios.global.js"
// Style
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.min.css"
import "./styles/global.css"

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
