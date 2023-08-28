"use client";

import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { useCallback } from "react";
import Button from "../Button";
import useProjectModal from "@/app/hooks/useProjectModal";
import Heading from "../Heading";
import useDocumentModal from "@/app/hooks/useDocumentModal";
import { useRouter } from "next/navigation";

interface FooterProps {
  currentUser?: SafeUser | null;
  projectId?: string;
}

const Footer: React.FC<FooterProps> = ({ currentUser, projectId }) => {

  const projectModal = useProjectModal();
  const documentModal = useDocumentModal();
  const router = useRouter();

  let createButton = (
    <Button
    label="New Project"
    onClick={projectModal.onOpen}
  />
  )

if (projectId) {
  createButton = (
      <Button
        label="New Document"
        onClick={documentModal.onOpen}
    />
  )
}

  if (!currentUser) {
    return (
      <section className="sidebar-footer h-full justify-end bg-gray-2 pt-2">
        <div className="divider my-0" />
        <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
          <label
            className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4"
            tabIndex={0}
          >
            <div className="flex flex-row gap-4 p-4">
              <div className="avatar avatar-md">
                <Image
                  alt="avatar"
                  width={30}
                  height={30}
                  src="/images/placeholder.jpg"
                />
              </div>
            </div>
          </label>
        </div>
      </section>
    );
  }

  const endDate = new Date("09/18/2023");
  const startDate = new Date();
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = diffTime / (1000 * 3600 * 24);

  return (
    <section className="sidebar-footer h-full justify-end bg-gray-2 pt-2">
      <div className="text-rose-400 flex justify-center items-center">
        <Heading title={`${Math.floor(diffDays)} days remaining`}/>
      </div>
      {createButton}

      <div className="divider my-0" />
      <div className="dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4">
        <label
          className="whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4"
          tabIndex={0}
        >
          <div className="flex flex-row gap-4 p-4">
            <div className="avatar avatar-md">
              <Image
                alt="avatar"
                width={30}
                height={30}
                src={currentUser?.image || "/images/placeholder.jpg"}
              />
            </div>
            <div className="flex flex-col">
              <div>{currentUser?.name}</div>
              <div className="text-xs font-normal text-content2">
                {currentUser?.email}
              </div>
            </div>
          </div>
        </label>
        <div className="dropdown-menu dropdown-menu-right-top ml-2">
          <div 
            tabIndex={-1}
            className="dropdown-item text-sm"
            onClick={()=> router.push('/profile')}>
            Profile
            </div>
          <div
            tabIndex={-1}
            className="dropdown-item text-sm"
            onClick={()=> router.push('/projects')}
          >
            My Projects
          </div>
          <div
            tabIndex={-1}
            className="dropdown-item text-sm"
            onClick={() => signOut()}
          >
            Logout
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
