"use client"

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { formatDate } from 'date-fns';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StudentSubmissionPage() {
    const params = useParams();
    const router = useRouter();
    const [isLoad, setIsLoad] = useState(false);
    const [authSession, setAuthSession] = useState({});
    const { school_work_id, submission_id, class_id } = params;
    const [studentSubmission, setStudentSubmission] = useState({});
    const [selectedSubmissionAttachment, setSelectedSubmissionAttachment] = useState({});

    const [studentWorkGrade, setStudentWorkGrade] = useState({
        student_submission_id: "",
        student_id: "",
        score: "",
    });

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
        const fetchStudentSubmittedWork = async () => {
            try {
                const response = await axios.get(`http://192.168.100.110:8000/api/student-school-works/submissions/${submission_id}`, {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${session.token}`
                    }
                })

                if (!response.data.student_submission) router.replace('/404');

                setStudentSubmission(response.data.student_submission);

                console.log(response.data.student_submission);

                setStudentWorkGrade(prevDetails => ({
                    ...prevDetails,
                    student_id: response.data.student_submission.student_id,
                    student_submission_id: response.data.student_submission.id,
                    score: response.data.student_submission.score,
                }))

                if (response.data.student_submission.attachments.length > 0) {
                    setSelectedSubmissionAttachment(response.data.student_submission.attachments[0]);
                }

                setIsLoad(true);

            } catch (error) {
            }
        }

        fetchStudentSubmittedWork();
    }, [])

    const handleAttachmentClicked = (index) => {
        let selectedAttachment = studentSubmission.attachments[index];
        setSelectedSubmissionAttachment(selectedAttachment);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setStudentWorkGrade(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const handleSubmitStudentGrade = async () => {
        try {
            const response = await axios.post(`http://192.168.100.110:8000/api/student-school-works/submissions/${submission_id}/graded`, studentWorkGrade, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authSession?.token}`
                }
            });

            if (response.status == 200) {
                toast.success('Submit Grade Successfully!', {
                    position: "top-right",
                    theme: "light",
                    transition: Slide,
                });
            }
        } catch (error) {
            toast.error('Failed to Submit Grade.', {
                position: "top-right",
                theme: "light",
                transition: Slide,
            });
        }
    }

    return (
        isLoad && (
            <div className="container-fluid">
                <div className='flex justify-between items-center mb-5'>
                    <div>
                        <h2 className='text-2xl font-bold'>Student Submission</h2>
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
                                    <a href="#" className="hover:underline">Submissions</a>
                                </li>
                                <li className="flex items-center">
                                    <span className="mx-2">›</span>
                                    <a href="#" className="font-bold">Student Submission</a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    {/* <Link href={`/instructor/classes/${class_id}/assignments/${school_work_id}/view`} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Assignment</Link> */}
                </div>

                <div className="my-3">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2">
                            <div className='border border-black p-2 bg-gray-200'>
                                <h6 className='text-md m-2'>{selectedSubmissionAttachment?.attachment_name}</h6>

                            </div>
                            <div className="border border-black bg-white p-4" style={{ height: "calc(100vh - 200px)" }}>

                                {(
                                    selectedSubmissionAttachment?.attachment_type === "file" ? (
                                        <div className='m-3'>
                                            <a target='_blank' href={`http://192.168.100.110:8000/assets/uploads/student_submission_attachments/${selectedSubmissionAttachment.attachment_name}`} className='btn btn-primary'>View File <i className="bi bi-file-earmark"></i></a>
                                        </div>
                                    ) : (
                                        <div className="border border-black h-full">
                                            <iframe

                                                frameBorder="0"
                                                scrolling="yes"
                                                width="100%"
                                                height="100%"
                                                src={`${selectedSubmissionAttachment.attachment_name}`}
                                                name="imgbox"
                                                id="imgbox"
                                                referrerpolicy="strict-origin-when-cross-origin"
                                                allowFullScreen={true}
                                            ></iframe>
                                            {/* <iframe width="100%" height="100%"
                                                src="https://www.youtube.com/embed/ezbJwaLmOeM?si=D6lYATpTeQSe0cft" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                                            </iframe> */}
                                        </div>
                                    )
                                )}

                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="border border-black bg-white">
                                <div className="border-b border-black  p-4">
                                    <h2 className="font-semibold text-xl">Assignment Details</h2>
                                    <h4 className="my-2"><span className="font-bold">Title: </span>{studentSubmission?.school_work?.title}</h4>
                                    <h4 className="my-2"><span className="font-bold">Points: </span>{studentSubmission?.school_work?.points}</h4>
                                    <h4 className="my-2"><span className="font-bold">Due Date: </span>{studentSubmission?.school_work?.due_datetime}</h4>
                                    <h4 className="my-2"><span className="font-bold">Student Name: </span>{studentSubmission?.student?.firstname} {studentSubmission?.student?.lastname}</h4>
                                </div>
                                <div className="border-b border-black  p-4">
                                    <div className="mb-4">
                                        <h2 className="font-semibold text-xl">Attachments</h2>
                                        <p>Submitted on <span className='font-bold'>{formatDate(new Date(studentSubmission?.datetime_submitted), 'MMM dd, yyyy hh:m a')}</span></p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {
                                            studentSubmission?.attachments?.length > 0 ? (
                                                studentSubmission?.attachments?.map((attachment, index) => (
                                                    <div onClick={() => handleAttachmentClicked(index)} key={index}>
                                                        <div className='border border-black hover-shadow p-3 cursor-pointer'>
                                                            <div className='flex justify-between items-start gap-3'>
                                                                <div className='w-[15%] h-[45px] bg-secondary border border-black flex justify-center items-center p-2'>
                                                                    <i className="bi bi-files-alt text-xl"></i>
                                                                </div>
                                                                <div className='w-[85%]'>
                                                                    <h3 className='text-medium'>
                                                                        {attachment.attachment_name.length > 20
                                                                            ? attachment.attachment_name.slice(0, 20) + '...'
                                                                            : attachment.attachment_name}
                                                                    </h3>
                                                                    <h6 className='text-muted text-sm'>{attachment?.attachment_type}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div></div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h2 className="font-semibold text-xl mb-2">Score</h2>
                                    <div className="form-control flex justify-between items-center">
                                        <input className="flex-1 outline-none" name="score" value={studentWorkGrade?.score} onChange={handleChange} />
                                        <div className=''>/ {studentSubmission?.school_work?.points}</div>
                                    </div>

                                    <button className="btn btn-primary mt-3 w-full" type='button' onClick={handleSubmitStudentGrade}>Submit Score</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    )
}
