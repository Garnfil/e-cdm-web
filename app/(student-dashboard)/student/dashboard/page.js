"use client"

import React, { useEffect, useState } from 'react'
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import classTagIcon from "../../../../public/classroom-board.png";
import taskListIcon from "../../../../public/task-list.png";
import medalIcon from "../../../../public/medal.png";
import Image from 'next/image';
import Link from 'next/link';
import jsCookie from "js-cookie";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function StudentDashboardPage() {


    const fetchPendingSchoolWorks = async (session) => {
        try {
            const response = await axios.get(`http://192.168.100.110:8000/api/students/${session?.user?.id}/classes/${null}/school-works/todos`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${session?.token}`
                }
            });

            console.log(response.data);
        } catch (error) {
            console.log(error);
            toast.error(error.message ?? "Server Error");
        }
    }

    const fetchTotalEnrolledClassAndCompletedWorks = async (session) => {

    }

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        fetchPendingSchoolWorks(session);
        fetchTotalEnrolledClassAndCompletedWorks(session);
    }, [])

    const defaultClassNames = getDefaultClassNames();
    const [selected, setSelected] = useState(new Date());
    return (
        <div className="container mx-auto px-4 lg:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Section */}
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white border border-black hover-shadow p-4">
                            <div className="flex items-center gap-4">
                                <Image src={classTagIcon} width={64} height={64} alt="image" />
                                <div>
                                    <h3 className="text-3xl font-semibold">25</h3>
                                    <h6 className="text-sm text-gray-500">Total Enrolled Class</h6>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white border border-black hover-shadow p-4">
                            <div className="flex items-center gap-4">
                                <Image src={taskListIcon} width={64} height={64} alt="image" />
                                <div>
                                    <h3 className="text-3xl font-semibold">55</h3>
                                    <h6 className="text-sm text-gray-500">Completed School Works</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-xl font-bold">Pending School Works</h3>
                        <div className="overflow-x-auto mt-3">
                            <table className="bg-white w-full border border-black">
                                <thead>
                                    <tr>
                                        <th className="border border-black py-2">Id</th>
                                        <th className="border border-black py-2">Title</th>
                                        <th className="border border-black py-2">Class</th>
                                        <th className="border border-black py-2">Type</th>
                                        <th className="border border-black py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-black py-3 px-2">1</td>
                                        <td className="border border-black py-3 px-2">Assignment Topic #1</td>
                                        <td className="border border-black py-3 px-2">BSIT - 3H</td>
                                        <td className="border border-black py-3 px-2">Assignment</td>
                                        <td className="border border-black py-3 px-2 text-center">
                                            <button className="btn btn-primary px-2 py-1">
                                                <i className="bi bi-eye"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

                {/* Right Section */}
                <div>
                    <div className="border border-black bg-white mb-6 hover-shadow">
                        <DayPicker
                            today={new Date()}
                            selected={selected}
                            classNames={{
                                today: `border-amber-500 bg-primary text-white`,
                                selected: `bg-primary border-amber-500 text-white`,
                                root: `w-full p-5`,
                                chevron: `fill-primary`,
                                day: "border border-black py-2 text-center",
                                months: "rounded w-full",
                                month_grid: "w-full",
                            }}
                        />
                    </div>
                    <div className="bg-white border border-black hover-shadow">
                        <div className="flex justify-between items-center p-4 border-b border-black">
                            <h2 className="font-bold text-xl">Upcoming Events</h2>
                            <Link className="text-primary text-sm" href="/school-calendar">
                                Calendar
                            </Link>
                        </div>
                        <div className="event-list">
                            <div className="border-b border-black p-4 flex gap-4">
                                <div className="bg-secondary w-14 h-14 flex items-center justify-center border border-black">
                                    <i className="bi bi-calendar-event text-xl"></i>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-lg">Event One Institute</h3>
                                    <div className="text-xs flex justify-between items-center">
                                        <span>
                                            <i className="bi bi-clock"></i> 4:00 P.M - 5:00 P.M
                                        </span>
                                        <span>
                                            <i className="bi bi-calendar"></i> Nov. 20, 2024
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-black p-4 flex gap-4">
                                <div className="bg-secondary w-14 h-14 flex items-center justify-center border border-black">
                                    <i className="bi bi-calendar-event text-xl"></i>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-lg">Event Two Institute</h3>
                                    <div className="text-xs flex justify-between items-center">
                                        <span>
                                            <i className="bi bi-clock"></i> 8:00 A.M - 11:00 A.M
                                        </span>
                                        <span>
                                            <i className="bi bi-calendar"></i> Aug. 22, 2024
                                        </span>
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
