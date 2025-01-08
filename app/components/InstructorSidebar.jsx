"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import cdmLogo from '../../public/cdm-logo.webp';
import { usePathname } from 'next/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function InstructorSidebar({ isOpen, toggleSidebar }) {
    const pathName = usePathname();

    return (
        <>
            <aside className={`fixed justify-start items-center flex-col inset-y-0 start-0 sidebar gap-6 
            w-64 lg:min-w-64 h-screen overflow-auto scrollbars bg-neutral-100 border-e border-black 
            transition-all duration-500 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 max-lg:z-50 rtl:translate-x-full lg:rtl:translate-x-0`}>
                <div className='flex justify-center items-center flex-col gap-6'>
                    <div className='text-2xl font-black mx-7 flex justify-center items-center pt-4 gap-2'>
                        <Image src={cdmLogo} width={60} alt="cdm-logo" />
                        <h3 className='font-bold'>CDM</h3>
                    </div>

                    <ul className='flex flex-col gap-2 w-full px-4 instructor-sidebar-list'>
                        <li >
                            <Link href={'/instructor/dashboard'} className={pathName == "/instructor/dashboard" ? "active" : null}>
                                <span className="flex-grow"><i className="bi bi-house-door-fill mr-2"></i> Dashboard</span>
                            </Link>
                        </li>
                        <li >
                            <Link href={'/instructor/classes'} className={pathName == "/instructor/classes" ? "active" : null}>
                                <span className="flex-grow"><i className="bi bi-collection-fill mr-2"></i> Classes</span>
                            </Link>
                        </li>
                        <li >
                            <Link href={'/instructor/schedules'} className={pathName == "/instructor/schedules" ? "active" : null}>
                                <span className="flex-grow"><i className="bi bi-calendar-event-fill mr-2"></i> Schedules</span>
                            </Link>
                        </li>
                        <li >
                            <DropdownMenu>
                                <DropdownMenuTrigger className='w-full justify-start text-left'>
                                    <Link href={'#'} >
                                        <span className="flex-grow"><i className="bi bi-book-fill mr-2"></i> School Works</span>
                                    </Link>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white">
                                    <DropdownMenuItem className="py-2">
                                        <Link href={'/instructor/create-activity'} >
                                            <span className="flex-grow"><i className="bi bi-book-fill mr-3"></i> Upload Activity</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="py-2">
                                        <Link href={'/instructor/create-assignment'} >
                                            <span className="flex-grow"><i className="bi bi-book-fill mr-3"></i> Upload Assignment</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="py-2">
                                        <Link href={'/instructor/create-quiz'} >
                                            <span className="flex-grow"><i className="bi bi-book-fill mr-3"></i> Upload Quiz</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="py-2">
                                        <Link href={'/instructor/create-exam'} >
                                            <span className="flex-grow"><i className="bi bi-book-fill mr-3"></i> Upload Exam</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </li>
                        <li >
                            <Link href={'/instructor/live-conference-classes'} className={pathName == "/instructor/live-conference-classes" ? "active" : null}>
                                <span className="flex-grow"><i className="bi bi-camera-video-fill mr-2"></i> Live Class</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/instructor/whiteboard'} className={pathName == "/instructor/whiteboard" ? "active" : null}>
                                <span className="flex-grow"><i className="bi bi-clipboard-fill mr-2"></i> Whiteboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/discussion-forum'} className={pathName == "/instructor/discussion-forum" ? "active" : null}>
                                <span className="flex-grow"><i className="bi bi-people-fill mr-2"></i> Discussion Forum</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside >
            <div onClick={toggleSidebar} class={`backDialog z-20 overflow-auto fixed bg-neutral-900 bg-opacity-60 ${isOpen ? 'inset-0' : ''} show`}></div >
        </>
    )
}
