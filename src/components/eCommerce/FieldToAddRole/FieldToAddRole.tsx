import Input from "@components/forms/Input/Input";

import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { addRoleSchema, TAddRole } from "@validation/addRoleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGiveUserRole } from "@store/auth/authSlice";

const { form } = styles;
export default function FieldToAddRole({ roles }: { roles: string[] }) {
  const dispatch = useAppDispatch();
  const { errorRole, loadingRole } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddRole>({
    resolver: zodResolver(addRoleSchema),
  });

  const handleAddRole: SubmitHandler<TAddRole> = (data) => {
    dispatch(actGiveUserRole(data.email));
   
  };

  return (
    <>
      <Form className={form} onSubmit={handleSubmit(handleAddRole)}>
        
        <Input
          label="Give Role"
          register={register}
          name="email"
          type="text"
          placeholder="Enter user email to give him Admin role"
          error={errors.email?.message}
        />
        <div className="text-end justify-content-end">
          <Button
            variant="primary"
            type="submit"
            disabled={loadingRole === "pending"}
          >
            {loadingRole === "pending" ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Submit Role"
            )}
          </Button>
          {/* staticElement add toast for handle error or add at success */}
          {errorRole && (
          <Alert variant="danger" className="mt-3 px-3 py-2">
            {errorRole}
          </Alert>
        )}
        </div>
      </Form>
    </>
  );
}
