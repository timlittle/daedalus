'use client';

import useLoginModal from '@/app/hooks/useLoginModal';
import { AiOutlineFolder } from 'react-icons/ai'
import { HiOutlineDocumentText } from 'react-icons/hi'

const UserMenu = () => {

    const loginModal = useLoginModal();

    return (
        <section className="sidebar-content h-fit min-h-[20rem] overflow-visible">
            <nav className="nav rounded-md">
            <section className='menu-section px-4'>
                    <ul className='menu-items'>
                        <li className='menu-item' onClick={loginModal.onOpen}>
                            <div >Log in</div>
                        </li>
                        {/* <li className='menu-item'>
                            <AiOutlineFolder size={16} />
                            <div>Projects</div>
                        </li>
                        <li className='menu-item'>
                            <HiOutlineDocumentText size={16} />
                            <div>Documents</div>
                        </li> */}
                    </ul>
                </section>
            </nav>
        </section>
    );
}
 
export default UserMenu;