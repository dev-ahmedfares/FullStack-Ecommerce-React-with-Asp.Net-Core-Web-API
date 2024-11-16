import {
  changePasswordSchema,
  TChangePasswordForm,
} from "@validation/changePasswordSchema";
import styles from "./styles.module.css";
import Input from "@components/forms/Input/Input";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actChangePassword } from "@store/auth/authSlice";
import FieldToAddRole from "../FieldToAddRole/FieldToAddRole";


const { form, parent } = styles;

export default function AccountInfoForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  });
  const { loading, error, roles, user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TChangePasswordForm> = async (data) => {
    dispatch(
      actChangePassword({
        password: data.password,
        newPassword: data.newPassword,
        userName: user?.userName as string,
      })
    );

    
    
    // staticElement Handle Reset field after submit
    // reset()
  };

  return (
    <div className={parent}>
      <Form onSubmit={handleSubmit(onSubmit)} className={form}>
        <h4 className="fs-5 text-center fw-medium mb-3 mb-lg-0">
          Account Roles: {roles.join(",")}
        </h4>
        <Input
          label="Username"
          register={register}
          name="userName"
          defaultValue={user?.userName}
          disable
        />

        <Input
          label="Email"
          register={register}
          name="email"
          type="text"
          defaultValue={user?.email}
          disable
        />
        <hr className="mt-4 mb-4 d-block " />
        <h4 className="fs-5  text-center fw-medium mb-3 mb-lg-0 ">Change Password</h4>
        <Input
          label="Old Password"
          register={register}
          name="password"
          type="password"
          error={errors.password?.message}
        />
        <Input
          label="New Password"
          register={register}
          name="newPassword"
          type="password"
          error={errors.newPassword?.message}
        />

        <div className="text-end justify-content-end">
          <Button
            variant="primary"
            type="submit"
            disabled={loading === "pending"}
          >
            {loading === "pending" ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </div>
        {/* staticElement Toaster here */}
        {error && (
          <Alert variant="danger" className="mt-3 px-3 py-2">
            {error}
          </Alert>
        )}
      </Form>
      {roles.includes("Admin") && (
        <>
          <div className=" px-lg-4">
          <hr className="my-4 d-block" />
          </div>
          <FieldToAddRole roles={roles} />
        </>
      )}
    </div>
  );
}
