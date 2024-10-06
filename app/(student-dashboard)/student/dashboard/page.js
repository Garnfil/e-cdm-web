"use client"

import React, { useState } from 'react'
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import classTagIcon from "../../../../public/classroom-board.png";
import taskListIcon from "../../../../public/task-list.png";
import medalIcon from "../../../../public/medal.png";
import Image from 'next/image';
import Link from 'next/link';

export default function StudentDashboardPage() {
    const defaultClassNames = getDefaultClassNames();
    const [selected, setSelected] = useState(new Date());
    return (
        <div className='container-fluid'>
            <div className='grid grid-cols-3 gap-3'>
                <div className='col-span-2'>
                    <div className='grid grid-cols-3 gap-2'>
                        <div className='bg-white border border-black hover-shadow p-2 py-5'>
                            <div className='flex justify-start items-center gap-4'>
                                <Image src={classTagIcon} width={0} height={0} />
                                <div>
                                    <h3 className='text-3xl font-semibold'>25</h3>
                                    <h6 className='text-xs text-muted'>Total Enrolled Class</h6>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white border border-black hover-shadow p-2 py-5'>
                            <div className='flex justify-start items-center gap-4'>
                                <Image src={taskListIcon} width={64} height={64} />
                                <div>
                                    <h3 className='text-3xl font-semibold'>55</h3>
                                    <h6 className='text-xs text-muted'>Completed School Works</h6>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white border border-black hover-shadow p-2 py-5'>
                            <div className='flex justify-start items-center gap-4'>
                                <Image src={medalIcon} width={64} height={64} />
                                <div>
                                    <h3 className='text-3xl font-semibold'>15</h3>
                                    <h6 className='text-xs text-muted'>Total Earned Badges</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-4'>
                        <h3 className='text-xl font-bold'>Pending School Works</h3>
                        <table className='bg-white w-full mt-3 border border-black'>
                            <thead>
                                <tr>
                                    <th className='border border-black py-2'>Id</th>
                                    <th className='border border-black py-2'>Title</th>
                                    <th className='border border-black py-2'>Class</th>
                                    <th className='border border-black py-2'>Type</th>
                                    <th className='border border-black py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='border border-black py-3 px-2'>1</td>
                                    <td className='border border-black py-3 px-2'>Assignment Topic #1</td>
                                    <td className='border border-black py-3 px-2'>BSIT - 3H</td>
                                    <td className='border border-black py-3 px-2'>Assignment</td>
                                    <td className='border border-black py-3 px-2 text-center'>
                                        <button className='btn btn-primary px-2 py-1'><i className="bi bi-eye"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border border-black py-3 px-2'>1</td>
                                    <td className='border border-black py-3 px-2'>Assignment Topic #1</td>
                                    <td className='border border-black py-3 px-2'>BSIT - 3H</td>
                                    <td className='border border-black py-3 px-2'>Assignment</td>
                                    <td className='border border-black py-3 px-2 text-center'>
                                        <button className='btn btn-primary px-2 py-1'><i className="bi bi-eye"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border border-black py-3 px-2'>1</td>
                                    <td className='border border-black py-3 px-2'>Assignment Topic #1</td>
                                    <td className='border border-black py-3 px-2'>BSIT - 3H</td>
                                    <td className='border border-black py-3 px-2'>Assignment</td>
                                    <td className='border border-black py-3 px-2 text-center'>
                                        <button className='btn btn-primary px-2 py-1'><i className="bi bi-eye"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='border border-black py-3 px-2'>1</td>
                                    <td className='border border-black py-3 px-2'>Assignment Topic #1</td>
                                    <td className='border border-black py-3 px-2'>BSIT - 3H</td>
                                    <td className='border border-black py-3 px-2'>Assignment</td>
                                    <td className='border border-black py-3 px-2 text-center'>
                                        <button className='btn btn-primary px-2 py-1'><i className="bi bi-eye"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className='col-span-1'>
                    <div className='border border-black bg-white mb-3 hover-shadow'>
                        <DayPicker
                            today={new Date()}
                            selected={selected}
                            classNames={{
                                today: `border-amber-500 bg-primary text-white`, // Add a border to today's date
                                selected: `bg-primary border-amber-500 text-white`, // Highlight the selected day
                                root: `${defaultClassNames.root} w-full p-5`, // Full width for root element
                                chevron: `fill-primary`, // Change the color of the chevron
                                day: 'border border-black py-2 text-center', // Ensure each day takes full width
                                months: 'rounded w-full', // Full width for months container
                                month_grid: 'w-full',
                            }}
                            styles-={{
                                head_cell: {
                                    width: "10px !important",
                                },
                                table: {
                                    maxWidth: "none",
                                }
                            }}
                        />
                    </div>
                    <div className='bg-white border border-black hover-shadow'>
                        <div className='flex justify-between items-center p-3 border border-b-black'>
                            <h2 className='font-bold text-xl'>Upcoming Events</h2>
                            <Link className='text-primary text-sm' href={'/school-calendar'}>Calendar</Link>
                        </div>
                        <div className='event-list'>
                            {/* Event */}
                            <div className='border border-b-black p-3'>
                                <div className='flex justify-start items-start gap-3'>
                                    <div className='bg-secondary w-[50px] h-[50px] flex justify-center items-center border border-black'>
                                        <i className="bi bi-calendar-event text-xl"></i>
                                    </div>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <h3 className='font-semibold text-md'>Event One Institute</h3>
                                        <div className='text-xs flex justify-between items-start w-full'>
                                            <div className='time'>
                                                <span className='pr-2'><i className="bi bi-clock"></i></span>
                                                <span>4:00 P.M</span> - <span>5:00 P.M</span>
                                            </div>
                                            <div className='time'>
                                                <span className='pr-2'><i className="bi bi-calendar"></i></span>
                                                <span>Aug. 20, 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Event */}
                            <div className='border border-b-black p-3'>
                                <div className='flex justify-start items-start gap-3'>
                                    <div className='bg-secondary w-[50px] h-[50px] flex justify-center items-center border border-black'>
                                        <i className="bi bi-calendar-event text-xl"></i>
                                    </div>
                                    <div className='flex flex-col gap-1 w-full'>
                                        <h3 className='font-semibold text-md'>Event Two Institute</h3>
                                        <div className='text-xs flex justify-between items-start w-full'>
                                            <div className='time'>
                                                <span className='pr-2'><i className="bi bi-clock"></i></span>
                                                <span>8:00 A.M</span> - <span>11:00 A.M</span>
                                            </div>
                                            <div className='time'>
                                                <span className='pr-2'><i className="bi bi-calendar"></i></span>
                                                <span>Aug. 22, 2024</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
