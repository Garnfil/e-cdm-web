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
            const response = await axios.get(`http://192.168.100.44:8000/api/classes/${class_id}`, {
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
                    <div className='xl:col-span-3 relative'>
                        <ClassFeed classId={class_id} />
                    </div>
                </div>
            </div>
        </div >
    )
}
