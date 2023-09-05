"use client";
import { GithubAuthZ } from "@prisma/client";
import Image from "next/image";
import EmptyState from "../components/EmptyState";
import Heading from "../components/Heading";
import { SafeUser } from "../types";

interface ProfileProps {
  currentUser: SafeUser | null;
  githubAuthZ: GithubAuthZ | null;
  githubAppName: string;
}

const ProfileClient: React.FC<ProfileProps> = ({ currentUser, githubAuthZ, githubAppName }) => {
  if (!currentUser) {
    return <EmptyState title="Error" subtitle="Unable to determine user" />;
  }

  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold flex justify-center sm:pt-14 py-4 border-b-[1px] border-b-gray-600">
        <Heading title="Profile" />
      </div>
      <div className="flex flex-col md:flex-row h-screen py-8">
        <div className="w-full items-center flex flex-col">
          <div className="avatar h-52 w-52">
            <Image alt="Avatar" height={360} width={360} src={currentUser.image || "/images/placeholder.jpg"} />
          </div>
        </div>
        <div></div>
        <div className="w-full flex flex-col gap-6 py-8 items-center md:items-start">
          <div className="text-2xl font-bold">Name:</div>
          <div className="font-light text-gray-400">{currentUser.name}</div>
          <div className="text-2xl font-bold">Email:</div>
          <div className="font-light text-gray-400">{currentUser.email}</div>
          <div className="w-full flex flex-col gap-2 py-8 items-center md:items-start">
            <div className="text-sm font-bold text-gray-400">Created at:</div>
            <div className="text-xs font-light text-gray-500">{currentUser.createdAt}</div>
            <div className="text-sm font-bold text-gray-400">Updated at:</div>
            <div className="text-xs font-light text-gray-500">{currentUser.updatedAt}</div>
          </div>
          <a className={`btn btn-primary ${githubAuthZ ? "hidden" : ""}`} href={`https://github.com/apps/${githubAppName}/installations/new`}>
            Connect to Github
          </a>
          {githubAuthZ && <div className="badge badge-lg">Github Connected</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
