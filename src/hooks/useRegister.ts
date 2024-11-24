import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { signUpSchema, type TFormInputs } from "@validation/signUpSchema";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAuthRegister } from "@store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function useRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormInputs>({
    resolver: zodResolver(signUpSchema),
  });
  const { error, accessToken, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TFormInputs> = async (data) => {
    const { userName, email, password ,confirmPassword} = data;
    dispatch(actAuthRegister({ email,  password,confirmPassword,userName}))
      .unwrap()
      .then(() => navigate("/login?message=account_created")).catch(()=> toast.error("username already taken"));
  };


  return {
    register,
    handleSubmit,
    onSubmit,
    error,
    accessToken,
    loading,
    errors
  };
}

export default useRegister;
