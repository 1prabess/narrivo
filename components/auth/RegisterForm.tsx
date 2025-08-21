"use client";

import { LoginSchema, LoginSchemaType } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormField from "../common/FormField";
import Button from "../common/Button";
import Heading from "../common/Heading";
import SocialAuth from "./SocialAuth";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit = (data: LoginSchemaType) => {
    console.log("Form submitted:", data);
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
      />

      <FormField
        id="password"
        register={register}
        errors={errors}
        placeholder="password"
        type="Password"
      />

      <FormField
        id="confirmPassword"
        register={register}
        errors={errors}
        placeholder="Confirm Password"
        type="password"
      />

      <Button label="Submit" type="submit" />

      <div className="flex justify-center">Or</div>

      <SocialAuth />
    </form>
  );
};

export default RegisterForm;
