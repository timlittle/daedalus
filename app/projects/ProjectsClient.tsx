'use client';

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeUser } from "../types";
import { Project } from "@prisma/client";
import ProjectCard from "../components/projects/ProjectCard";
import useProjectModal from "../hooks/useProjectModal";

interface ProjectsClientProps {
    projects: Project[];
    currentUser?: SafeUser | null;
}

const ProjectsClient: React.FC<ProjectsClientProps> = ({
    projects,
    currentUser
}) => {
    const router = useRouter();
    const projectModal = useProjectModal();
    const [deletingId, setDeletingId] = useState('');

    const onDelete = useCallback((id: string)=>{
        setDeletingId(id);

        axios.delete(`/api/projects/${id}`)
        .then(()=>{
            toast.success("Project deleted");
            router.refresh();
        })
        .catch((error)=>{
            toast.error("Something went wrong")
        })
        .finally(()=>{
            setDeletingId('');
        })
    }, [router]);

    const onEdit = useCallback((id: string, title: string, description: string)=>{
        projectModal.setProjectId(id)
        projectModal.setProjectTitle(title);
        projectModal.setProjectDescription(description);
        projectModal.onEdit();
    },[projectModal])

    return ( 
        <Container>
            <div className="text-2xl font-bold flex justify-center pt-14">

            <Heading 
                title="Projects"
            />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 pt-10">
                {projects.map((project)=>(
                    <ProjectCard 
                        key={project.id}
                        data={project}
                        actionId={project.id}
                        onDelete={onDelete}
                        onEdit={() => onEdit(project.id, project.title, project.description)}
                        disabled={deletingId === project.id}
                    />
                ))}
            </div>
        </Container>
    );
}
 
export default ProjectsClient;