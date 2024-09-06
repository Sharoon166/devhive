"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import {
  Button,
  Input,
  CardBody,
  CardHeader,
  Card,
  Divider,
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { LuGithub, LuAtSign, LuLock, LuLogIn } from "react-icons/lu";
import { HUMOR_LINE_SWITCH_INTERVAL, SIGNIN_HUMOR_LINES } from "@/constants";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { account } from "@/appwrite";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [humorLine, setHumorLine] = useState(SIGNIN_HUMOR_LINES[0]);
  const router = useRouter();

  useEffect(() => {
    const getRandomHumorLine = () => {
      const randomIndex = Math.floor(Math.random() * SIGNIN_HUMOR_LINES.length);
      return SIGNIN_HUMOR_LINES[randomIndex];
    };

    setHumorLine(getRandomHumorLine());

    const intervalId = setInterval(() => {
      setHumorLine(getRandomHumorLine());
    }, HUMOR_LINE_SWITCH_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const session = await account.createOAuth2Session(
        OAuthProvider.Google,
        "http://localhost:3000/",
        "http://localhost:3000/signin"
      );
      // Implement Google sign-in logic here
      console.log("Google sign-in successful:", session);
      toast.success("Signed in with Google");
    } catch (error) {
      toast.error(
        error?.message ||
          "Unable to sign in with Google. Please try again later."
      );
      console.error("Google sign-in error:", error);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const session = await account.createOAuth2Session(
        "github",
        "http://localhost:3000/",
        "http://localhost:3000/signin"
      );
      console.log("GitHub sign-in successful:", session);
      toast.success("Signed in with Github");
      router.push("/");
    } catch (error) {
      toast.error(
        error?.message ||
          "Unable to sign in with GitHub. Please try again later."
      );
      console.error("GitHub sign-in error:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      console.log("Sign-in attempt with:", data);
      router.push("/");
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("email", {
        type: "manual",
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader className="flex flex-col items-center pb-0">
        <h1 className="text-2xl font-bold text-warning">Welcome Back!</h1>
        <AnimatePresence mode="wait">
          <motion.p
            key={humorLine}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-center text-foreground/70 mt-2">
            {humorLine.split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.03,
                }}>
                {char}
              </motion.span>
            ))}
          </motion.p>
        </AnimatePresence>
      </CardHeader>
      <CardBody>
        <div className="mt-4 space-y-4">
          <p className="font-semibold text-warning">Continue With</p>
          <div className="flex *:grow space-x-4">
            <Button
              isIconOnly
              aria-label="Continue with Google"
              variant="flat"
              onClick={handleGoogleSignIn}>
              <FcGoogle className="text-xl" />
            </Button>
            <Button
              isIconOnly
              aria-label="Continue with GitHub"
              variant="flat"
              onClick={handleGithubSignIn}>
              <LuGithub className="text-xl" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Divider className="my-8" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-content1 px-2 text-sm text-foreground/50">
            Or
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            type="email"
            label="Email address"
            {...register("email")}
            isInvalid={!!errors.email}
            errorMessage={errors.email?.message}
            startContent={
              <LuAtSign className="text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Input
            type="password"
            label="Password"
            {...register("password")}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message}
            startContent={
              <LuLock className="text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Button
            type="submit"
            color="warning"
            className="text-primary"
            isDisabled={!isValid}
            fullWidth>
            Sign In <LuLogIn className="ml-2" />
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="#" className="text-sm text-warning hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm text-foreground/70">
            Don't have an account?{" "}
          </span>
          <Link href="/signup" className="text-sm text-warning hover:underline">
            Sign up
          </Link>
        </div>
      </CardBody>
    </Card>
  );
}
