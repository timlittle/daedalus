"use client";

import { Project } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Container from "../components/Container";
import Heading from "../components/Heading";
import Card from "../components/cards/Card";
import ProjectCard from "../components/cards/ProjectCard";
import useProjectModal from "../hooks/useProjectModal";

interface ProjectsClientProps {
  projects: Project[];
}

const ProjectsClient: React.FC<ProjectsClientProps> = ({ projects }) => {
  // A view to display all the projects that the current users owns

  // Fetch the next router and the project modal state
  const router = useRouter();
  const projectModal = useProjectModal();

  // Set state for deleting a prohect
  const [deletingId, setDeletingId] = useState("");

  const onDelete = useCallback(
    (id: string) => {
      // Callback for deleting a project

      // Set the ID
      setDeletingId(id);

      // Call the internal API to delete the project from the database
      axios
        .delete(`/api/projects/${id}`)
        .then(() => {
          // Feedback to the user
          toast.success("Project deleted");
          // Refresh the plage
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const onEdit = useCallback(
    (id: string, title: string, description: string) => {
      // Callback used when editing the project

      // Populate the modal with the state from the card
      projectModal.setProjectId(id);
      projectModal.setProjectTitle(title);
      projectModal.setProjectDescription(description);

      // Open the project modal
      projectModal.onEdit();
    },
    [projectModal]
  );

  // Render a grid of cards, using the ProjectCard and a new project button
  return (
    <Container>
      <div className="text-2xl font-bold flex justify-center sm:pt-14 py-4">
        <Heading title="Projects" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 sm:pt-10">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            data={project}
            actionId={project.id}
            onDelete={onDelete}
            onEdit={() => onEdit(project.id, project.title, project.description)}
            disabled={deletingId === project.id}
          />
        ))}
        <Card
          onAction={projectModal.onOpen}
          body={
            <div data-cy="new-project-card" className="flex flex-col justify-center items-center h-full">
              <div>New Project</div>
            </div>
          }
        />
      </div>
    </Container>
  );
};

export default ProjectsClient;
