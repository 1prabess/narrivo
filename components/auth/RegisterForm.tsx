"use client";

import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import { signUp } from "@/actions/auth/register";
import { useState, useTransition } from "react";

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

      <div className="flex justify-center">Or</div>

      <SocialAuth />

      {error}
      {success}
    </form>
  );
};

export default RegisterForm;
