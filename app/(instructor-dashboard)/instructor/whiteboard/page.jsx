"use client"
import React, { useEffect, useState } from 'react'
import whiteboardIcon from '../../../../public/whiteboard.png';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import jsCookie from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function InstructorWhiteBoardPage() {
    const router = useRouter();
    const [authSession, setAuthSession] = useState({});
    const [classes, setClasses] = useState([]);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [whiteboards, setWhiteboards] = useState([]);

    const fetchClasses = async (session) => {
        try {
            const response = await axios.get(`https://my-cdm.godesqsites.com/api/instructors/${session.user.id}/classes`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                }
            });
            console.log(response);
            // If successful, set the classes data
            setClasses(response.data.classes);
        } catch (error) {
            setClasses([]);
        }
    };

    const fetchInstructorWhiteboards = async (session) => {
        try {
            const response = await axios.get(`https://my-cdm.godesqsites.com/api/whiteboards/instructors/${session?.user?.id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session?.token}`,
                }
            });

            setWhiteboards(response.data.whiteboards);
        } catch (error) {
            console.log(error);
            toast.error(error?.message ?? "Server Error");
        }
    }

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
        fetchClasses(session);
        fetchInstructorWhiteboards(session);
    }, [])


    const handleCreateWhiteboard = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            setIsSubmitLoading(true);
            const response = await axios.post(`https://my-cdm.godesqsites.com/api/whiteboards/generate-room`, formData, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${authSession.token}`,
                }
            });

            router.push(`/instructor/whiteboard/${response?.data?.whiteboard?.session_code}`);
            setIsSubmitLoading(false);
        } catch (error) {
            setIsSubmitLoading(false);
            console.log(error);
        }
    }

    const handleRemoveWhiteboard = async (e) => {
        e.preventDefault();
        try {
            const whiteboard_id = e.target.id;
            withReactContent(Swal).fire({
                icon: 'question',
                title: "Remove Whiteboard?",
                text: "This attachment cannot be revert.",
                confirmButtonColor: "#0b4d10",
                confirmButtonText: "Remove",
                cancelButtonColor: '#000',
                showCancelButton: true,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.delete(`https://my-cdm.godesqsites.com/api/whiteboards/${whiteboard_id}`, {
                            headers: {
                                "Accept": "application/json",
                                "Authorization": `Bearer ${authSession.token}`,
                            }
                        });

                        if (response.status == 200) {
                            fetchInstructorWhiteboards(authSession);
                            toast.success("Attachment Removed Successfully");
                        }
                    } catch (error) {
                        console.log(error);
                        toast.error("Failed to Removed Attachment.");
                    }
                }
            })
        } catch (error) {

        }
    }

    return (
        <div className='container-fluid'>
            <div className='flex flex-col md:flex-row gap-2 justify-between items-start md:items-center mb-5'>
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
                <Dialog>
                    <DialogTrigger className='btn btn-primary hover-shadow'>
                        <i className="bi bi-plus-lg mr-1"></i> Create Whiteboard
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle className="mb-4 border-b border-black py-3">Whiteboard Session</DialogTitle>
                            <DialogDescription>
                                <form onSubmit={handleCreateWhiteboard}>
                                    <input type="hidden" name="instructor_id" id='instructor-id-field' value={authSession?.user?.id} />
                                    <div className='form-group'>
                                        <label className='mb-2 block font-bold'>Class</label>
                                        <select className='form-control my-2 text-black' name='class_id' readonly >
                                            <option className=''>-- SELECT CLASS --</option>
                                            {
                                                classes.map(classRoom => (
                                                    <option key={classRoom.id} value={classRoom.id}>{classRoom.title}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <button type='submit' className='w-full btn btn-primary' disabled={isSubmitLoading}>Create</button>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className='my-3'>
                <div className='grid grid-cols-4 gap-4'>
                    {
                        whiteboards?.length > 0 ? (
                            whiteboards.map(whiteboard => (

                                <div key={whiteboard.id} className='col-span-4 lg:col-span-1 cursor-pointer'>
                                    <Link href={`/instructor/whiteboard/${whiteboard.session_code}`}>
                                        <div className='border border-black hover-shadow'>
                                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                                <Image src={whiteboardIcon} width={0} height={0} alt='whiteboard'></Image>
                                            </div>
                                            <div className='flex justify-between items-center border-t-black border p-3 bg-white'>
                                                <h4>{whiteboard.session_code}</h4>
                                                <button onClick={handleRemoveWhiteboard} className='btn btn-primary bg-red-500' id={whiteboard.id}>
                                                    <i className="bi bi-trash3-fill"></i>
                                                </button>
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
    )
}
