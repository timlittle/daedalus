import fetchHelpPage from "../actions/fetchHelpPage";
import getCurrentUser from "../actions/getCurrentUser";
import AppContainer from "../components/AppContainer";
import HelpClient from "./HelpClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Server side handler for pull the help page from disk and render it

  // Fetch the current user
  const currentUser = await getCurrentUser();

  // Fetch the markdown file from the disk
  const helpPage = await fetchHelpPage();

  // Render the help page with the HelpClient view
  return <AppContainer currentUser={currentUser} body={<HelpClient content={helpPage} />} />;
}
