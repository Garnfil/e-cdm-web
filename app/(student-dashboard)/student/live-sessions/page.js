"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function LiveSessionsPage() {
    const [authSession, setAuthSession] = useState({});
    const [conferenceSessions, setConferenceSessions] = useState([]);

    const fetchConferenceSessions = async (session) => {
        try {
            const response = await axios.get(`https://e-learn.godesqsites.com/api/live-sessions/students/${session.user.id}/classes`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`
                }
            });

            setConferenceSessions(response.data?.conference_sessions);

        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    useEffect(() => {
        const session = JSON.parse(jsCookie.get('session'));
        setAuthSession(session);
        fetchConferenceSessions(session);
    }, [])

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Live Sessions</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline font-bold">Live Sessions</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes'} className='btn btn-primary hover-shadow'><i className="bi bi-plus-lg"></i> Join Session</Link>
            </div>
            <div className='my-2'>
                <table className='border border-black w-full'>
                    <thead>
                        <tr>
                            <th className='p-2 border border-black'>Id</th>
                            <th className='p-2 border border-black'>Session Code</th>
                            <th className='p-2 border border-black'>Instructor</th>
                            <th className='p-2 border border-black'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            conferenceSessions.length > 0 ? (
                                conferenceSessions.map(session => (
                                    <tr>
                                        <td className='p-2 border border-black text-center'>{session.id}</td>
                                        <td className='p-2 border border-black text-center'>{session.session_code}</td>
                                        <td className='p-2 border border-black text-center'>{session.instructor?.firstname} {session.instructor?.lastname}</td>
                                        <td className='py-3 border border-black text-center'>
                                            <Link href={`/video-class-conference/${session.session_code}`} className=' btn-primary px-2 py-1 hover-shadow rounded'>Join</Link>
                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan={5}>No Sessions Found</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div >
    )
}
