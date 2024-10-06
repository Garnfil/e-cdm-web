'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import smartPeopleIllustration from '../../../../public/smart-people-illustration.png';
import Chart from "react-apexcharts";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";


export default function InstructorDashboard() {
    const defaultClassNames = getDefaultClassNames();
    const [selected, setSelected] = useState(new Date());

    const option = {
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        },
        colors: ['#0b4d10'],
        dataLabels: {
            style: {
                colors: ['#fff']
            }
        },
        markers: {
            colors: ['#fff']
        }
    }

    const series = [{
        name: 'series-1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }]
    return (
        <div className='flex gap-4 lg:gap-6 mb-6'>
            <div className='w-[70%] h-full flex flex-col gap-6'>
                <div className='w-full xl:h-[350px] overflow-hidden bg-white border border-black py-8 px-5 hover-shadow rounded'>
                    <div className='flex justify-between items-start'>
                        <Image src={smartPeopleIllustration} className='w-[50%]' />
                        <div className='w-[40%]'>
                            <h5 className='font-medium'>Good Day,</h5>
                            <h2 className='text-3xl font-bold'>James Garnfil</h2>
                            <p className='my-2'>Welcome, Instructor! Your dashboard is ready to help you manage classes, track student progress, and create an engaging learning experience.</p>
                            <button className='btn btn-primary rounded-full py-3 text-sm px-4 mt-5'>View All Schedule <i className="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-start gap-3'>
                    <div className='border border-black bg-white rounded py-3 hover-shadow w-[70%]'>
                        <Chart type="bar" options={option} series={series} height={300} width={'100%'} />
                    </div>
                    <div className='w-[30%] flex flex-col gap-3'>
                        <div className='w-full bg-white py-4 px-3 hover-shadow border border-black rounded'>
                            <div className='flex justify-center items-center gap-4'>
                                <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                                    <i className="bi bi-people-fill"></i>
                                </button>
                                <div className='text-start'>
                                    <h5 className='text-xl font-bold'>250</h5>
                                    <h6 className='text-muted text-sm'>Total Students</h6>
                                </div>
                            </div>
                        </div>
                        <div className='w-full bg-white py-4 px-3 hover-shadow border border-black rounded'>
                            <div className='flex justify-center items-center gap-4'>
                                <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white border border-black hover-shadow">
                                    <i className="bi bi-people-fill"></i>
                                </button>
                                <div className='text-start'>
                                    <h5 className='text-xl font-bold'>20</h5>
                                    <h6 className='text-muted text-sm'>Total Class</h6>
                                </div>
                            </div>
                        </div>
                        <button className='font-bold text-xl p-8 rounded-lg shadow bg-primary text-white border border-black hover-shadow'>
                            Add Class <i className="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-[30%] h-full flex flex-col gap-3'>
                <div className='bg-white hover-shadow flex justify-center border border-black rounded w-full'>
                    <DayPicker
                        today={new Date()}
                        selected={selected}
                        classNames={{
                            today: `border-amber-500`, // Add a border to today's date
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

                <div className='bg-white hover-shadow border-black rounded border hover:-translate-x-0.5 duration-300 p-6 flex flex-col gap-3'>
                    <h4 className="font-medium">Class Schedule</h4>
                    <div className='flex flex-col gap-3'>
                        <div className="today [&amp;.today_.icon-today]:block [&amp;.today_.text-today]:text-primary dark:[&amp;.today_.text-today]:text-primary relative flex flex-start gap-3">
                            <div>
                                <div className="py-2 w-12 bg-primary border border-black text-white rounded flex flex-col items-center gap-0.5 text-today">
                                    <span className="text-sm">May</span>
                                    <span className="text-xl font-bold leading-none">15</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="text-sm font-medium">Class in BSIT-4D</h4>
                                <div className="text-xs"><i className="bi bi-clock me-1"></i>14:30 PM - 15:00 PM</div>
                                <div className="text-xs text-neutral-500"><i className="bi bi-camera-video me-1"></i>
                                    Video Conference</div>
                            </div>
                        </div>
                        <div className="today [&amp;.today_.icon-today]:block [&amp;.today_.text-today]:text-primary relative flex flex-start gap-3">
                            <div>
                                <div className="py-2 w-12 bg-primary border border-black text-white rounded flex flex-col items-center gap-0.5 text-today">
                                    <span className="text-sm">May</span>
                                    <span className="text-xl font-bold leading-none">15</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <h4 className="text-sm font-medium">Class in BSIT-3F</h4>
                                <div className="text-xs"><i className="bi bi-clock me-1"></i>14:30 PM - 15:00 PM</div>
                                <div className="text-xs text-neutral-500"><i className="bi bi-backpack me-1"></i>
                                    Face to Face</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}
