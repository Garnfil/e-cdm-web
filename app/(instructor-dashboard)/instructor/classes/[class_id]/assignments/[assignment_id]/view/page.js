"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from 'next/navigation';
import axios from 'axios';
import jsCookie from 'js-cookie';

export default function ViewAssignmentPage() {
    const params = useParams();
    const { assignment_id, class_id } = params;
    const [submittedAssignments, setSubmittedAssignments] = useState([]);

    const [selectedSubmittedAssignment, setSelectedSubmittedAssignment] = useState({});

    const [assignmentDetails, setAssignmentDetails] = useState({
        school_work_id: "",
        class_id: "",
        instructor_id: "",
        title: "",
        description: "",
        type: "assignment",
        status: "posted",
        assignment_id: "",
        points: "",
        assessment_type: "",
        notes: "",
        due_datetime: "",
        attachments: [],
    });

    const fetchSubmittedAssignments = async (session, assignmentId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/student-assignments/submitted/assignments/${assignmentId}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`
                }
            });

            setSubmittedAssignments(response.data.student_assignments);

            if (response.data.student_assignments.length > 0) {
                console.log(response.data.student_assignments);
                setSelectedSubmittedAssignment(response.data.student_assignments[0]);
            }

        } catch (error) {
            console.error("Error fetching submitted assignments:", error);
        }
    };

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));

        const fetchAssignmentDetails = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/school-works/${assignment_id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`
                }
            });

            setAssignmentDetails({
                school_work_id: response.data.school_work.id,
                class_id: response.data.school_work.class_id,
                instructor_id: response.data.school_work.instructor_id,
                title: response.data.school_work.title,
                description: response.data.school_work.description,
                type: response.data.school_work.type,
                status: response.data.school_work.status,
                assignment_id: response.data.school_work.assignment.id,
                points: response.data.school_work.assignment.points,
                assessment_type: response.data.school_work.assignment.assessment_type,
                notes: response.data.school_work.assignment.notes,
                due_datetime: response.data.school_work.assignment.due_datetime,
                attachments: response.data.school_work.attachments,
            });

            fetchSubmittedAssignments(session, response.data.school_work.assignment.id);
        }

        fetchAssignmentDetails();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setAssignmentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Assignment</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex items-center">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex items-center">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline">Class</a>
                            </li>
                            <li className="flex items-center">
                                <span className="mx-2">›</span>
                                <a href="#" className="font-bold">View Assignment</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes/1'} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Class</Link>
            </div>
            <div className="my-3">
                <Tabs defaultValue="details" className="w-full">
                    <TabsList className="border border-black">
                        <TabsTrigger value="details" className="bg-primary text-white">Details</TabsTrigger>
                        <TabsTrigger value="student_works">Student Works</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="w-100">
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                            <div className='xl:col-span-2'>
                                <div className='border border-black py-2 px-3 mb-5'>
                                    <div className='form-group'>
                                        <label className='mb-2 block'>Title</label>
                                        <input
                                            className='form-control'
                                            value={assignmentDetails.title}
                                            name="title"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label className='mb-2 block'>Instructions (optional)</label>
                                        <textarea className='form-control'
                                            rows={10}
                                            cols={10}
                                            name="description"
                                            onChange={handleChange}
                                            style={{ height: '200px' }} value={assignmentDetails.description}></textarea>
                                    </div>
                                    <div className='my-3'>
                                        <h2 className='mb-3 text-xl font-bold'>School Work Attachments</h2>
                                        <div className='flex flex-col gap-3'>
                                            {
                                                assignmentDetails.attachments.length > 0 ? (
                                                    assignmentDetails.attachments.map(attachment => (
                                                        <div className='border border-black hover-shadow p-3 cursor-pointer'>
                                                            <div className='flex justify-between items-start gap-3'>
                                                                <div className='w-[15%] h-[80px] bg-secondary border border-black flex justify-center items-center p-2'>
                                                                    {
                                                                        attachment.attachment_type == 'file' ? (
                                                                            <i className="bi bi-files-alt text-3xl"></i>
                                                                        ) : (
                                                                            <i className="bi bi-link-45deg text-4xl"></i>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className='w-[85%]'>
                                                                    <h3 className='text-xl'>{attachment?.attachment_name}</h3>
                                                                    <h6 className='text-muted text-sm'>{attachment?.attachment_type}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No Attachment Found</div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='border border-black py-2 px-3'>
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
                                </div>
                            </div>
                            <div className='xl:col-span-1'>
                                <div className='border border-black py-2 px-3'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                        <div className='form-group col-span-2'>
                                            <label className='mb-2 block'>Points</label>
                                            <input className='form-control'
                                                value={assignmentDetails?.points || 0}
                                                name="points"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='form-group col-span-2'>
                                            <label className='mb-2 block'>Due</label>
                                            <input className='form-control'
                                                value={assignmentDetails.due_datetime}
                                                type='datetime-local'
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <button className='w-full btn btn-primary'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="student_works">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                                <div className="bg-white p-3 border border-black mb-3 hover-shadow">
                                    <button className="btn btn-primary">
                                        <i className="bi bi-file-check"></i> All Submissions
                                    </button>
                                </div>
                                <div className="border border-black hover-shadow p-4 bg-white">
                                    <h3 className="font-bold">Students</h3>
                                    <div className="my-3">
                                        <div className="flex flex-col">
                                            {
                                                submittedAssignments.length > 0 ? (
                                                    submittedAssignments.map(submitted_assignment => (
                                                        <div className="cursor-pointer hover:bg-gray-100 hover:rounded py-2.5 px-3 flex items-center gap-2 justify-between border border-black rounded">
                                                            <div className="flex items-center gap-2">
                                                                <img src="#" alt="avatar" className="size-8 rounded-full bg-zinc-500" />                                                        <div className="flex flex-col gap-0.5">
                                                                    <h5 className="text-sm font-medium">{submitted_assignment.student.firstname} {submitted_assignment.student.lastname}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {/* <div className="size-2.5 bg-lime-500 rounded-full"></div> */}
                                                                <span className="text-sm">{submitted_assignment.score}/50</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No Students Found</div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                {/* All Submissions */}
                                {/* <div className="border border-black">
    
                                </div> */}
                                {/* Student Dashboard */}
                                <div className="border border-black hover-shadow p-4 bg-white">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="font-semibold text-xl">{selectedSubmittedAssignment?.student?.firstname} {selectedSubmittedAssignment?.student?.lastname}</h2>
                                                <h6 className="uppercase">{selectedSubmittedAssignment.grade}</h6>
                                            </div>
                                            <div>
                                                <h5 className="text-2xl">{selectedSubmittedAssignment.score}/{assignmentDetails.points}</h5>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-xl">Attachments</h2>
                                            <div className="grid grid-cols-2 gap-3 my-3">
                                                {
                                                    selectedSubmittedAssignment?.attachments?.length > 0 ? (
                                                        selectedSubmittedAssignment?.attachments?.map(attachment => (
                                                            <Link href="/instructor/classes/1/assignments/1/student-submissions/1">
                                                                <div className='border border-black hover-shadow p-3 cursor-pointer'>
                                                                    <div className='flex justify-between items-start gap-3'>
                                                                        <div className='w-[15%] h-[70px] bg-secondary border border-black flex justify-center items-center p-2'>
                                                                            <i className="bi bi-files-alt text-3xl"></i>
                                                                        </div>
                                                                        <div className='w-[85%]'>
                                                                            <h3 className='text-xl'>assignment-1-schoolattachment.pdf</h3>
                                                                            <h6 className='text-muted text-sm'>File</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        <div>No Attachment Found</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    )
}
