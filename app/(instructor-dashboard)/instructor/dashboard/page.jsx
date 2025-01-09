"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import smartPeopleIllustration from "../../../../public/smart-people-illustration.png";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import jsCookie from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";

export default function InstructorDashboardPage() {
    const defaultClassNames = getDefaultClassNames();
    const [selected, setSelected] = useState('');
    const [classSchedules, setClassSchedules] = useState([]);

    const fetchInstructorSchedules = async (session) => {
        try {
            const response = await axios.get(`https://my-cdm.godesqsites.com/api/instructors/${session.user.id}/class-schedules`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${session.token}`,
                },
            });

            if (response.data.class_schedules.length > 0) {
                let classSchedulesData = response.data.class_schedules.map((schedule) => ({
                    class: "bg-primary py-2 text-white",
                    title: schedule.class.title,
                    daysOfWeek: schedule.days_of_week,
                    startTime: schedule.start_time,
                    endTime: schedule.end_time,
                }));

                setClassSchedules(classSchedulesData);
            }
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    };

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        fetchInstructorSchedules(session);
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-4 lg:gap-6 mb-6">
            <div className="xl:w-[70%] lg:w-[60%] w-[100%] h-full flex flex-col gap-6">
                <div className="w-full xl:h-[350px] overflow-hidden bg-white border border-black py-8 px-5 hover-shadow rounded">
                    <div className="flex justify-between items-start">
                        <Image src={smartPeopleIllustration} className="w-[50%] hidden xl:block" />
                        <div className="xl:w-[40%] w-full">
                            <h5 className="font-medium">Good Day,</h5>
                            <h2 className="text-3xl font-bold">James Garnfil</h2>
                            <p className="my-2 mb-8">Welcome, Instructor! Your dashboard is ready to help you manage classes, track student progress, and create an engaging learning experience.</p>
                            <Link href={'/instructor/schedules'} className="btn btn-primary rounded-full py-3 text-sm px-4 mt-5">
                                View All Schedule <i className="bi bi-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-start items-start gap-3">
                    {/* <div className="border border-black bg-white rounded py-3 hover-shadow w-[70%]">
                        <Chart type="bar" options={option} series={series} height={300} width={"100%"} />
                    </div> */}
                    <div className="w-full lg:w-[30%] flex flex-col  gap-3">
                        <div className="w-full bg-white py-4 px-3 hover-shadow border border-black rounded">
                            <div className="flex justify-center items-center gap-4">
                                <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                                    <i className="bi bi-people-fill"></i>
                                </button>
                                <div className="md:text-start text-center">
                                    <h5 className="text-xl font-bold">25</h5>
                                    <h6 className="text-muted text-sm">Total Class</h6>
                                </div>
                            </div>
                        </div>

                        <Link href={`/instructor/create-class`} className="font-bold text-center text-xl p-8 rounded-lg shadow bg-primary text-white border border-black hover-shadow">
                            Add Class <i className="bi bi-plus-lg"></i>
                        </Link>
                    </div>
                    <div className="bg-white w-full lg:w-[70%] hover-shadow border-black rounded border hover:-translate-x-0.5 duration-300 p-6 flex flex-col gap-3">
                        <h4 className="font-medium text-xl">Class Schedule</h4>
                        <div className="flex flex-col gap-3">
                            {classSchedules.length > 0 ? (
                                classSchedules.map((schedule, index) => (
                                    <div key={index} className="today [&amp;.today_.icon-today]:block [&amp;.today_.text-today]:text-primary relative flex flex-start gap-3">
                                        <div className="flex flex-col gap-1.5">
                                            <h4 className="text-sm font-medium">{schedule.title}</h4>
                                            <div className="text-xs">
                                                <i className="bi bi-clock me-1"></i>
                                                {schedule.startTime} - {schedule.endTime}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    No Schedules Found
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:w-[30%] lg:w-[40%] w-[100%] h-full flex flex-col gap-3">
                <div className="bg-white hover-shadow flex justify-center border border-black rounded w-full">
                    <DayPicker
                        today={new Date()}
                        selected={selected}
                        classNames={{
                            today: `border-amber-500 bg-primary text-white`, // Add a border to today's date
                            selected: `bg-primary border-amber-500 text-white`, // Highlight the selected day
                            root: `${defaultClassNames.root} w-full p-5`, // Full width for root element
                            chevron: `fill-primary`, // Change the color of the chevron
                            day: "border border-black py-2 text-center", // Ensure each day takes full width
                            months: "rounded w-full", // Full width for months container
                            month_grid: "w-full",
                        }}
                        styles-={{
                            head_cell: {
                                width: "10px !important",
                            },
                            table: {
                                maxWidth: "none",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
