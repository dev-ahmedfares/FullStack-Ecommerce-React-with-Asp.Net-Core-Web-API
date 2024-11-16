import { Form } from "react-bootstrap";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type TInputProps<TFormInputs extends FieldValues> = {
  label: string;
  type?: string;
  name:string;
  error?: string;
  register: UseFormRegister<TFormInputs>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disable?: boolean;
  as?: "input" | "textarea";
  defaultValue?:string
  placeholder?:string
};

export default function Input<TFormInputs extends FieldValues>({
  label,
  register,
  type = "text",
  error,
  name,
  onBlur,
  formText,
  success,
  disable,
  placeholder,
  as = "input",
  defaultValue
}: TInputProps<TFormInputs>) {
  const onblurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name as Path<TFormInputs>).onBlur(e);
    } else {
      register(name as Path<TFormInputs>).onBlur(e);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        {...register(name)}
        isInvalid={!!error}
        onBlur={onblurHandler}
        isValid={success ? true : false}
        disabled={disable}
        as={as}
        defaultValue={defaultValue}
        placeholder={placeholder ? placeholder : ""}
        className={`${disable ? `text-bg-secondary` : ""}`}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      <Form.Text muted>{formText}</Form.Text>
    </Form.Group>
  );
}
