"use client";

import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AiFillFolder } from "react-icons/ai";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";

interface ProjectCardProps {
  data: Project;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
  disabled: boolean;
  actionLabel?: string;
  actionId: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ data, onDelete, onEdit, disabled, actionId }) => {
  // Card used to display projects across the platform
  // Includes a menu for editing and deleting the record

  // Router used for users clicking the card
  const router = useRouter();

  // State for if the menu is open
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Callback function to perform the delete call
      // Stops propagation before doing so

      e.stopPropagation();
      if (disabled) {
        return;
      }

      onDelete?.(actionId);
    },
    [onDelete, actionId, disabled]
  );

  const toggle = () => {
    // Function to toggle the menu open or closed
    setIsOpen((value) => !value);
  };

  const toggleOpen = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Callback function for toggling the menu
    // Stops propagation and calls the private function above
    e.stopPropagation();
    toggle();
  }, []);

  const handleEdit = () => {
    // Close the menu and open the edit modal
    toggle();
    onEdit?.();
  };

  const ref = useDetectClickOutside({
    // Detection of click events outside of the menu, will close menu
    onTriggered: toggle,
    disableKeys: true,
  });

  // Define the card component for rendering
  // Includes interactoins menu for editing and deleting
  return (
    <div className="card col-span-1 group max-w-none sm:max-w-[24rem] lg:h-46 xl:h-56 hover:scale-105">
      <div className="flex flex-col gap-2 w-full grow">
        <div
          className="card-body h-full relative overflow-hidden rounded-xl hover:cursor-pointer hover:opacity-80 select-none sm:select-auto"
          onClick={() => {
            router.push(`/projects/${data.id}`);
          }}
        >
          <div data-cy={`project-card-${data.title.toLowerCase()}-title`} className="card-header">
            {data.title}
          </div>
          <div data-cy={`project-card-${data.title.toLowerCase()}-description`} className="text-content-2">
            {data.description.substring(0, 50)}
            {data.description.length > 50 && "..."}
          </div>
          <div className="absolute top-3 right-3">
            <AiFillFolder size={16} />
          </div>
          <div data-cy="project-menu-dots" className="absolute bottom-3 right-3" onClick={toggleOpen}>
            <div className="realative hover:opacity-80 transition cursor-pointer">
              <PiDotsThreeOutlineVertical />
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        {isOpen && (
          <div
            ref={ref}
            className="absolute display rounded-xl shadow-md w-[30vw] md:w-4/12 z-[66] bg-slate-6 overflow-hidden text-sm right-6 -top-8"
          >
            <div className="realtive flex flex-col cursor-pointer items-center justify-center">
              <div data-cy="card-menu-edit" className="px-4 py-3 hover:opacity-80 transition font-semibold" onClick={handleEdit}>
                Edit
              </div>
              <div data-cy="card-menu-delete" className="px-4 py-3 hover:opacity-80 text-rose-500 transition font-semibold" onClick={handleDelete}>
                Remove
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
