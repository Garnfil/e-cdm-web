"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import jsCookie from 'js-cookie';

export default function ClassAttendancePage() {
    const params = useParams();
    const router = useRouter();

    const { class_id } = params;
    const [authSession, setAuthSession] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [attendances, setAttendances] = useState([]);

    const fetchAttendances = async (session) => {
        try {
            const response = await axios.get(`https://app-digital-cdm.godesqsites.com/api/attendances/classes/${class_id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                }
            });

            setAttendances(response.data.attendances);
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }


    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
        fetchAttendances(session);
    }, [])

    const handleNewAttendanceSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData(e.target);
            const response = await axios.post(`https://app-digital-cdm.godesqsites.com/api/attendances`, formData, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${authSession.token}`,
                }
            });

            if (response.status == 200) {
                toast.success('Attendance Added Successfully');
                location.reload();
            }

        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    const handleDeleteAttendance = async (attendanceId) => {
        try {
            const response = await axios.delete(`https://app-digital-cdm.godesqsites.com/api/attendances/${attendanceId}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${authSession.token}`,
                }
            });

            if (response.status === 200) {
                toast.success('Attendance Deleted Successfully');
                setAttendances(attendances.filter(attendance => attendance.id !== attendanceId));
            }
        } catch (error) {
            toast.error(error.message ?? "Failed to delete attendance");
        }
    }

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Class Attendance</h2>
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
                                <a href="#" className="font-bold">Class Attendance</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='flex gap-2'>
                    <Link href={`/instructor/classes/${class_id}`} className='btn hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Class</Link>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger className='btn btn-primary hover-shadow'>
                            Add New Attendance
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                <DialogTitle className="mb-3">Create New Attendance</DialogTitle>
                                <form className='my-5' onSubmit={handleNewAttendanceSubmit}>
                                    <input type='hidden' name='class_id' value={class_id} />
                                    <div className='form-group'>
                                        <label className='form-label'>Attendance Date</label>
                                        <input name='attendance_datetime' type='datetime-local' className='form-control my-2' />
                                    </div>
                                    <button className='w-full btn btn-primary'>Add New</button>
                                </form>
                                {/* <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription> */}
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='my-3'>
                <table className='min-w-full divide-y divide-black border border-black'>
                    <thead className='bg-neutral-200'>
                        <tr>
                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                ID
                            </th>
                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                Attendance Code
                            </th>

                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-black'>
                        {
                            attendances.length > 0 ? (
                                attendances.map(attendance => (
                                    <tr className="cursor-pointer" key={attendance.id}>
                                        <td className='p-4 whitespace-nowrap'>{attendance.id}</td>
                                        <td className='p-4 whitespace-nowrap'>{attendance.attendance_code}</td>
                                        <td className='p-4 whitespace-nowrap'>
                                            <Link href={`/instructor/classes/${class_id}/attendances/${attendance.attendance_code}`} className='py-1 px-2 bg-primary text-white rounded mr-2'>
                                                <i className="bi bi-eye"></i>
                                            </Link>
                                            <button onClick={() => handleDeleteAttendance(attendance.id)} className='py-1 px-2 bg-red-500 text-white rounded'><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="cursor-pointer">
                                    <td colSpan={5} className='p-4 text-center'>No Attendance Found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
