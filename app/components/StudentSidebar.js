import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cdmLogo from '../../public/cdm-logo.webp';

export default function StudentSidebar({ isOpen, toggleSidebar }) {
    return (
        <>

            <aside className={`fixed justify-start items-center flex-col inset-y-0 start-0 sidebar gap-6 
            w-64 lg:min-w-64 h-screen overflow-auto scrollbars bg-neutral-100 border-e border-black 
            transition-all duration-500 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 max-lg:z-50 rtl:translate-x-full lg:rtl:translate-x-0`}>
                <div className='flex justify-center items-center flex-col gap-6'>
                    <div className='text-2xl font-black mx-7 flex justify-center items-center pt-4 gap-2'>
                        <Image src={cdmLogo} width={60} />
                        <h3 className='font-bold'>CDM</h3>
                    </div>

                    <ul className='flex flex-col gap-2 w-full px-4 instructor-sidebar-list'>
                        <li>
                            <Link href={'/student/dashboard'}>
                                <span className="flex-grow"><i className="bi bi-house-door-fill mr-2"></i> Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/student/live-sessions'}>
                                <span className="flex-grow"><i className="bi bi-camera-video-fill mr-2"></i> Live Sessions</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/student/schedules'}>
                                <span className="flex-grow"><i className="bi bi-calendar-event-fill mr-2"></i> Schedules</span>
                            </Link>
                        </li>

                        <li>
                            <Link href={'/student/whiteboard'}>
                                <span className="flex-grow"><i className="bi bi-clipboard-fill mr-2"></i> Whiteboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link href={'/discussion-forum'}>
                                <span className="flex-grow"><i className="bi bi-people-fill mr-2"></i> Discussion Forum</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
            <div onClick={toggleSidebar} class={`backDialog z-20 overflow-auto fixed bg-neutral-900 bg-opacity-60 ${isOpen ? 'inset-0' : ''} show`}></div >
        </>
    )
}
