import getCurrentUser from "../actions/getCurrentUser";
import AppContainer from "../components/AppContainer";
import EmptyState from "../components/EmptyState";
import ProfileClient from "./ProfileClient";


export default async function Profile() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <AppContainer
                currentUser={currentUser}
                body={
                    <EmptyState title="Unauthorized" subtitle="Please sign in" />
                }
                />
        )
    }

    return (
        <AppContainer
        currentUser={currentUser}
        body={
            <ProfileClient currentUser={currentUser}/>
        }
        />
    )
}