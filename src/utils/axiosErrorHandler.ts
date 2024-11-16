import { isAxiosError } from "axios";

export default function axiosErrorHandler (error:unknown) {
    if (isAxiosError(error)) {
      const currError =  ( error.response?.data  || error.response?.data.message || error.message);

        return typeof currError  === "string" ? currError : "An unexpected error"
      } else {
        return ("An unexpected error");
      }
}