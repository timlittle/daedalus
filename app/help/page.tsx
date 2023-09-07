import fetchHelpPage from '../actions/fetchHelpPage';
import getCurrentUser from "../actions/getCurrentUser";
import AppContainer from "../components/AppContainer";
import HelpClient from "./HelpClient";

export const dynamic = "force-dynamic";


export default async function Home() {
  const currentUser = await getCurrentUser();
  const helpPage = await fetchHelpPage();

  return (
    <AppContainer
      currentUser={currentUser}
      body={
        <HelpClient content={helpPage}/>
      }
    />
  );
}
