'use client';
import useShareModal from "@/app/hooks/useShareModal";
import { SafeUser } from "@/app/types";
import { Document } from "@prisma/client";
import { useCallback, useEffect } from "react";

interface ShareDocumentProps {
    document: Document,
    currentUser: SafeUser | null
    sharedUsers: SafeUser[] | []
    allUsers: SafeUser[] | []
}

const ShareDocument: React.FC<ShareDocumentProps> = ({
    document, 
    currentUser,
    sharedUsers,
    allUsers
}) => {

    const shareModal = useShareModal();
    
    const onShare = useCallback(()=>{
        shareModal.setDocumentId(document.id);
        shareModal.setUserId(currentUser?.id || '');
        shareModal.setSharedUsers(sharedUsers);
        shareModal.setAllUsers(allUsers);
        shareModal.onOpen();
    },[shareModal, sharedUsers, allUsers, document, currentUser]);
    
    return ( <div className="btn btn-solid-primary" onClick={onShare}>Share</div> );
}
 
export default ShareDocument;