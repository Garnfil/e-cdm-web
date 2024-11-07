"use client"

import React, { useEffect, useState } from 'react'

export default function ChildrenPage() {
    const [currentStudentTab, setCurrentStudentTab] = useState('profile');
    const [currentStudent, setCurrentStudent] = useState({});

    useEffect(() => {


    }, []);

    return (
        <div className='container-fluid w-full'>
            <div className="flex justify-between flex-col xl:flex-row items-start gap-3 w-full">
                <div className="xl:w-[30%] w-full border border-black rounded">
                    <div className='children-sidebar p-4 '>
                        <h2 className='text-2xl'>Children</h2>
                        <div class="flex flex-col mt-3">
                            <div class="py-1.5 px-2 rounded border border-black flex items-center justify-between gap-3 hover:bg-green-50 cursor-pointer">
                                <div class="flex items-center gap-2">
                                    <img src="../src/img/game/app1.jpg" alt="app image" class="size-10 rounded-lg" />
                                    <div class="flex flex-col">
                                        <h4 class="text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden w-36 sm:w-60 xl:w-36">
                                            James Garnfil</h4>
                                        <span class="text-xs">BSIT - 4H</span>
                                    </div>
                                </div>
                            </div>
                            <div class="py-1.5 px-2 rounded  flex items-center justify-between gap-3 hover:bg-green-50 cursor-pointer">
                                <div class="flex items-center gap-2">
                                    <img src="../src/img/game/app2.jpg" alt="app image" class="size-10 rounded-lg" />
                                    <div class="flex flex-col">
                                        <h4 class="text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden w-36 sm:w-60 xl:w-36">
                                            Steve Mathew</h4>
                                        <span class="text-xs">BSED - 1E</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:w-[70%] w-full">
                    <div class="border-black rounded-lg border bg-gradient-to-r from-green-800 to-secondary overflow-hidden">
                        <div class="group h-40 sm:h-60 overflow-hidden relative border-b border-black"></div>
                        <div class="flex flex-col sm:flex-row items-center sm:gap-4 mb-2">
                            <div class="relative flex sm:inline-flex flex-col gap-1.5  items-center sm:items-start sm:ms-12 -mt-6">
                                <a class="group" href="javascript:;">
                                    <img src="../src/img/avatar/male3.jpg" class="rounded-full size-24 bg-neutral-400 border-solid border-black border -mt-3" />
                                </a>
                                <h3 class="font-semibold [text-shadow:2px_2px_4px_var(--tw-shadow-color)] shadow-lime-200 dark:shadow-lime-700 sm:text-xl sm:raiytahskcn sm:-end-28 sm:-top-3">
                                    Ari Budin</h3>
                            </div>

                            <div class="flex sm:inline-flex items-center justify-center">
                                <a href="#" class={`active ${currentStudentTab == 'profile' ? 'text-secondary' : 'text-white'} flex items-center py-2 px-3 gap-1.5 font-medium hover:text-secondary`} onClick={(e) => setCurrentStudentTab('profile')}>
                                    <i class="bi bi-person-fill max-md:text-2xl"></i>
                                    <span class="hidden md:block">Profile</span>
                                </a>
                                {/* <a href="message.html" class="text-white flex items-center py-2 px-3 gap-1.5 font-medium hover:text-secondary">
                                    <i class="bi bi-envelope-fill max-md:text-2xl"></i>
                                    <span class="hidden md:block">School Works</span>
                                </a> */}
                                <a href="#" class={`active ${currentStudentTab == 'grades' ? 'text-secondary' : 'text-white'} flex items-center py-2 px-3 gap-1.5 font-medium hover:text-secondary`} onClick={(e) => setCurrentStudentTab('grades')}>
                                    <i class="bi bi-1-square-fill max-md:text-2xl"></i>
                                    <span class="hidden md:block">Grades</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Profile Tab */}
                    <div class={`${currentStudentTab == 'profile' ? 'block' : 'hidden'} border-black rounded-lg border py-8 px-6 text-base bg-white min-h-[50vh] mt-4`}>
                        <div class="flex flex-col gap-8">
                            <div class="relative">
                                <h2 class="text-lg font-semibold mb-3">Personal Information</h2>
                                <div class="w-full overflow-y-auto">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th scope="row" class="text-start py-2">Full Name :</th>
                                                <td class="text-neutral-500 dark:text-neutral-400 ps-6 py-2">Ari Budin</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" class="text-start py-2">Student ID :</th>
                                                <td class="text-neutral-500 dark:text-neutral-400 ps-6 py-2">(123) 234 567 890</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" class="text-start py-2">Email :</th>
                                                <td class="text-neutral-500 dark:text-neutral-400 ps-6 py-2">mail_aribudin@mail.com</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" class="text-start py-2">Year Level & Section :</th>
                                                <td class="text-neutral-500 dark:text-neutral-400 ps-6 py-2">United States</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" class="text-start py-2">Institute :</th>
                                                <td class="text-neutral-500 dark:text-neutral-400 ps-6 py-2">United States</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" class="text-start py-2">Course :</th>
                                                <td class="text-neutral-500 dark:text-neutral-400 ps-6 py-2">United States</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* <div class="relative">
                                <h2 class="text-lg font-semibold mb-3">Social Media</h2>
                                <ul class="flex flex-wrap pdskdmsdnjw gap-4">

                                    <li class="inline-block">
                                        <a target="_blank" rel="noopener noreferrer" href="#" title="Facebook">
                                            <i class="bi bi-facebook text-2xl"></i>
                                        </a>
                                    </li>
                                    <li class="inline-block">
                                        <a target="_blank" rel="noopener noreferrer" href="#" title="Twitter">
                                            <i class="bi bi-twitter-x text-2xl"></i>
                                        </a>
                                    </li>
                                    <li class="inline-block">
                                        <a target="_blank" rel="noopener noreferrer" href="#" title="Tiktok">
                                            <i class="bi bi-tiktok text-2xl"></i>
                                        </a>
                                    </li>
                                    <li class="inline-block">
                                        <a target="_blank" rel="noopener noreferrer" href="#" title="Youtube">
                                            <i class="bi bi-youtube text-2xl"></i>
                                        </a>
                                    </li>
                                    <li class="inline-block">
                                        <a target="_blank" rel="noopener noreferrer" href="#" title="Instagram">
                                            <i class="bi bi-instagram text-2xl"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </div>

                    {/* Grades Tab */}
                    <div className={`${currentStudentTab == 'grades' ? 'block' : 'hidden'} border border-black rounded-lg py-8 px-6 bg-white mt-4 overflow-auto`}>

                        <div className="btn btn-primary my-3">Prelim Grade</div>

                        <table class="min-w-full divide-y divide-black border border-black bg-white text-wrap">
                            <thead class="bg-neutral-200 dark:bg-neutral-700">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-black uppercase ">
                                        Class Name
                                    </th>
                                    <th>Final Grade</th>
                                </tr>
                            </thead>

                            <tbody class="text-sm text-wrap">
                                <tr class="*:px-6 *:py-4 *:whitespace-nowrap text-center">
                                    <td>
                                        <div class="text-start">4H - Capstone Project 1</div>
                                    </td>
                                    <td>
                                        <span class="text-neutral-500 dark:text-neutral-300 text-sm">0</span>
                                    </td>
                                </tr>
                                <tr class="*:px-6 *:py-4 *:whitespace-nowrap text-center">
                                    <td>
                                        <div class="text-start">4H - Second Subject</div>
                                    </td>
                                    <td>
                                        <span class="text-neutral-500 dark:text-neutral-300 text-sm">0</span>
                                    </td>
                                </tr>
                                <tr class="*:px-6 *:py-4 *:whitespace-nowrap text-center">
                                    <td>
                                        <div class="text-start">4H - Third Subject</div>
                                    </td>
                                    <td>
                                        <span class="text-neutral-500 dark:text-neutral-300 text-sm">0</span>
                                    </td>
                                </tr>
                                <tr class="*:px-6 *:py-4 *:whitespace-nowrap text-center">
                                    <td>
                                        <div class="text-start">4H - Fourth Subject</div>
                                    </td>
                                    <td>
                                        <span class="text-neutral-500 dark:text-neutral-300 text-sm">0</span>
                                    </td>
                                </tr>
                                <tr class="*:px-6 *:py-4 *:whitespace-nowrap text-center">
                                    <td>
                                        <div class="text-start">4H - Fifth Subject</div>
                                    </td>
                                    <td>
                                        <span class="text-neutral-500 dark:text-neutral-300 text-sm">0</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}
