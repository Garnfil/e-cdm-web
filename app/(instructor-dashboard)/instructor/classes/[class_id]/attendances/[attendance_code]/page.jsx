"use client"
import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function page() {
    const params = useParams();
    const { class_id, attendance_code } = params;
    const [authSession, setAuthSession] = useState({});
    const [attendance, setAttendance] = useState({});
    const [students, setStudents] = useState([]);

    const fetchAttendance = async (session) => {
        try {
            const response = await axios.get(`http://192.168.56.1:8000/api/attendances/${attendance_code}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${session.token}`
                }
            })

            setAttendance(response.data.attendance);
            setStudents(response.data.students);

        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    useEffect(() => {
        let session = JSON.parse(jsCookie.get('session'));
        fetchAttendance(session);
    }, [])
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>View Attendance</h2>
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
                                <a href="#" className="hover:underline">Attendances</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline font-bold">View Attendance</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={`/instructor/classes/${class_id}/attendances`} className='btn btn-primary hover-shadow'>
                    <i className="bi bi-arrow-left"></i> Back to List
                </Link>
            </div>
            <div className='grid grid-cols-3 gap-3'>
                <div className="border border-black p-3 rounded">
                    <h2 className='text-xl font-bold'>Attendance Details</h2>
                    <table className='mt-3'>
                        <tbody>
                            <tr>
                                <td width="200" className='py-1'>Attendance Code: </td>
                                <td className='py-1'>{attendance.attendance_code}</td>
                            </tr>
                            <tr>
                                <td width="200" className='py-1'>Class: </td>
                                <td className='py-1'>{attendance.classroom?.title}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-span-2 border border-black p-3 rounded">
                    <h2 className='text-xl font-bold'>Student Attendee</h2>
                    <div className="mt-3">
                        <div className="flex flex-col gap-2">
                            {
                                students.length > 0 ? (
                                    students.map(student => (
                                        <div className=" px-2 py-2 border border-black rounded">
                                            <h4 className='text-lg font-semibold'>{student.firstname} {student.lastname}</h4>
                                            <h6>{student.student_id}</h6>
                                        </div>
                                    ))

                                ) : (
                                    <div>No Students Found</div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
