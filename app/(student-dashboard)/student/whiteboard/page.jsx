"use client"
import React, { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';
import whiteboardIcon from '../../../../public/whiteboard.png';
import Image from 'next/image';

const StudentWhiteboardsPage = () => {
    const [authSession, setAuthSession] = useState('');
    const [whiteboards, setWhiteboards] = useState([]);

    const fetchClassWhiteboards = async (session) => {
        try {
            const response = await axios.get(`https://e-learn.godesqsites.com/api/whiteboards/student-classes`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session?.token}`,
                }
            });

            console.log(response);

            setWhiteboards(response.data.whiteboards);
        } catch (error) {
            console.log(error);
            toast.error(error?.message ?? "Server Error");
        }
    }

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        fetchClassWhiteboards(session);
    }, []);

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Whiteboard</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="font-bold">Whiteboard</a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>

            <div className='my-3'>
                <div className='grid grid-cols-4 gap-4'>
                    {
                        whiteboards?.length > 0 ? (
                            whiteboards.map(whiteboard => (

                                <div className='col-span-4 lg:col-span-1 cursor-pointer'>
                                    <Link href={`/student/whiteboard/${whiteboard.session_code}`}>
                                        <div className='border border-black hover-shadow'>
                                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                                <Image src={whiteboardIcon} width={0} height={0} alt='whiteboard'></Image>
                                            </div>
                                            <div className='border-t-black border p-3 bg-white'>
                                                <h4>{whiteboard.session_code}</h4>
                                            </div>
                                        </div>
                                    </Link>

                                </div>
                            ))
                        ) : (
                            <div className='text-center text-2xl col-span-4'>No Available Whiteboard Found</div>
                        )
                    }
                </div>


            </div>
        </div>
    );
}

export default StudentWhiteboardsPage;
