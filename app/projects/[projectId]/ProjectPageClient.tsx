"use client";

import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import Card from "@/app/components/cards/Card";
import DocumentCard from "@/app/components/cards/DocumentCard";
import useDocumentModal from "@/app/hooks/useDocumentModal";
import { Document } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

interface ProjectPageClientProps {
  projectTitle: string;
  documents: Document[];
  showNew?: boolean;
}

const ProjectPageClient: React.FC<ProjectPageClientProps> = ({ projectTitle, documents, showNew }) => {
  const router = useRouter();
  const documentModal = useDocumentModal();
  const [deletingId, setDeletingId] = useState("");
  const { projectId } = useParams();

  const onDelete = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/documents/${id}`)
        .then(() => {
          toast.success("Document deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  const onEdit = useCallback(
    (id: string, title: string, description: string) => {
      documentModal.setDocumentId(id);
      documentModal.setProjectId(projectId as string);
      documentModal.setDocumentTitle(title);
      documentModal.setDocumentDescription(description);
      documentModal.onEdit();
    },
    [documentModal, projectId]
  );

  return (
    <Container>
      <div className="text-2xl font-bold flex justify-center sm:pt-14 py-4">
        <Heading title={projectTitle} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 sm:pt-10">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            data={document}
            actionId={document.id}
            onDelete={onDelete}
            onEdit={() => onEdit(document.id, document.title, document.description)}
            disabled={deletingId === document.id}
          />
        ))}
        {showNew && (
          <Card
            onAction={documentModal.onOpen}
            body={
              <div data-cy="new-document-card" className="flex flex-col justify-center items-center h-full">
                <div>New Document</div>
              </div>
            }
          />
        )}
      </div>
    </Container>
  );
};

export default ProjectPageClient;
