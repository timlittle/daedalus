import getCurrentUser from "@/app/actions/getCurrentUser";
import getProjectById from "@/app/actions/getProjectById";
import getProjects from "@/app/actions/getProjects";
import AppContainer from "@/app/components/AppContainer";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";

interface IParams {
  projectId: string;
}

const ProjectPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const project = await getProjectById(params);

  if (!project || !currentUser) {
    return <AppContainer currentUser={currentUser} body={<EmptyState />} />;
  }

  const projects = await getProjects({ userId: currentUser.id });

  return (
    <AppContainer
      currentUser={currentUser}
      body={
        <div className="text-2xl font-bold flex justify-center sm:pt-14 py-4">
          <Heading title={project.title} />
        </div>
      }
    />
  );
};

export default ProjectPage;
