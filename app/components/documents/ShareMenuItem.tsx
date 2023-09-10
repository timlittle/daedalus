"use client";
import useShareModal from "@/app/hooks/useShareModal";
import { SafeUser } from "@/app/types";
import { Document } from "@prisma/client";
import { useCallback } from "react";
import { AiOutlineShareAlt } from "react-icons/ai";
import MenuItem from "../navbar/MenuItem";

interface ShareMenuItemProps {
  document: Document;
  currentUser: SafeUser | null;
  sharedUsers: SafeUser[] | [];
  allUsers: SafeUser[] | [];
}

const ShareMenuItem: React.FC<ShareMenuItemProps> = ({ document, currentUser, sharedUsers, allUsers }) => {
  // Component to set the state of the share modal and open it

  // Fetch the share modal from the custom hook
  const shareModal = useShareModal();

  const onShare = useCallback(() => {
    // Set the state of the share modal in the custom hook
    shareModal.setDocumentId(document.id);
    shareModal.setUserId(currentUser?.id || "");
    shareModal.setSharedUsers(sharedUsers);
    shareModal.setAllUsers(allUsers);
    // Open the modal
    shareModal.onOpen();
  }, [shareModal, sharedUsers, allUsers, document, currentUser]);

  // Render the share modal with the populated state
  return <MenuItem action={onShare} actionLabel="Share" icon={AiOutlineShareAlt} />;
};

export default ShareMenuItem;
