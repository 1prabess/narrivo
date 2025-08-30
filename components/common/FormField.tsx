import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  id: string;
  type?: string;
  disabled?: boolean;
  placeholder: string;
  label?: string;
  inputClassNames?: string;
  register: UseFormRegister<T>;
  errors: FieldErrors;
}

const FormField = <T extends FieldValues>({
  id,
  type,
  disabled,
  placeholder,
  label,
  inputClassNames,
  register,
  errors,
}: FormFieldProps<T>) => {
  const message = errors[id] && (errors[id]?.message as string);

  return (
    <div>
      {label && <span className="block text-sm">{label}</span>}
      <input
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        {...register(id as Path<T>)}
        className={cn(
          "w-full p-3 my-2 outline-none rounded-md disabled: opacity-70 disabled:cursor-not-allowed border border-neutral-300 dark:border-neutral-500",
          errors[id] && "border-rose-400",
          inputClassNames
        )}
      />
      {message && <span className="text-sm text-rose-400">{message}</span>}
    </div>
  );
};

export default FormField;
