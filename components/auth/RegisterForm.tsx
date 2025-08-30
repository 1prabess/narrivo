"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import { signUp } from "@/actions/auth/register";
import { useState, useTransition } from "react";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertTriangle, Check } from "lucide-react";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const onSubmit = (data: RegisterSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      signUp(data).then((res) => {
        setError(res.error);
        setSuccess(res.success);
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[450px] m-auto mt-8 gap-2"
    >
      <Heading text="Create an account." lg center />

      <FormField
        id="name"
        register={register}
        errors={errors}
        placeholder="Name"
      />

      <FormField
        id="email"
        register={register}
        errors={errors}
        placeholder="Email"
        disabled={isPending}
      />

      <FormField
        id="password"
        register={register}
        errors={errors}
        placeholder="password"
        type="Password"
        disabled={isPending}
      />

      <FormField
        id="confirmPassword"
        register={register}
        errors={errors}
        placeholder="Confirm Password"
        type="password"
        disabled={isPending}
      />

      <Button
        label={isPending ? "Submitting..." : "Submit"}
        type="submit"
        disabled={isPending}
      />

      {error && (
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}

      {success && (
        <Alert variant="default">
          <Check />
          <AlertTitle>{success}</AlertTitle>
        </Alert>
      )}

      <div className="flex justify-center">Or</div>

      <SocialAuth />
    </form>
  );
};

export default RegisterForm;
