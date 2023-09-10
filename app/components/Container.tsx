"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  // Default container for the page, setting max weight and padding for mobile view
  return <div className="max-w-[2520px] sm:mx-auto xl:px-20 md:px-10 sm:px-2 px-4 w-full">{children}</div>;
};

export default Container;
