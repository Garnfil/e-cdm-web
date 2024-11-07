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

export default function StudentHeader() {
    const router = useRouter();

    const handleLogout = () => {
        jsCookie.remove('session');
        router.push('/student-login');
    }

    return (
        <header className='fixed z-10 top-0 inset-x-0 lg:ms-64 py-3 px-4 lg:px-6 bg-neutral-100 flex justify-between items-center border-b border-black'>
            <div className='flex items-center gap-3'>
                <div className="flex flex-wrap items-stretch w-full relative">
                    <input type="text" className="flex-shrink flex-grow max-w-full leading-5 relative text-sm py-3 px-6 border border-black rounded focus:outline-none hover-shadow bg-white/60  focus:ring-0" placeholder="Search…" aria-label="Search" />
                    <div className="raiytahskcn top-1 end-0 -me-px">
                        <button className="flex items-center py-2 px-4 -ms-1 rtl:-me-1 rounded-r rtl:rounded-l leading-5 hover:ring-0 focus:outline-none focus:ring-0" type="button">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <div className='relative'>
                    <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                        <i className="bi bi-gear-fill"></i>
                    </button>
                </div>
                <div className='relative'>
                    <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                        <i className="bi bi-bell-fill"></i>
                    </button>
                </div>
                <div className='relative'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow'>
                            <Image src={cdmLogo} className="w-10 h-10 flex-none rounded-full bg-white pointer-events-none" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent aria-label="Static Actions" className="bg-white">
                            <DropdownMenuItem key="profile">Profile</DropdownMenuItem>
                            <DropdownMenuItem key="logout" className="text-danger cursor-pointer" color="danger" onClick={handleLogout}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </div>
        </header>
    )
}
