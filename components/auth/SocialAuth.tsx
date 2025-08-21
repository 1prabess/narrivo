import { FaGithub, FaGoogle } from "react-icons/fa";
import Button from "../common/Button";

const SocialAuth = () => {
  return (
    <div className="flex justify-between flex-col md:flex-row">
      <Button
        type="button"
        label="Continue with Github"
        outlined
        icon={FaGithub}
        onClick={() => {}}
      />

      <Button
        type="button"
        label="Continue with Google"
        outlined
        icon={FaGoogle}
        onClick={() => {}}
      />
    </div>
  );
};

export default SocialAuth;
