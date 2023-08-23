import getCurrentUser from "@/app/actions/getCurrentUser";
import getProjectById from "@/app/actions/getProjectById";
import getProjects from "@/app/actions/getProjects";
import ClientOnly from "@/app/components/ClientOnly";
import Container from "@/app/components/Container";
import EmptyState from "@/app/components/EmptyState";
import Heading from "@/app/components/Heading";
import Sidebar from "@/app/components/sidebar/Sidebar";

interface IParams {
    projectId: string;
}

const ProjectPage = async ({ params }: {params: IParams}) => {

    const currentUser = await getCurrentUser();
    const project = await getProjectById(params);
    
    if (!project || !currentUser) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }
    
    const projects = await getProjects({userId: currentUser.id,});

    return (
        <div className="flex flex-row gap-2">
        <ClientOnly>
          <Sidebar currentUser={currentUser} />
        </ClientOnly>
        <ClientOnly>
            <Container>
                <div className="text-2xl font-bold flex justify-center pt-14">
                    <Heading title={project.title}/>
                </div>
            </Container>
        </ClientOnly>
      </div>
    );
}
 
export default ProjectPage;