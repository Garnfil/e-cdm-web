"use client"

import axios from 'axios';
import jsCookie from 'js-cookie';
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function CreateAssignmentPage() {
    const params = useParams();
    const { class_id } = params;
    const [instructorId, setInstructorId] = useState(0);
    const [session, setSession] = useState({});

    useEffect(() => {
        const session = JSON.parse(jsCookie.get('session'));
        setInstructorId(session.user.id);
        setSession(session);
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);

        const response = await axios.post(`http://127.0.0.1:8000/api/assignments`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'Accept': 'application/json',
                'Authorization': `Bearer ${session.token}`
            }
        })

        console.log(response);

    }

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Create Assignment</h2>
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
                                <a href="#" className="font-bold">Create Assignment</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes/1'} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Class</Link>
            </div>
            <form onSubmit={handleSubmit} method="POST" >
                <input type="hidden" name="class_id" value={class_id} />
                <input type="hidden" name="instructor_id" value={instructorId} />
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    <div className='xl:col-span-2'>
                        <div className='border border-black py-2 px-3 mb-5'>
                            <div className='form-group'>
                                <label className='mb-2 block'>Title</label>
                                <input className='form-control' name="title" />
                            </div>
                            <div className='form-group'>
                                <label className='mb-2 block'>Instructions (optional)</label>
                                <textarea className='form-control' rows={10} cols={10} style={{ height: '200px' }} name="description"></textarea>
                            </div>
                            <div className='form-group'>
                                <label className='mb-2 block'>Notes (optional)</label>
                                <textarea className='form-control' rows={10} cols={10} style={{ height: '100px' }} name="notes"></textarea>
                            </div>
                        </div>
                        {/* <div className='border border-black py-2 px-3'>
                        <h3 className='font-bold'>Attach</h3>
                        <div className='flex justify-center items-center gap-5'>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <button className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black hover-shadow">
                                    <i className="bi bi-file-earmark-arrow-up-fill text-2xl"></i>
                                </button>
                                <h6>Upload</h6>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <button className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black hover-shadow">
                                    <i className="bi bi-link text-2xl"></i>
                                </button>
                                <h6>Link</h6>
                            </div>
                        </div>
                    </div> */}
                    </div>
                    <div className='xl:col-span-1'>
                        <div className='border border-black py-2 px-3'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                <div className='form-group col-span-2'>
                                    <label className='mb-2 block'>Points</label>
                                    <input className='form-control' name="points" />
                                </div>
                                <div className='form-group col-span-2'>
                                    <label className='mb-2 block'>Assessment Type</label>
                                    <select className="form-control" name="assessment_type">
                                        <option value="prelim">Prelim</option>
                                        <option value="midterm">Midterm</option>
                                        <option value="finals">Finals</option>
                                    </select>
                                </div>
                                <div className='form-group col-span-2'>
                                    <label className='mb-2 block'>Due</label>
                                    <input className='form-control' type='datetime-local' name="due_datetime" />
                                </div>
                                {/* <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Assigned To</label>
                                <div className='border border-black hover-shadow p-3 rounded'>
                                    All Students
                                </div>
                            </div> */}
                            </div>
                            <button type="submit" className='w-full btn btn-primary'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
