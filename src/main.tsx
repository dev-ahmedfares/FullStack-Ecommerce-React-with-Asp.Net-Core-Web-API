import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import AppRouter from "@routes/AppRouter";
// Redux
import { Provider } from "react-redux";
import { persistor, store } from "@store/store";
import { PersistGate } from "redux-persist/integration/react";
// Axios
import "./services/Axios/axios.global.js";
// Style
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.min.css";
import "./styles/global.css";

const isMobile = window.innerWidth <= 768;

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
      <Toaster
        position={isMobile? "top-center":"bottom-right"}
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          className: "Toastify__toast",
          success: {
            duration: 2000,
          },error:{
            duration:3000
          }
        }}
      />
    </PersistGate>
  </Provider>
);
