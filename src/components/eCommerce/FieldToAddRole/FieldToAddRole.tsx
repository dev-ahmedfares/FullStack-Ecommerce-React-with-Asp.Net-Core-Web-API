import Input from "@components/forms/Input/Input";

import {  Button, Form, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { addRoleSchema, TAddRole } from "@validation/addRoleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGiveUserRole } from "@store/auth/authSlice";
import toast from "react-hot-toast";

const { form } = styles;
export default function FieldToAddRole() {
  const dispatch = useAppDispatch();
  const {  loadingRole } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TAddRole>({
    resolver: zodResolver(addRoleSchema),
  });

  const handleAddRole: SubmitHandler<TAddRole> = (data) => {
    dispatch(actGiveUserRole(data.email)).unwrap().then((res)=> {
      if (res === "Admin Added") {
        toast.success("Email added as admin")
        reset()
      }
    }).catch(()=>{
      toast.error("Email not signup before or already admin")
    });
   
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
    
        </div>
      </Form>
    </>
  );
}
