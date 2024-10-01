"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import cdmLogo from '../../../public/cdm-logo.webp';
import Link from "next/link";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function SchoolCalendar() {
    const [events, setEvents] = useState([
        { title: 'Math Exam', date: '2024-10-01', description: 'BSIT-3H Math final exam' },
        { title: 'Parent-Teacher Meeting', date: '2024-10-05', description: 'Meeting for all parents and teachers' },
        { title: 'Science Fair', date: '2024-10-10', description: 'Annual science fair for all grades' },
        { title: 'Sports Fest', date: '2024-10-15', description: 'Inter-school sports competition' },
        { title: 'English Literature Seminar', date: '2024-10-20', description: 'Seminar on English literature for Grade 12' },
        { title: 'Christmas Party', date: '2024-12-18', description: 'School-wide Christmas celebration' },
    ]);

    return (
        <main className='bg-main'>
            <section className='py-5'>
                <div className='max-width-container h-full'>
                    <h1 className='text-4xl font-bold text-center my-5'>School Event Calendar</h1>
                    <div className=' p-3'>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            eventContent={(info) => (
                                <div>
                                    <strong>{info.event.title}</strong>
                                    <p>{info.event.extendedProps.description}</p>
                                </div>
                            )}
                        />
                    </div>
                </div>


            </section>
        </main>
    )
}
