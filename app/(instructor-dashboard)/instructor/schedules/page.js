"use client"
import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function SchedulePage() {
    const [events, setEvents] = useState([
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3H', daysOfWeek: [1], startTime: '10:00', endTime: '11:30' }, // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3F', daysOfWeek: [1], startTime: '12:00', endTime: '1:30' },  // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3C', daysOfWeek: [1], startTime: '2:00', endTime: '3:30' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 2A', daysOfWeek: [1], startTime: '4:00', endTime: '5:30' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4B', daysOfWeek: [1], startTime: '5:30', endTime: '7:00' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4H', daysOfWeek: [1], startTime: '5:30', endTime: '7:00' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4H', daysOfWeek: [1], startTime: '5:30', endTime: '7:00' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4H', daysOfWeek: [1], startTime: '5:30', endTime: '7:00' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4H', daysOfWeek: [1], startTime: '5:30', endTime: '7:00' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4H', daysOfWeek: [1], startTime: '5:30', endTime: '7:00' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4H', daysOfWeek: [1], startTime: '5:30', endTime: '7:00' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4H', daysOfWeek: [1], startTime: '5:30', endTime: '7:00' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4H', daysOfWeek: [1], startTime: '5:30', endTime: '7:00' },   // Monday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3D', daysOfWeek: [2], startTime: '9:00', endTime: '10:30' },  // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 2B', daysOfWeek: [2], startTime: '11:00', endTime: '12:30' }, // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 1A', daysOfWeek: [2], startTime: '1:00', endTime: '2:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 1C', daysOfWeek: [2], startTime: '13:00', endTime: '4:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 1C', daysOfWeek: [2], startTime: '3:00', endTime: '4:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4A', daysOfWeek: [2], startTime: '3:00', endTime: '4:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3B', daysOfWeek: [2], startTime: '3:00', endTime: '4:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3D', daysOfWeek: [2], startTime: '3:00', endTime: '4:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3A', daysOfWeek: [2], startTime: '3:00', endTime: '4:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4C', daysOfWeek: [2], startTime: '3:00', endTime: '4:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 1A', daysOfWeek: [2], startTime: '3:00', endTime: '4:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 2C', daysOfWeek: [2], startTime: '3:00', endTime: '4:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4B', daysOfWeek: [2], startTime: '3:00', endTime: '4:30' },   // Tuesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3B', daysOfWeek: [3], startTime: '8:00', endTime: '9:30' },   // Wednesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 2D', daysOfWeek: [3], startTime: '10:00', endTime: '11:30' }, // Wednesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4C', daysOfWeek: [3], startTime: '12:00', endTime: '1:30' },  // Wednesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4A', daysOfWeek: [3], startTime: '2:00', endTime: '3:30' },   // Wednesday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3E', daysOfWeek: [4], startTime: '9:00', endTime: '10:30' },  // Thursday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4D', daysOfWeek: [4], startTime: '11:00', endTime: '12:30' }, // Thursday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 2C', daysOfWeek: [4], startTime: '1:00', endTime: '2:30' },   // Thursday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 1B', daysOfWeek: [4], startTime: '3:00', endTime: '4:30' },   // Thursday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4E', daysOfWeek: [5], startTime: '8:30', endTime: '10:00' },  // Friday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 2E', daysOfWeek: [5], startTime: '10:30', endTime: '12:00' }, // Friday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3A', daysOfWeek: [5], startTime: '12:30', endTime: '2:00' },  // Friday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4F', daysOfWeek: [6], startTime: '9:00', endTime: '10:30' },  // Saturday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 1D', daysOfWeek: [6], startTime: '11:00', endTime: '12:30' }, // Saturday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 3G', daysOfWeek: [6], startTime: '1:00', endTime: '2:30' },   // Saturday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 2F', daysOfWeek: [7], startTime: '9:00', endTime: '10:30' },  // Sunday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 1E', daysOfWeek: [7], startTime: '11:00', endTime: '12:30' }, // Sunday
        { className: "bg-lime-600 py-2 text-white", title: 'BSIT - 4G', daysOfWeek: [7], startTime: '1:00', endTime: '2:30' },   // Sunday
      ]);
      

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Schedules</h2>
                    <nav class="breadcrumb" aria-label="Breadcrumb">
                        <ol class="list-none text-sm p-0 inline-hsdfdsfhsdf">
                            <li class="hsdfdsfhsdf pdskdmsdnjw">
                                <a href="#" class="hover:underline">Dashboard</a>
                            </li>
                            <li class="hsdfdsfhsdf pdskdmsdnjw">
                                <span class="mx-2">›</span>
                                <a href="#" class="hover:underline font-bold">Schedules</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <button className='btn btn-primary hover-shadow'><i class="bi bi-plus-lg"></i> Add New Schedule</button>
            </div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                eventColor="#0b4d10"
            />
        </div>
    )
}
