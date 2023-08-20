'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { SafeUser } from '@/app/types';
import { AiOutlineFolder } from 'react-icons/ai';
import { HiOutlineDocumentText } from 'react-icons/hi';

interface UserMenuProps {
    currentUser?: SafeUser | null;
}


const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    let menuContent = (
        <ul className='menu-items'>
        <li className='menu-item'>
            <AiOutlineFolder size={16} />
            <div>Projects</div>
        </li>
        <li className='menu-item'>
            <HiOutlineDocumentText size={16} />
            <div>Documents</div>
        </li>
    </ul>
    )

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
        <section className="sidebar-content h-fit min-h-[20rem] overflow-visible py-0">
            <div className='divider my-0' />
            <nav className="nav rounded-md my-5">
                <section className='menu-section px-4'>
                    {menuContent}
                </section>
            </nav>
        </section>
    );
}
 
export default UserMenu;