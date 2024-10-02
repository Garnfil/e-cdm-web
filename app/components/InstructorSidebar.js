import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import cdmLogo from '../../public/cdm-logo.webp';

export default function InstructorSidebar() {
    return (
        <aside className='fixed justify-start items-center flex-col inset-y-0 start-0 sidebar gap-6 w-64 lg:min-w-64 lg:[&.show]:min-w-[0px] h-screen overflow-auto scrollbars bg-neutral-100 border-e border-black transition-all duration-500 ease-in-out -translate-x-full lg:translate-x-0 [&.show]:translate-x-0 max-lg:z-50 rtl:translate-x-full lg:rtl:translate-x-0'>
            <div className='flex justify-center items-center flex-col gap-6'>
                <div className='text-2xl font-black mx-7 flex justify-center items-center pt-4 gap-2'>
                    <Image src={cdmLogo} width={60} />
                    <h3 className='font-bold'>CDM</h3>
                </div>

                <ul className='flex flex-col gap-2 w-full px-4 instructor-sidebar-list'>
                    <li>
                        <Link href={'/instructor/dashboard'}>
                            <span class="flex-grow"><i class="bi bi-house-door-fill mr-2"></i> Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/instructor/classes'}>
                            <span class="flex-grow"><i class="bi bi-collection-fill mr-2"></i> Classes</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/instructor/schedules'}>
                            <span class="flex-grow"><i class="bi bi-calendar-event-fill mr-2"></i> Schedules</span>
                        </Link>
                    </li>
                    {/* <li>
                        <Link href={'#'}>
                            <span class="flex-grow"><i class="bi bi-1-square-fill mr-2"></i> Grade Rubrics</span>
                        </Link>
                    </li> */}
                    <li>
                        <Link href={'/instructor/live-conference-classes'}>
                            <span class="flex-grow"><i class="bi bi-camera-video-fill mr-2"></i> Live Class</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/instructor/whiteboard'}>
                            <span class="flex-grow"><i class="bi bi-clipboard-fill mr-2"></i> Whiteboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/discussion-forum'}>
                            <span class="flex-grow"><i class="bi bi-people-fill mr-2"></i> Discussion Forum</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
