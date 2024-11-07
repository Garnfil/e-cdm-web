"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import cdmLogo from '../../../public/cdm-logo.webp';
import Link from "next/link";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function SchoolCalendar() {
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        const response = await axios.get('https://e-learn.godesqsites.com/api/school-events', {
            headers: {
                "Accept": 'application/json',
            }
        });

        const events = await response.data.events;
        if (events?.length > 0) {
            let eventsData = events.map(event => {
                return {
                    id: event.id,
                    title: event.name,
                    date: event.event_date,
                    description: event.description,
                    className: 'bg-primary text-white px-2 hover:bg-primary',
                }
            });
            setEvents(eventsData);
        }
    }

    useEffect(() => {
        fetchEvents();
    }, []);

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
                            eventClick={(arg) => console.log(arg.event.id)}
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
