"use client";

import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title = "An error occured", subtitle = "Refesh browser" }) => {
  // A default state component, used when providing errors or prompting for login

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading center title={title} subtitle={subtitle} />
    </div>
  );
};

export default EmptyState;
