"use client"
import React, { useState } from 'react'

export default function ClassFeed() {
    const [isShowDropdown, setIsShowDropdown] = useState(false);

    return (
        <div className=' text-base max-h-[70vh] overflow-auto class-stream-container'>
            <div className='flex justify-between items-center gap-3 px-6 py-3 bg-white border-b border-black'>
                <h2 className='text-2xl font-semibold'>Stream</h2>
                <div className='relative'>
                    <button className='btn btn-primary hover-shadow'>Create <i class="bi bi-plus-lg"></i></button>
                    {/* <ul id="dropUser" class=" absolute max-sm:top-14 top-[3.1rem] z-30 end-auto start-0 min-w-[180px] inline-flex flex-col rounded-lg bg-white border border-black py-2 max-sm:start-4 max-sm:end-4">
                        <li class="relative">
                            <a href="#" class="flex flex-row items-center gap-3 py-2 px-6 hover:text-white hover:bg-black">
                                <i class="bi bi-person-fill"></i>
                                Profile
                            </a>
                        </li>
                        <li class="relative">
                            <a href="#" class="flex flex-row items-center gap-3 py-2 px-6 hover:text-white hover:bg-black">
                                <i class="bi bi-gear-fill"></i>
                                Settings
                            </a>
                        </li>
                        <li class="relative">
                            <a href="#" class="flex flex-row items-center gap-3 py-2 px-6 hover:text-white hover:bg-black">
                                <i class="bi bi-question-square-fill"></i>
                                Help
                            </a>
                        </li>
                        <li class="relative">
                            <a href="#" class="flex flex-row items-center gap-3 py-2 px-6 hover:text-white hover:bg-black">
                                <i class="bi bi-box-arrow-right"></i>
                                Logout
                            </a>
                        </li>
                    </ul> */}
                </div>
            </div>
            <div className='relative w-full mt-4 overflow-y-auto flex flex-col gap-3'>
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
