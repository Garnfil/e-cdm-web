"use client"

import React, { useEffect, useState } from 'react'
import Image from "next/image";
import cdmLogo from "../../public/cdm-logo.webp";
import userProfile from "../../public/user-profile.jpg";
import Link from "next/link";
import jsCookie from 'js-cookie';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function HomeNavbar() {

    const [authSession, setAuthSession] = useState({});
    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
    }, []);

    return (
        <nav className="nav-section h-24 max-width-container">
            <div className="w-full h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo Section */}
                    <div className="w-[15%] border-black flex justify-center items-center py-2 h-full box-border">
                        <Image src={cdmLogo} width={65} height={65} />
                    </div>

                    {/* Menu Section */}
                    <div className="w-[70%] border-black flex justify-center items-center py-2 h-full box-border">
                        <ul className="flex space-x-6">
                            <li className="">
                                <Link className='font-normal' href={'/'}>Home</Link>
                            </li>
                            <li>
                                <Link className='font-normal' href={'/school-calendar'}>School Calendar</Link>
                            </li>
                            <li>Institutes</li>
                            <li>
                                <Link className='font-normal' href={'/discussion-forum'}>Discussions</Link>
                            </li>
                        </ul>
                    </div>

                    {
                        Object.keys(authSession).length === 0 && authSession.constructor === Object ? (
                            < div className="xl:w-[30%] flex justify-center gap-2 items-center py-2 h-full box-border">
                                <Link href={'/instructor-login'} className="btn btn-primary">
                                    Instructor Login
                                </Link>
                                <Link href={'/student-login'} className="btn btn-secondary">
                                    Student Login
                                </Link>
                            </div>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger className='hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow'><Image src={userProfile} className="w-9 h-9 flex-none rounded-full bg-white pointer-events-none" alt="cdm-logo" /></DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white mt-2">
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem>Notifications</DropdownMenuItem>
                                    <DropdownMenuItem>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}
