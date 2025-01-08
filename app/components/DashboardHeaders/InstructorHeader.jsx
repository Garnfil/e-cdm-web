"use client"

import React from 'react'
import cdmLogo from '../../../public/cdm-logo.webp';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import jsCookie from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function InstructorHeader({ toggleSidebar }) {
    const router = useRouter();

    const handleLogout = () => {
        jsCookie.remove('session');
        router.push('/instructor-login');
    }

    const handleNavigateToProfile = () => {
        router.push('/instructor/profile');
    }

    return (
        <header className='fixed z-10 top-0 inset-x-0 lg:ms-64 py-3 px-4 lg:px-6 bg-neutral-100 flex justify-between items-center border-b border-black'>
            <div className='flex items-center gap-3'>
                <div class="flex items-center gap-3">
                    <button
                        onClick={toggleSidebar}
                        className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-neutral-600 border border-black hover:shadow-[2px_2px_0_0_#000000] hover:-translate-y-[2px] focus:shadow-[2px_2px_0_0_#000000] focus:-translate-y-[2px]"
                    >
                        <i className="bi bi-list text-black dark:text-white"></i>
                    </button>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <div className='relative'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className=' sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow'>
                            <Image src={cdmLogo} className="w-10 h-10 flex-none rounded-full bg-white pointer-events-none" alt='cdm-logo' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent aria-label="Static Actions" className="bg-white">
                            {/* <DropdownMenuItem key="profile" className="cursor-pointer" onClick={handleNavigateToProfile}>Profile</DropdownMenuItem> */}
                            <DropdownMenuItem key="logout" className="text-danger cursor-pointer" color="danger" onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </header >
    )
}
