'use client';

import useProjectModal from "@/app/hooks/useProjectModal";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const ProjectModal = () => {
    const router = useRouter();
    const projectModal = useProjectModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            description: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true);

        axios.post('/api/projects', data)
        .then(()=>{
            toast.success('Project Created!');
            router.refresh();
            reset();
            projectModal.onClose();
        })
        .catch(()=>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setIsLoading(false);
        })

    }

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Create a new project"
                subtitle="A project is a collection of documents that contribute to a project"
            />
            <Input id='title' label='Title' register={register} errors={errors} required/>
            <Input id='description' label='Description' register={register} errors={errors} required/>
        </div>
    )

    return ( 
    <Modal
        isOpen={projectModal.isOpen}
        title="New Project"
        onClose={projectModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel="Create"
        body={bodyContent}
    />
    );
}
 
export default ProjectModal;