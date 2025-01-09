"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import student from '../../../../public/student.png';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Select from 'react-select'
import { toast } from 'react-toastify';

export default function ClassesPage() {
    const [classes, setClasses] = useState([]);
    const [classOptions, setClassOptions] = useState([]);
    const [instructorAttendance, setInstructorAttendance] = useState({
        instructor_id: '',
        class_id: '',
        room: '',
        attendance_datetime: '',
    });
    const [openAttendanceFormDialog, setOpenAttendanceFormDialog] = useState(false);


    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));

        setInstructorAttendance(prevData => ({
            ...prevData,
            instructor_id: session.user.id,
        }))

        const fetchClasses = async () => {
            try {
                const response = await axios.get(`https://my-cdm.godesqsites.com/api/instructors/${session.user.id}/classes`, {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${session.token}`,
                    }
                });
                // If successful, set the classes data

                const options = response.data.classes.map(classroom => {
                    return {
                        value: classroom.id,
                        label: classroom.title,
                    }
                })

                setClassOptions(options);
                setClasses(response.data.classes);
            } catch (error) {
                setClasses([]);
            }
        };

        fetchClasses();
    }, []);

    const handleAttendanceInputsChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setInstructorAttendance((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSelectClass = (selectedOption) => {
        setInstructorAttendance(prevDetails => ({
            ...prevDetails,
            class_id: selectedOption.value,
        }));
    }

    const handleSubmitAttendance = async () => {
        try {
            const response = await axios.post(`https://my-cdm.godesqsites.com/api/instructor-attendances`, instructorAttendance, {
                headers: {
                    "Accept": "application/json",
                }
            });

            toast.success('Added Successfully');
            setOpenAttendanceFormDialog(false);
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }

    }

    return (
        <div className='container-fluid'>
            <div className='flex flex-col md:flex-row gap-2 justify-between items-start md:items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Classes</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline font-bold">Classes</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className="flex gap-5">
                    <Link href={'/instructor/create-class'} className='btn btn-primary hover-shadow'><i className="bi bi-plus-lg"></i> Add New Class</Link>
                    <Dialog open={openAttendanceFormDialog} onOpenChange={setOpenAttendanceFormDialog}>
                        <DialogTrigger className='btn btn-primary' onClick={() => setOpenAttendanceFormDialog(true)}>Attendance</DialogTrigger>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                <DialogTitle className="mb-3">Instructor Attendance</DialogTitle>
                                <form action="#" method='POST'>
                                    <div className="mb-3">
                                        <label htmlFor="class_id" className="form-label block mb-3">Class</label>
                                        <Select
                                            options={classOptions}
                                            onChange={handleSelectClass}
                                            classNames={{
                                                control: (state) => 'form-control h-auto border-black'
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="room" className='form-label block mb-3'>Room</label>
                                        <input type="text" className="form-control" name='room' onChange={handleAttendanceInputsChange} value={instructorAttendance.room} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="attendance-date" className='form-label block mb-3'>Attendance Date</label>
                                        <input type="datetime-local" className="form-control" name='attendance_datetime' id='attendance-date' onChange={handleAttendanceInputsChange} value={instructorAttendance.attendance_date} />
                                    </div>
                                    <hr />
                                    <button type='button' className='btn btn-primary mt-3' onClick={handleSubmitAttendance}>Save Attendance</button>
                                </form>
                            </DialogHeader>
                        </DialogContent>

                    </Dialog>
                </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    classes.length > 0 ? (
                        classes.map(classRoom => (
                            <Link key={classRoom.id} href={`/instructor/classes/${classRoom.id}`} className="p-6 bg-white hover-shadow border-black rounded border cursor-pointer">
                                <div className="p-2 rounded bg-primary text-white border border-black inline-block mb-4">
                                    <i className="text-white bi bi-people text-2xl"></i>
                                </div>
                                <h3 className="text-xl leading-normal mb-1 font-semibold text-black">{classRoom.title}</h3>
                                <p>{classRoom.class_code}</p>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-3 text-center font-bold">No Class Found</div>
                    )
                }
            </div>
        </div>
    )
}
