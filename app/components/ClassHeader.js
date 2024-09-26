import Link from 'next/link'
import React from 'react'

export default function ClassHeader() {
    return (
        <div class="border-black border bg-gradient-to-r from-green-800 to-secondary overflow-hidden">
            <div class="group h-40 sm:h-60 overflow-hidden relative border-b border-black"> </div>

            <div class="flex flex-col sm:lsdfdfsdafd items-center sm:gap-4 mb-2">
                <div class="relative flex sm:inline-flex flex-col gap-1.5  items-center sm:items-start sm:ms-12 -mt-6">
                    <a class="group" href="javascript:;">
                        <div className='rounded-full size-24 flex justify-center items-center bg-primary text-white text-4xl border-solid border-black border -mt-3'>3H</div>
                    </a>
                    <h3 className="font-semibold [text-shadow:2px_2px_4px_var(--tw-shadow-color)] shadow-lime-500 text-white sm:text-xl sm:raiytahskcn sm:-end-28 sm:-top-3">
                        BSIT - 3H</h3>
                </div>

                <div class="flex sm:inline-flex items-center justify-center">
                    <Link href={'/instructor/classes/1'} className="flex items-center py-2 px-3 gap-1.5 font-medium hover:text-secondary text-white">
                        <i class="bi bi-collection-fill max-md:text-2xl"></i>
                        <span class="hidden md:block">Class</span>
                    </Link>
                    <Link href={'/instructor/classes/1/students'} className="flex items-center py-2 px-3 gap-1.5 font-medium hover:text-secondary text-white">
                        <i className="bi bi-people-fill max-md:text-2xl"></i>
                        <span className="hidden md:block">Students</span>
                    </Link>
                    <Link href={'/instructor/classes/1/calendar'} className="flex items-center py-2 px-3 gap-1.5 font-medium hover:text-secondary text-white">
                        <i className="bi bi-calendar-fill max-md:text-2xl"></i>
                        <span className="hidden md:block">Calendar</span>
                    </Link>
                    <Link href={'/instructor/classes/1'} className="flex items-center py-2 px-3 gap-1.5 font-medium hover:text-secondary text-white">
                        <i class="bi bi-1-circle-fill max-md:text-2xl"></i>
                        <span className="hidden md:block">Student Grades</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
