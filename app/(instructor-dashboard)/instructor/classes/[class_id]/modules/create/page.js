"use client"
import axios from 'axios';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import jsCookie from 'js-cookie';

export default function CreateModulePage() {
    const params = useParams();
    const router = useRouter();
    const { class_id } = params;

    const [authSession, setAuthSession] = useState({});
    const [module, setModule] = useState({
        class_id: "",
        instructor_id: "",
        title: "",
        description: "",
        scheduled_datetime: ""
    });

    useEffect(() => {
        const session = JSON.parse(jsCookie.get('session'));
        setModule(prevDetails => ({
            ...prevDetails,
            instructor_id: session.user.id,
            class_id: class_id
        }))
        setAuthSession(session);
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setModule(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const handleSubmitModule = async (e) => {
        try {
            const response = await axios.post(`https://app-digital-cdm.godesqsites.com/api/modules`, module, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authSession.token}`,
                    'Content-Type': 'application/json',
                }
            });

            if (response.status == 200 || response.status == 201) {
                router.push(`/instructor/classes/${class_id}/modules/${response.data.module.id}/view`);
            }
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Create Module</h2>
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
                                <a href="#" className="font-bold">Create Module</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes/1'} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Class</Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                <div className='col-span-1'></div>
                <div className='xl:col-span-1 sm:col-span-3'>
                    <div className='border border-black py-2 px-3 mb-5'>
                        <div className='form-group'>
                            <label className='mb-2 block'>Title</label>
                            <input className='form-control' name='title' value={module.title} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block'>Description (optional)</label>
                            <textarea
                                className='form-control'
                                name='description'
                                value={module.description}
                                onChange={handleChange}
                                rows={10}
                                cols={10}
                                style={{ height: '200px' }}></textarea>
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block'>Scheduled Datetime</label>
                            <input className='form-control' name='scheduled_datetime' type='datetime-local' value={module.scheduled_datetime} onChange={handleChange} />
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
                    <button onClick={handleSubmitModule} type="button" className='btn btn-primary mt-2 w-full'>Save Module</button>
                </div>
                <div className='col-span-1'></div>

                {/* <div className='xl:col-span-1'>
                    <div className='border border-black py-2 px-3'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Points</label>
                                <input className='form-control' value={10} />
                            </div>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Due</label>
                                <input className='form-control' type='date' />
                            </div>
                        </div>
                        <button className='w-full btn btn-primary'>Submit</button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
