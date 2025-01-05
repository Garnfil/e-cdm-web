"use client"
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ClassHeader from '@/app/components/ClassHeader'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from 'date-fns';

export default function ClassCalendarPage() {
    const params = useParams();
    const router = useRouter();
    const { class_id } = params;

    const [authSession, setAuthSession] = useState({});
    const [schoolWorks, setSchoolWorks] = useState([]);
    const [selectedSchoolWork, setselectedSchoolWork] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    const fetchSchoolWorks = async (session) => {
        try {
            const response = await axios.get(`http://192.168.100.44:8000/api/classes/${class_id}/school-works`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                }
            });

            if (response.data.school_works.length > 0) {
                let schoolWorksData = response.data.school_works.map(school_work => (
                    {
                        id: school_work.id,
                        title: school_work.title,
                        description: school_work.description,
                        type: school_work.type,
                        color: '#0b4d10',
                        start: school_work.due_datetime,
                    }
                ));

                console.log(schoolWorksData);

                setSchoolWorks(schoolWorksData);
            }

        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    const handleEventClick = (arg) => {
        const clickedEvent = schoolWorks.find(school_work => school_work.id == arg.event._def.publicId);
        console.log(clickedEvent);
        setselectedSchoolWork(clickedEvent);
        setIsDialogOpen(true);
    };

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);

        fetchSchoolWorks(session);
    }, [])

    return (
        <div className='container-fluid'>
            <div className='flex flex-col gap-4 lg:gap-6 mx-auto px-4 lg:px-6 mb-6'>
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6'>
                    <div className='xl:col-span-3'>
                        <ClassHeader classId={class_id} />
                    </div>
                    <div className='xl:col-span-3'>
                        <FullCalendar
                            eventClassNames={'p-2 font-bold'}
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            events={schoolWorks}
                            eventClick={handleEventClick}
                            eventColor="#0b4d10"
                        />
                    </div>
                </div>
                {selectedSchoolWork && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                <DialogTitle>{selectedSchoolWork.title}</DialogTitle>
                            </DialogHeader>
                            <div>
                                <p>{selectedSchoolWork.description}</p>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    )
}
