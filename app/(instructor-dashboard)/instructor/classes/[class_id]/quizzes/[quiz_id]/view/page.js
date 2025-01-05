"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import jsCookie from 'js-cookie';
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateQuizPage() {
    const params = useParams();
    const router = useRouter();

    const { quiz_id, class_id } = params;
    const [instructorId, setInstructorId] = useState(0);
    const [authSession, setAuthSession] = useState({});
    const [quizDetails, setQuizDetails] = useState({
        class_id: "",
        instructor_id: "",
        title: "",
        description: "",
        type: "quiz",
        status: "posted",
        quiz_id: "",
        points: "",
        assessment_type: "",
        notes: "",
        quiz_type: "",
        due_datetime: "",
        has_quiz_form: false,
        attachments: [],
    });

    const fetchQuizDetails = async (session) => {
        const response = await axios.get(`http://192.168.100.44:8000/api/school-works/${quiz_id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session.token}`
            }
        });

        setQuizDetails({
            school_work_id: response.data.school_work.id,
            class_id: response.data.school_work.class_id,
            instructor_id: response.data.school_work.instructor_id,
            title: response.data.school_work.title,
            description: response.data.school_work.description,
            type: response.data.school_work.type,
            status: response.data.school_work.status,
            quiz_id: response.data.school_work.quiz.id,
            points: response.data.school_work.quiz.points,
            assessment_type: response.data.school_work.quiz.assessment_type,
            notes: response.data.school_work.quiz.notes,
            quiz_type: response.data.school_work.quiz.quiz_type,
            due_datetime: response.data.school_work.due_datetime,
            has_quiz_form: response.data.school_work.quiz.has_quiz_form,
            attachments: response.data.school_work.attachments,
        });

        // fetchSubmittedAssignments(session, response.data.school_work.assignment.id);
    }

    useEffect(() => {
        const session = JSON.parse(jsCookie.get('session'));
        setAuthSession(session);
        setInstructorId(session.user.id);
        fetchQuizDetails(session);

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://192.168.100.44:8000/api/quizzes/${quizDetails.quiz_id}`, quizDetails, {
                headers: {
                    'Accept': "application/json",
                    'Authorization': `Bearer ${authSession.token}`,
                }
            });

            console.log(response);

            if (response.status == 200) {
                toast.success("Quiz Updated Successfully");
                fetchQuizDetails(authSession);
            }
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name == "has_quiz_form") {
            setQuizDetails(prevDetails => ({
                ...prevDetails,
                has_quiz_form: e.target.checked ?? false,
            }))
        } else {
            // Dynamically update the state property using the name of the input
            setQuizDetails(prevDetails => ({
                ...prevDetails,
                [name]: value
            }));
        }
    };

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Quiz</h2>
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
                                <a href="#" className="font-bold">View Quiz</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes/1'} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Class</Link>
            </div>
            <form method='POST' onSubmit={handleSubmit}>
                <input type="hidden" name="class_id" value={class_id} />
                <input type="hidden" name="instructor_id" value={instructorId} />
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    <div className='xl:col-span-2'>
                        <div className='border border-black py-2 px-3 mb-5'>
                            <div className='form-group'>
                                <label className='mb-2 block font-bold'>Title</label>
                                <input className='form-control' name='title' value={quizDetails.title} onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label className='mb-2 block font-bold'>Instructions (optional)</label>
                                <textarea className='form-control'
                                    rows={10}
                                    cols={10}
                                    style={{ height: '200px' }}
                                    name='description'
                                    value={quizDetails.description}
                                    onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <div className='border border-black py-2 px-3'>
                            <h3 className='font-bold'>Attach</h3>
                            <div className='flex justify-center items-center gap-5'>
                                <div className='flex flex-col justify-center items-center gap-1'>
                                    <button type='button' className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black hover-shadow">
                                        <i className="bi bi-file-earmark-arrow-up-fill text-2xl"></i>
                                    </button>
                                    <h6>Upload</h6>
                                </div>
                                <div className='flex flex-col justify-center items-center gap-1'>
                                    <button type='button' className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black hover-shadow">
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
                                    <label className='mb-2 block font-bold'>Points</label>
                                    <input className='form-control' name='points' onChange={handleChange} value={quizDetails.points} />
                                </div>
                                <div className='form-group col-span-2'>
                                    <label className='mb-2 block'>Quiz Type</label>
                                    <select className="form-control" name="quiz_type" onChange={handleChange} value={quizDetails.quiz_type}>
                                        <option value="">-- SELECT QUIZ TYPE --</option>
                                        <option value="long">Long</option>
                                        <option value="short">Short</option>
                                    </select>
                                </div>
                                <div className='form-group col-span-2'>
                                    <label className='mb-2 block font-bold'>Due</label>
                                    <input className='form-control' type='datetime-local' name='due_datetime' value={quizDetails.due_datetime} onChange={handleChange} />
                                </div>
                                <div className='form-group'>
                                    <input type='checkbox' name='has_quiz_form' value={1} checked={quizDetails.has_quiz_form ? true : false} className='mr-2' onChange={handleChange} />
                                    <label>Generate Quiz Form?</label>
                                </div>
                                {/* <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Assigned To</label>
                                <div className='border border-black hover-shadow p-3 rounded'>
                                    All Students
                                </div>
                            </div> */}
                            </div>
                            <button className='w-full btn btn-primary'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
