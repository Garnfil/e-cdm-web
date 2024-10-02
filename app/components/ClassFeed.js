"use client"
import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';

export default function ClassFeed() {
    const [isShowDropdown, setIsShowDropdown] = useState(false);

    return (
        <div className=' text-base max-h-[70vh] overflow-auto class-stream-container'>
            <div className='flex justify-between items-center gap-3 px-6 py-3 bg-white border border-black'>
                <h2 className='text-2xl font-semibold'>Stream</h2>
                <div className='relative'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='btn btn-primary'>Create <i className='bi bi-plus-lg'></i></DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-primary text-white">
                            <DropdownMenuLabel>School Works</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white" />
                            <DropdownMenuItem>
                                <Link href={'/instructor/classes/1/modules/create'}>
                                    Modules
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={'/instructor/classes/1/assignments/create'}>
                                    Assignment
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={'/instructor/classes/1/quizzes/create'}>
                                    Quiz
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={'/instructor/classes/1/activities/create'}>
                                    Activity
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={'/instructor/classes/1/exams/create'}>
                                    Exam
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* <button className='btn btn-primary hover-shadow'>Create <i class="bi bi-plus-lg"></i></button> */}
                </div>
            </div>
            <div className='relative w-full mt-4 overflow-y-auto flex flex-col gap-3'>
                <Link href={'/instructor/classes/1/assignments/view/1'}>
                    <div className='bg-white border border-black hover-shadow'>
                        <div className='py-3 px-4 border-b border-black flex justify-between items-center'>
                            <h3 className='text-lg font-semibold mb-2'>Assignment #1</h3>
                            <div className='py-1 px-2 text-xs font-bold bg-secondary flex items-center'>
                                Assignment
                            </div>
                        </div>
                        <div className='py-3 px-4'>
                            <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis velit consectetur, iaculis magna ac, tristique sem.
                                Donec congue justo sed enim suscipit, ac aliquet tellus rhoncus. Duis erat sapien, semper a libero nec, convallis malesuada purus.</p>
                        </div>
                    </div>
                </Link>
                <div className='bg-white border border-black hover-shadow'>
                    <div className='py-3 px-4 border-b border-black flex justify-between items-center'>
                        <h3 className='text-lg font-semibold mb-2'>Quiz #1</h3>
                        <div className='py-1 px-2 text-xs font-bold bg-secondary flex items-center'>
                            Quiz
                        </div>
                    </div>
                    <div className='py-3 px-4'>
                        <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis velit consectetur, iaculis magna ac, tristique sem.
                            Donec congue justo sed enim suscipit, ac aliquet tellus rhoncus. Duis erat sapien, semper a libero nec, convallis malesuada purus.</p>
                    </div>
                </div>
                <div className='bg-white border border-black hover-shadow'>
                    <div className='py-3 px-4 border-b border-black flex justify-between items-center'>
                        <h3 className='text-lg font-semibold mb-2'>Exam #1</h3>
                        <div className='py-1 px-2 text-xs font-bold bg-secondary flex items-center'>
                            Exam
                        </div>
                    </div>
                    <div className='py-3 px-4'>
                        <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis velit consectetur, iaculis magna ac, tristique sem.
                            Donec congue justo sed enim suscipit, ac aliquet tellus rhoncus. Duis erat sapien, semper a libero nec, convallis malesuada purus.</p>
                    </div>
                </div>
            </div>
        </div >
    )
}
