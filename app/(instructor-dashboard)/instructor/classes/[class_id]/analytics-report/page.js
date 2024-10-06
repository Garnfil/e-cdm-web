"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import Chart from "react-apexcharts";

export default function AnalyticsReportPage() {
    const [attendanceReport, setAttendanceReport] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            },
            colors: ['#0b4d10'],
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91, 20]
            }
        ]
    });

    const [assignmentReport, setAssignmentReport] = useState({
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            },
            colors: ['#0b4d10'],
        },
        series: [
            {
                name: "series-1",
                data: [20, 50, 35, 10, 29, 40, 70, 11, 20]
            }
        ]
    });

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Analytics Report</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline">Class</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="font-bold">Analytics Report</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes/1'} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Class</Link>
            </div>

            <div className='my-3'>
                <div className='grid grid-cols-3 gap-3'>
                    <div className='grid-cols-1 border border-black hover-shadow p-3'>
                        <h3 className='text-lg mb-2 font-semibold'>Top 10 Student Attendance Grade</h3>
                        <Chart
                            options={attendanceReport.options}
                            series={attendanceReport.series}
                            type="bar"
                            width="500"
                        />
                    </div>
                    <div className='grid-cols-1 border border-black hover-shadow p-3'>
                        <h3 className='text-lg mb-2 font-semibold'>Top 10 Student Assignments Grade</h3>
                        <Chart
                            options={assignmentReport.options}
                            series={assignmentReport.series}
                            type="bar"
                            width="500"
                        />
                    </div>
                    <div className='grid-cols-1 border border-black hover-shadow p-3'>
                        <h3 className='text-lg mb-2 font-semibold'>Top 10 Student Exams Grade</h3>
                        <Chart
                            options={attendanceReport.options}
                            series={attendanceReport.series}
                            type="bar"
                            width="500"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}
