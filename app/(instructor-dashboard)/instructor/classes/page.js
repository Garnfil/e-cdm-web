"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import student from '../../../../public/student.png';
import Link from 'next/link';
import jsCookie from 'js-cookie';
import axios from 'axios';

export default function ClassesPage() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));

        const fetchClasses = async () => {
            try {
                const response = await axios.get(`https://e-learn.godesqsites.com/api/instructors/${session.user.id}/classes`, {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${session.token}`,
                    }
                });
                // If successful, set the classes data
                setClasses(response.data.classes);
            } catch (error) {
                setClasses([]);
            }
        };

        fetchClasses();

    }, []);

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Classes</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline font-bold">Classes</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/create-class'} className='btn btn-primary hover-shadow'><i className="bi bi-plus-lg"></i> Add New Class</Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    classes.length > 0 ? (
                        classes.map(classRoom => (
                            <Link key={classRoom.id} href={`/instructor/classes/${classRoom.id}`} className="p-6 bg-white hover-shadow border-black rounded border cursor-pointer">
                                <div className="p-2 rounded bg-primary text-white border border-black inline-block mb-4">
                                    <i className="text-white bi bi-people text-2xl"></i>
                                </div>
                                <h3 className="text-xl leading-normal mb-1 font-semibold text-black">{classRoom.title}</h3>
                                <p>{classRoom.class_code}</p>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-3 text-center font-bold">No Class Found</div>
                    )
                }
            </div>
        </div>
    )
}
