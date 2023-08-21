'use client';

import { SafeUser } from "@/app/types";
import { PiDotsThreeOutlineVertical } from 'react-icons/pi'


interface ProjectCardProps {
    title: string;
    description: string;
    onAction: (id: string) => void;
    currentUser: SafeUser | null;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    onAction,
    currentUser
}) => {
    return (
        <div className="card col-span-1 cursor-pointer group">
            {/* <div className="flex flex-col gap-2 w-full"> */}
                <div className="card-body w-full relative overflow-hidden rounded-xl">
                    <div className="card-header" >
                        {title}
                    </div>
                    <div className="text-content-2" >
                        {description}
                    </div>
                    <div className="absolute bottom-3 right-3">
                        <div className="realative hover:opacity-80 transition cursor-pointer">
                            <PiDotsThreeOutlineVertical />
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    );
}
 
export default ProjectCard;