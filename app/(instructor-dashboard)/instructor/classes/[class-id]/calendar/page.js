"use client"
import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ClassHeader from '@/app/components/ClassHeader'

export default function ClassCalendarPage() {
    const [schoolWorks, setSchoolWorks] = useState([
        { title: 'HTML Basics Assignment', type: 'Assignment', color: '#0b4d10', start: '2024-09-02' },
        { title: 'CSS Styling Quiz', type: 'Quiz', color: '#008080', start: '2024-09-04' },
        { title: 'JavaScript Fundamentals Exam', type: 'Exam', color: '#FF0000', start: '2024-09-07' },
        { title: 'React Component Activity', type: 'Activity', color: '#0000FF', start: '2024-09-09' },
        { title: 'Responsive Web Design Assignment', type: 'Assignment', color: '#0b4d10', start: '2024-09-12' },
        { title: 'Vue.js Quiz', type: 'Quiz', color: '#008080', start: '2024-09-14' },
        { title: 'Node.js Basics Exam', type: 'Exam', color: '#FF0000', start: '2024-09-18' },
        { title: 'Laravel Framework Activity', type: 'Activity', color: '#0000FF', start: '2024-09-21' },
        { title: 'Database Integration Assignment', type: 'Assignment', color: '#0b4d10', start: '2024-09-24' },
        { title: 'React Hooks Quiz', type: 'Quiz', color: '#008080', start: '2024-09-28' },
    ]);

    return (
        <div className='container-fluid'>
            <div className='flex flex-col gap-4 lg:gap-6 mx-auto px-4 lg:px-6 mb-6'>
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6'>
                    <div className='xl:col-span-3'>
                        <ClassHeader />
                    </div>
                    <div className='xl:col-span-3'>
                        <FullCalendar
                            eventClassNames={'p-2 font-bold'}
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={schoolWorks}
                            eventColor="#0b4d10"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
