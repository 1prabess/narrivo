import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Button from "../common/Button";
import { LOGIN_REDIRECT } from "@/routes";

const SocialAuth = () => {
  const handleLogin = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex justify-between flex-col md:flex-row">
      <Button
        type="button"
        label="Continue with Github"
        outlined
        icon={FaGithub}
        onClick={() => handleLogin("github")}
      />

      <Button
        type="button"
        label="Continue with Google"
        outlined
        icon={FaGoogle}
        onClick={() => handleLogin("google")}
      />
    </div>
  );
};

export default SocialAuth;
