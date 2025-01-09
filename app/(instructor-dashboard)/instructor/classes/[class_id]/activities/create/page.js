"use client"

import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateActivityPage() {
    const params = useParams();
    const router = useRouter();

    const { class_id } = params;
    const [authSession, setSession] = useState({});
    const [activityDetails, setActivityDetails] = useState({
        class_id: "",
        instructor_id: "",
        title: "",
        description: "",
        type: "assignment",
        status: "posted",
        points: "",
        assessment_type: "",
        notes: "",
        due_datetime: "",
    });


    useEffect(() => {
        const session = JSON.parse(jsCookie.get('session'));
        setActivityDetails(prevDetails => ({
            ...prevDetails,
            instructor_id: session.user.id,
            class_id: class_id
        }))
        setSession(session);
    }, [])

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`https://my-cdm.godesqsites.com/api/activities`, activityDetails, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authSession.token}`,
                    'Content-Type': 'application/json',
                }
            })

            if (response.status == 200) {
                router.push(`/instructor/classes/${class_id}/activities/${response.data.activity.school_work_id}/view`);
            }
        } catch (error) {
            toast.error("Failed! Check all the input fields.")
            console.log(error);
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setActivityDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Create Activity</h2>
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
                                <a href="#" className="font-bold">Create Activity</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={`/instructor/classes/${class_id}`} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Class</Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                <div className='xl:col-span-2'>
                    <div className='border border-black py-2 px-3 mb-5'>
                        <div className='form-group'>
                            <label className='mb-2 block'>Title</label>
                            <input className='form-control' name='title' value={activityDetails.title} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block'>Instructions (optional)</label>
                            <textarea className='form-control'
                                rows={10}
                                cols={10}
                                name='description'
                                style={{ height: '200px' }}
                                value={activityDetails.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className='xl:col-span-1'>
                    <div className='border border-black py-2 px-3'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Points</label>
                                <input className='form-control' name='points' value={activityDetails.points} onChange={handleChange} />
                            </div>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Assessment Type</label>
                                <select className="form-control" name="assessment_type" value={activityDetails.assessment_type} onChange={handleChange}>
                                    <option value="">-- SELECT ASSESSMENT TYPE --</option>
                                    <option value="prelim">Prelim</option>
                                    <option value="midterm">Midterm</option>
                                    <option value="finals">Finals</option>
                                </select>
                            </div>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Due</label>
                                <input className='form-control' name='due_datetime' type='datetime-local' value={activityDetails.due_datetime} onChange={handleChange} />
                            </div>
                            {/* <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Assigned To</label>
                                <div className='border border-black hover-shadow p-3 rounded'>
                                    All Students
                                </div>
                            </div> */}
                        </div>
                        <button className='w-full btn btn-primary' type='button' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
