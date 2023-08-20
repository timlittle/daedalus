'use client';

import Image from "next/image";

const Footer = () => {
    return (
        <section className='sidebar-footer h-full justify-end bg-gray-2 pt-2'>
            <div className='divider my-0' />
            <div className='dropdown z-50 flex h-fit w-full cursor-pointer hover:bg-gray-4'>
                <label className='whites mx-2 flex h-fit w-full cursor-pointer p-0 hover:bg-gray-4' tabIndex={0}>
                    <div className='flex flex-row gap-4 p-4'>
                        <div className='avatar avatar-md'>
                            <Image 
                                alt="avatar"
                                width={30}
                                height={30}
                                src="/images/placeholder.jpg" 
                            />
                        </div>
                        <div className='flex flex-col'>
                            <div>Username</div>
                            <div className='text-xs font-normal text-content2'>@user</div>
                        </div>
                    </div>
                </label>
                <div className='dropdown-menu dropdown-menu-right-top ml-2'>
                    <a className='dropdown-item text-sm'>Profile</a>
                    <label tabIndex={-1} className='dropdown-item text-sm' htmlFor="modal-1">My Projects</label>
                    <a tabIndex={-1} className='dropdown-item text-sm'>Logout</a>
                </div>
            </div>
        </section>
    );
}
 
export default Footer;