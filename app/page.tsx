import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import Modal from "./components/modals/Modal";

export default function Home() {
  return (
    <ClientOnly>
        <EmptyState 
          title="Welcome to Daedalus"
          subtitle="Please sign in"
        />
    </ClientOnly>
  );
  }