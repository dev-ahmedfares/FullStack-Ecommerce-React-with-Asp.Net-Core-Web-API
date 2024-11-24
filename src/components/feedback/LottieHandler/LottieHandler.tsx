import Lottie from "lottie-react";
import error from "@assets/lottieFiles/error.json";
import empty from "@assets/lottieFiles/empty.json";
import firstLoading from "@assets/lottieFiles/firstLoading.json";
import loading from "@assets/lottieFiles/loading.json";
import notFound from "@assets/lottieFiles/notFound.json";
import success from "@assets/lottieFiles/success.json";
import login from "@assets/lottieFiles/login.json";
import register from "@assets/lottieFiles/register.json";
import styles from "../LottieHandler/styles.module.css";

const { parent, text, textEmpty, moveDown } = styles;

const lottieFilesMap = {
  error,
  empty,
  firstLoading,
  loading,
  notFound,
  success,
  login,
  register,
};

type TLottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
};

export default function LottieHandler({ type, message }: TLottieHandlerProps) {
  const lottie = lottieFilesMap[type];
  const isSmall = type === "firstLoading" || type === "loading";

  const isEmpty =
    type === "empty" ||
    type === "success" ||
    type === "notFound" ||
    type === "error";

  const addMargin =
    type === "success" || type === "notFound" || type === "error";

  return (
    <div className={parent}>
      <div>
        <Lottie
          animationData={lottie}
          style={
            type === "register"
              ? { width: "450px" }
              : type === "firstLoading"
              ? { width: "100px" }
              : { width: "300px" }
          }
        />
        {message && (
          <h3
            className={`${!isEmpty ? text : textEmpty} ${
              addMargin ? moveDown : ""
            } ${isSmall ? "fs-6" : ""} `}
          >
            {message}
          </h3>
        )}
      </div>
    </div>
  );
}
