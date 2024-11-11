"use client"
import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie';
import axios from 'axios';

export default function page() {
    const [authSession, setAuthSession] = useState({});

    const fetchAttendance = async (session) => {
        try {
            const response = await axios.get(`https://e-learn.godesqsites.com/api/`)
        } catch (error) {

        }
    }

    useEffect(() => {
        let session = JSON.parse(jsCookie.get('session'));
        fetchAttendance(session);
    }, [])
    return (
        <div className='container-fluid'>
            <div className='grid grid-cols-3 gap-3'>
                <div className="border border-black p-3 rounded">
                    <h2 className='text-xl font-bold'>Attendance Details</h2>
                    <table className='mt-3'>
                        <tbody>
                            <tr>
                                <td className='py-1'>Attendance Code: </td>
                                <td className='py-1'></td>
                            </tr>
                            <tr>
                                <td className='py-1'>Class: </td>
                                <td className='py-1'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-span-2 border border-black p-3 rounded">
                    <h2 className='text-xl font-bold'>Student Attendee</h2>
                    <div className="mt-3">
                        <div className="flex flex-col gap-2">
                            <div className=" px-2 py-2 border border-black rounded">
                                <h4 className='text-lg font-semibold'>James Garnfil</h4>
                                <h6>21-00091</h6>
                            </div>
                            <div className=" px-2 py-2 border border-black rounded">
                                <h4 className='text-lg font-semibold'>James Garnfil</h4>
                                <h6>21-00091</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
