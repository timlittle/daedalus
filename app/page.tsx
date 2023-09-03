import getCurrentUser from "./actions/getCurrentUser";
import AppContainer from "./components/AppContainer";
import EmptyState from "./components/EmptyState";
import Heading from "./components/Heading";
import Story from "./components/newsfeed/story";

export const dynamic = "force-dynamic";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <AppContainer
        currentUser={currentUser}
        body={
          <EmptyState title="Welcome to Daedalus" subtitle="Please sign in" />
        }
      />
    );
  }

  const stories = [
    <Story
      key={13}
      title="News feed added"
      description="The homepage has been updated to include a newsfeed for the development of Daedalus. Feedback from beta testers of the platform indicated they would like more visibility into the updates that are occuring on the application. The newfeed acts as a mechnism to provide testers with a single entry point to understand the latest updates. "
      dateString="2023-09-03"
    />,
    <Story
      key={12}
      title="Sidebar updated"
      description="Based on user feedback. The sidebar has been updated with a static section for navigating to documents, projects and shared documents and dynamic content. When on a project, the dynamic content will display the document in the project and when on the home page, it will display all the users projects. The 'Shared Documents' section has been added to display documents that have been shared with the user."
      dateString="2023-09-02"
    />,
    <Story
      key={12}
      title="Document sharing"
      description="Documents now have the ability to be shared between Daedalus users. By default, only the owner of the document is able to edit the document. The owner can share the document with other Daedalus users by clicking the'Share' button on the Editor and selecting a user. The user will be granted permission to collaborate on the document."
      dateString="2023-09-02"
    />,
    <Story
      key={11}
      title="Render Mermaid and PlantUML diagrams"
      description="The markdown render has been extended to support mermaid and plantUML documents. Documents can be defined using fence blocks within the markdown documents. This is rendered in the preview panel. Mermaid and PlantUML are UML as Code frameworks, enabling users to define a diagram in text and have a digram render based on the defintion."
      dateString="2023-09-01"
    />,
    <Story
      key={10}
      title="Use Hocuspocus as a yJS provider"
      description="Hocuspocus is a hosted websocket which can be used as a yJS provider. This removes a dependency on running a local websocket server or public WebRTC signaling servers. "
      dateString="2023-09-01"
    />,
    <Story
      key={10}
      title="Add collaboration!"
      description="Users can now collaborate on documents! Two users can open the same document in different browsers and locations and see changes made in real time. This is achieved using the CodeMirror editor and yJS. yJS is a Conflict-free Replicated Data Type (CRDT) solution. It uses peer-to-peer communication over websockets or WebRTC to send deltas of the document. These are replayed in the editor to sync the changes between users. SyncedStore is used as an abstraction over the top of yJS to simplify interactions between users."
      dateString="2023-08-31"
    />,
    <Story
      key={9}
      title="Markdown editor added!"
      description="The Markdown editor has been added to the application. Users can click on a document under a project to be taken to the Editor view. The editor is made up of two components. The editor panel and the preview. When changes are made to the code of the left, it is rendered into the Preview panel. The users can manually save the documents to the database with a button in the top right of the UI."
      dateString="2023-08-28"
    />,
    <Story
      key={8}
      title="Add Documents to Daedalus "
      description="One of the core entities has been added to the platform. A document is a single narrative or design which users can collaborate on. This update adds the ablity to add/update/delete new documents within a project. The UI is the same as the project operations."
      dateString="2023-08-26"
    />,
    <Story
      key={7}
      title="Mobile navigation"
      description="Daedalus updated with a mobile navigation bar and responsive design. Mobile users are presented with a top navigation bar with a dropdown menu, enabling the user to navigate the platform and login/logout."
      dateString="2023-08-26"
    />,
    <Story
      key={6}
      title="Projects in sidebar"
      description="Update the sidebar to show all users projects when listing projects"
      dateString="2023-08-23"
    />,
    <Story
      key={5}
      title="Projects are editable"
      description="Projects can be edited through the new dropdown menu on the list projects page. Users are presented with a modal to update the data regarding projects"
      dateString="2023-08-23"
    />,
    <Story
      key={4}
      title="Projects added"
      description="Projects have been added to Daedalus. A project is a collection of documents. Users can add new projects and list they have created."
      dateString="2023-08-21"
    />,
    <Story
      key={3}
      title="Add icons and deploy to Vercel"
      description="As Daedalus uses NextJS. The application is deploy to Vercel under the https://daedalus.waux.co domain. ReactIcons are used to add a logo and indicators for buttons"
      dateString="2023-08-20"
    />,
    <Story
      key={2}
      title="NextAuth + Prisma"
      description="Using Prisma and MongoDB has the storage for Daedalus. With the new database, Daedalus can use it to retain users. NextAuth is used to authenticate with either a Daedalus user or using Google or Github credentials. The ability to register has been added."
      dateString="2023-08-20"
    />,
    <Story
      key={1}
      title="Added RippleUI"
      description="After some research into Tailwind component libraries, RippleUI has been added to the application to simplify stying. The side navigiation bar has been added and Modals for siginging into the platform"
      dateString="2023-08-19"
    />,
    <Story
      key={0}
      title="Daedalus is born!!"
      description="After a large amount of research and prototyping. Daedalus has started full time development. A large portion of the website has been prototyped and needs stiching together into a production ready site."
      dateString="2023-08-19"
    />,
  ];

  return (
    <AppContainer
      currentUser={currentUser}
      body={
        <div className="flex flex-col w-full flex-grow">
          <div className="flex flex-row my-8 item-center justify-center">
            <Heading title="Welcome to Daedalus" />
          </div>
          <div className="flex divide-y divide-gray-700 flex-col">
            <div className="space-y-2 pb-2 pt-6 md:space-y-5">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-100 sm:text-4xl md:leading-14">
                Newsfeed
              </h1>
            </div>
            <ul className="divide-y divide-gray-700 w-full">
              <li className="py-8">{stories.map((story) => story)}</li>
            </ul>
          </div>
        </div>
      }
    />
  );
}
