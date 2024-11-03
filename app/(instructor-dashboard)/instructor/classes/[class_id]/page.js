"use client"

import ClassFeed from '@/app/components/ClassFeed'
import ClassHeader from '@/app/components/ClassHeader'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import jsCookie from 'js-cookie'

export default function Class() {
    const params = useParams();
    const { class_id } = params;
    const [classDetails, setClassDetails] = useState({});

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));

        const fetchClassDetails = async () => {
            const response = await axios.get(`http://192.168.56.1:8000/api/classes/${class_id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`
                }
            })

            setClassDetails(response.data.class);
        }

        fetchClassDetails();

    }, [])

    return (
        <div className='container-fluid'>
            <div className='flex flex-col gap-4 lg:gap-6 mx-auto px-4 lg:px-6 mb-6'>
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6'>
                    <div className='xl:col-span-3'>
                        <ClassHeader classId={class_id} />
                    </div>
                    <div className='xl:col-span-2 relative'>
                        <ClassFeed classId={class_id} />
                    </div>
                    <div className='xl:col-span-1 flex flex-col gap-6'>
                        <div className='hover-shadow border-black border p-6 text-base bg-white'>
                            <div className='text-lg font-semibold mb-4'>
                                Filter
                            </div>
                            <div className="relative mb-3">
                                <div className="flex flex-nowrap lsdfdfsdafd gap-3 pdskdmsdnjw mb-2">
                                    <input className="form-checkbox h-5 w-5 accent-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="inline-block" htmlFor="flexRadioDefault2">
                                        Modules
                                    </label>
                                </div>
                                <div className="flex flex-nowrap lsdfdfsdafd gap-3 pdskdmsdnjw mb-2">
                                    <input className="form-checkbox h-5 w-5 accent-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                    <label className="inline-block" htmlFor="flexRadioDefault3">
                                        School Works
                                    </label>
                                </div>
                            </div>
                            <button className='btn btn-primary hover-shadow w-full'><i className="bi bi-filter"></i> Apply Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
