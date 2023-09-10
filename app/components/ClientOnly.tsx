"use client";

import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  // Component to prevent hydration issues with the application

  // Sets up state for if the components have mounted
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // When the DOM has loaded, set the mounted to true
    setHasMounted(true);
  }, []);

  // If the DOM has not fully loaded do not render the components
  if (!hasMounted) {
    return null;
  }

  // Render the components
  return <>{children}</>;
};

export default ClientOnly;
