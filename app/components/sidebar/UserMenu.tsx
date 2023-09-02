'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { SafeUser } from '@/app/types';
import { Document, Project } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { AiOutlineFolder } from 'react-icons/ai';
import { HiOutlineDocumentText } from 'react-icons/hi';

interface UserMenuProps {
    currentUser?: SafeUser | null;
    projects?: Project[];
    documents?: Document[]
}


const UserMenu: React.FC<UserMenuProps> = ({
    currentUser,
    projects,
    documents
}) => {

    const router = useRouter();

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    let menuContent = (
        <ul className='menu-items'>
        <li className='menu-item' onClick={()=> router.push('/projects')}>
            <AiOutlineFolder size={16} />
            <div>My Projects</div>
        </li>
        <li className='menu-item' onClick={()=> router.push('/documents')}>
            <HiOutlineDocumentText size={16} />
            <div>My Documents</div>
        </li>
        <li className='menu-item' onClick={()=> router.push('/documents/shared')}>
            <HiOutlineDocumentText size={16} />
            <div>Shared documents</div>
        </li>
    </ul>
    )

    let pageContent;

    if (projects){
        pageContent = (
            <div className='menu-section overflow-scroll '>
                <div className='menu-tile'>Projects</div>
                <ul className='menu-items'>
                    {projects?.map((project)=>(
                        <li
                            className='menu-item'
                            onClick={()=> router.push(`/projects/${project.id}`)}
                            key={project.id}
                            >
                                <AiOutlineFolder size={16} />
                                <div>{project.title}</div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else if (documents) {
        pageContent = (
            <div className='menu-section overflow-scroll'>
                <div className='menu-tile'>Documents</div>
                <ul className='menu-items'>
                    {documents?.map((document)=>(
                        <li
                            className='menu-item'
                            onClick={()=> router.push(`/documents/${document.id}`)}
                            key={document.id}
                            >
                                <HiOutlineDocumentText size={16} />
                                <div>{document.title}</div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    if (!currentUser) {
        menuContent = (
            <ul className='menu-items'>
                <li className='menu-item' onClick={loginModal.onOpen}>
                    <div >Log in</div>
                </li>
                <li className='menu-item' onClick={registerModal.onOpen}>
                    <div >Register</div>
                </li>
            </ul>
        )
    }

    return (
        <section className="sidebar-content max-h-fit overflow-visible py-0">
            <div className='divider my-0' />
            <nav className="nav rounded-md my-2">
                <section className='menu-section px-4'>
                    {menuContent}
                    <div className='divider my-2' />
                    {pageContent}
                </section>
            </nav>
        </section>
    );
}
 
export default UserMenu;