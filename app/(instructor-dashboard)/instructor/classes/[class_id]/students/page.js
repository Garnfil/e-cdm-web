"use client"

import ClassHeader from '@/app/components/ClassHeader'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export default function ClassStudentsPage() {
    const params = useParams();
    const router = useRouter();
    const { class_id } = params;

    const [students, setStudents] = useState([]);
    const [authSession, setAuthSession] = useState([]);

    const fetchStudents = async (session) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/classes/${class_id}/students`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                }
            });
            console.log(response.data.students);
            setStudents(response.data.students);
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);

        fetchStudents(session);
    }, [])

    return (
        <div className='container-fluid'>
            <div className='flex flex-col gap-4 lg:gap-6 mx-auto px-4 lg:px-6 mb-6'>
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6'>
                    <div className='xl:col-span-3'>
                        <ClassHeader classId={class_id} />
                    </div>
                    <div className='xl:col-span-3'>
                        <div className='border-black rounded-lg border text-base bg-white max-h-[70vh] overflow-auto class-stream-container'>
                            <div className='flex justify-between items-center gap-3 px-6 py-3 sticky top-0 z-30 bg-white border-b border-black'>
                                <h2 className='text-lg font-semibold'>Students</h2>
                                <button className='btn btn-primary hover-shadow'>Invite</button>
                            </div>
                            <div className='relative w-full overflow-y-auto'>
                                <table className='min-w-full divide-y divide-black'>
                                    <thead className='bg-neutral-200'>
                                        <tr>
                                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                                Name
                                            </th>
                                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                                Email
                                            </th>
                                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                                Age
                                            </th>
                                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white divide-y divide-black'>
                                        {
                                            students.length > 0 ? (
                                                students.map(student => (
                                                    <tr className="cursor-pointer" key={student.id}>
                                                        <td className='p-4 whitespace-nowrap'>{student.firstname} {student.firstname}</td>
                                                        <td className='p-4 whitespace-nowrap'>{student.email}</td>
                                                        <td className='p-4 whitespace-nowrap'>{student.age}</td>
                                                        <td className='p-4 whitespace-nowrap'>
                                                            <button className='py-1 px-2 bg-primary text-white rounded mr-2'><i className="bi bi-eye"></i></button>
                                                            <button className='py-1 px-2 bg-red-500 text-white rounded'><i className="bi bi-trash"></i></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className='p-4 text-center'>No Student Found</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
