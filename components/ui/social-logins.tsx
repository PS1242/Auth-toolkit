import { signIn } from "next-auth/react";
import { Button } from "./button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT_URL } from "@/routes";

const SocialLogins = () => {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => {
          signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT_URL });
        }}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        type="button"
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => {
          signIn("github", { callbackUrl: DEFAULT_LOGIN_REDIRECT_URL });
        }}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default SocialLogins;
