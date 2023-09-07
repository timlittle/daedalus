"use client";

import { Document } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { HiDocumentText } from "react-icons/hi";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";

interface DocumentCardProps {
  data: Document;
  onDelete?: (id: string) => void;
  onEdit?: () => void;
  disabled: boolean;
  actionLabel?: string;
  actionId: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ data, onDelete, onEdit, disabled, actionId }) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onDelete?.(actionId);
    },
    [onDelete, actionId, disabled]
  );

  const toggle = () => {
    setIsOpen((value) => !value);
  };

  const toggleOpen = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    toggle();
  }, []);

  const handleEdit = () => {
    toggle();
    onEdit?.();
  };

  const ref = useDetectClickOutside({
    onTriggered: toggle,
    disableKeys: true,
  });

  return (
    <div className="card col-span-1 group max-w-none sm:max-w-[24rem] lg:h-46 xl:h-56 hover:scale-105">
      <div className="flex flex-col gap-2 w-full grow">
        <div
          className="card-body h-full relative overflow-hidden rounded-xl hover:cursor-pointer hover:opacity-80 select-none sm:select-auto"
          onClick={() => {
            router.push(`/documents/${data.id}`);
          }}
        >
          <div className="card-header">{data.title}</div>
          <div className="text-content-2">
          {data.description.substring(0, 50)}
            {data.description.length > 50 && "..."}
          </div>
          <div className="absolute top-3 right-3">
            <HiDocumentText size={16} />
          </div>
          <div className="absolute bottom-3 right-3" onClick={toggleOpen}>
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
              <div className="px-4 py-3 hover:opacity-80 transition font-semibold" onClick={handleEdit}>
                Edit
              </div>
              <div className="px-4 py-3 hover:opacity-80 text-rose-500 transition font-semibold" onClick={handleDelete}>
                Remove
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentCard;
