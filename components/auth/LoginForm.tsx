"use client";

import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";
import { useState, useTransition } from "react";
import { login } from "@/actions/auth/login";
import { useRouter } from "next/navigation";
import { LOGIN_REDIRECT } from "@/routes";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const onSubmit = (data: LoginSchemaType) => {
    setError("");
    startTransition(() => {
      login(data).then((res) => {
        if (res?.error) {
          setError(res.error);
        }

        if (!res?.error) {
          router.push(LOGIN_REDIRECT);
        }
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-[450px] m-auto mt-8 gap-2"
    >
      <Heading text="Login to narrivo." lg center />

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
        placeholder="Password"
        type="password"
        disabled={isPending}
      />

      {error && <span className="text-rose-600">{error}</span>}

      <Button label="Submit" type="submit" disabled={isPending} />

      <div className="flex justify-center">Or</div>

      <SocialAuth />
    </form>
  );
};

export default LoginForm;
