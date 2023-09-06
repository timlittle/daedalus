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
  const shareModal = useShareModal();

  const onShare = useCallback(() => {
    shareModal.setDocumentId(document.id);
    shareModal.setUserId(currentUser?.id || "");
    shareModal.setSharedUsers(sharedUsers);
    shareModal.setAllUsers(allUsers);
    shareModal.onOpen();
  }, [shareModal, sharedUsers, allUsers, document, currentUser]);

  return <MenuItem action={onShare} actionLabel="Share" icon={AiOutlineShareAlt} />;
};

export default ShareMenuItem;
