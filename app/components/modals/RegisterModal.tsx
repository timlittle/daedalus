"use client";

import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import axios from "axios";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const RegisterModal = () => {
  // A modal used to register new users to the platform

  // Fetch the login modal and regiser modal from customer hooks
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // Setup state to indicate the modal is busy
  const [isLoading, setIsLoading] = useState(false);

  // Setup the form for submission
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // Submit handlder used when the user submits the form

    // Set the loading state to indicate it is busy
    setIsLoading(true);

    // Make a call to the internal API to create the new user record
    axios
      .post("/api/register", data)
      .then(() => {
        // Provide feedback to the user
        toast.success("Registration successful!");

        // Prompt the user to login
        loginModal.onOpen();
        // Close the register modal
        registerModal.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong ");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const toggle = useCallback(() => {
    // Toggle between the login modal and the register modal
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  // The conent of the modal, including the email, name and password fields
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Create an account" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
    </div>
  );

  // Setup a footer for social logins and prompt for existing users
  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label="Continue with GitHub" icon={AiFillGithub} onClick={() => signIn("github")} />
      <div className="text-neutral-500 text-center p-4 font-light">
        <div className="flex felx-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>
            Log in
          </div>
        </div>
      </div>
    </div>
  );

  // Render the modal with the Modal base component
  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
