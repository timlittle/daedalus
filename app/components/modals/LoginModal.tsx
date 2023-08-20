'use client';

import { useRouter } from "next/router";
import { useCallback, useState } from "react";


import {useForm, SubmitHandler, FieldValues} from 'react-hook-form';
import Heading from "../Heading";
import useLoginModal from "@/app/hooks/useLoginModal";
import Button from "../Button";

import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import Modal from "./Modal";
import Input from "../inputs/Input";


const LoginModal = () => {
    // const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {register, handleSubmit, formState: { errors }} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        // setIsLoading(true);

        // signIn('credentials', {
        //     ... data,
        //     redirect: false,
        // })
        // .then((callback) => {
        //     setIsLoading(false);

        //     if (callback?.ok) {
        //         toast.success('Logged in');
        //         router.refresh();
        //         loginModal.onClose();
        //     }

        //     if (callback?.error) {
        //         console.log(data)
        //         toast.error(callback.error);
        //     }
        // })
    }

    const toggle = useCallback(()=> {
        loginModal.onClose();
    }, [loginModal ])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
                title='Welcome to Daedalus'
                subtitle="Login to your account"
            />
            <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required />
        </div>
    )
    const footerContent  = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button 
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={()=>{}}
            />
            <Button 
                outline
                label='Continue with GitHub'
                icon={AiFillGithub}
                onClick={()=>{}}
            />
            <div className='text-neutral-500 text-center p-4 font-light'>
                <div className='flex felx-row items-center gap-2 justify-center'>
                    <div>
                        New to Daedalus?
                    </div>
                    <div className='cursor-pointer hover:underline font-semibold' onClick={toggle}>
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title='Login'
            actionLabel='Continue'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)} 
            body={bodyContent}
            footer={footerContent}
    />
    );
}
 
export default LoginModal;