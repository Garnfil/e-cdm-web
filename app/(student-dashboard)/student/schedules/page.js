"use client"
import Link from 'next/link'
import React from 'react'
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';

export default function StudentSchedulesPage() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Class Schedules</h2>
                    <nav class="breadcrumb" aria-label="Breadcrumb">
                        <ol class="list-none text-sm p-0 inline-flex">
                            <li class="flex pdskdmsdnjw">
                                <a href="#" class="hover:underline">Dashboard</a>
                            </li>
                            <li class="flex pdskdmsdnjw">
                                <span class="mx-2">›</span>
                                <a href="#" class="hover:underline font-bold">Class Schedules</a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className='my-3'>
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    eventColor="#0b4d10"
                />
            </div>
        </div>
    )
}
