"use client";

import { useCallback, useState } from "react";

import useLoginModal from "@/app/hooks/useLoginModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import Heading from "../Heading";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Input from "../inputs/Input";
import Modal from "./Modal";

const LoginModal = () => {
  // Modal for login into the platform

  // Fetch the login modal, register modal and next router
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  // Setup state to indicate the modal is busy
  const [isLoading, setIsLoading] = useState(false);

  // Setup form for submission
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Submit handler used with the user submits the form

    // Indicate the modal is busy
    setIsLoading(true);

    // Use the Next-Auth signin function to sign in with the supplied credenitals
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      // If logged in
      if (callback?.ok) {
        // Feedback to the user
        toast.success("Logged in");
        // Refresh the page
        router.refresh();
        // Close the login modal
        loginModal.onClose();
      }

      // If not logged in
      if (callback?.error) {
        // Feedback to the user
        console.log(data);
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    // Toggle betweent the login and register modal
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  // Setup the body of the modal, with email and password
  const bodyContent = (
    <div className="flex flex-col gap-4 ">
      <Heading title="Welcome to Daedalus" subtitle="Login to your account" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  // Setup the footer with social logins and prompted to register
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => signIn("github")} />
      <div className="text-neutral-500 text-center p-4 font-light">
        <div className="flex felx-row items-center gap-2 justify-center">
          <div>New to Daedalus?</div>
          <div className="cursor-pointer hover:underline font-semibold" onClick={toggle}>
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  // Render the modal using the Modal base component
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
