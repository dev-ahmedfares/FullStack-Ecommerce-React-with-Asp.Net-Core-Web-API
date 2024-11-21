import { useForm, SubmitHandler } from "react-hook-form";
import { type signInType, signInSchema } from "@validation/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthLogin, resetUI } from "@store/auth/authSlice";
import { useEffect } from "react";

function useLogin() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<signInType>({
    resolver: zodResolver(signInSchema),
    defaultValues:{
      userName:"Admin2",
      password:"Admin@123#"
    }
  });
  
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { error, accessToken, loading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<signInType> = async (data) => {
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
  };

  useEffect(() => {
    dispatch(resetUI());
    return () => {
      dispatch(resetUI());
    };
  }, [dispatch]);

  return {
    errors,
    handleSubmit,
    register,
    error,
    accessToken,
    loading,
    onSubmit,
    searchParams
  };
}

export default useLogin;
