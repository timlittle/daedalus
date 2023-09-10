"use client";

import React from "react";

interface CardProps {
  onAction: () => void;
  body: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ onAction, body }) => {
  // Base component for new project/new document card components
  // The body is passed in as prop which contains the content
  // Onaction is the onclick event for the whole card
  return (
    <div className="card col-span-1 group max-w-none sm:max-w-[24rem] lg:h-46 xl:h-56 hover:scale-105">
      <div className="flex flex-col gap-2 w-full grow">
        <div
          className="card-body h-full relative btn-primary overflow-hidden rounded-xl hover:cursor-pointer hover:opacity-80 select-none sm:select-auto "
          onClick={onAction}
        >
          {body}
        </div>
      </div>
    </div>
  );
};

export default Card;
