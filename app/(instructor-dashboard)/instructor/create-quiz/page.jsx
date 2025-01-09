"use client"

import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios';
import { toast } from 'react-toastify';
import Select from 'react-select'

export default function CreateQuizPage() {
    const params = useParams();
    const router = useRouter();

    const [authSession, setSession] = useState({});
    const [quizDetails, setQuizDetails] = useState({
        class_ids: [],
        instructor_id: "",
        title: "",
        description: "",
        type: "activity",
        status: "posted",
        points: "",
        assessment_type: "",
        quiz_type: "",
        notes: "",
        due_datetime: "",
        has_quiz_form: false,
    });

    const [instructorClasses, setInstructorClasses] = useState([]);


    useEffect(() => {
        const session = JSON.parse(jsCookie.get('session'));
        setQuizDetails(prevDetails => ({
            ...prevDetails,
            instructor_id: session.user.id,
        }))
        setSession(session);
        fetchInstructorClasses(session);
    }, [])

    const fetchInstructorClasses = async (session) => {
        const response = await axios.get(`https://my-cdm.godesqsites.com/api/instructors/${session?.user?.id}/classes`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${session.token}`,
                'Content-Type': 'application/json',
            }
        });

        const classes = response.data.classes.map(classroom => {
            return {
                value: classroom.id,
                label: classroom.title,
            }
        })

        setInstructorClasses(classes);
    }

    const handleSubmit = async () => {
        try {

            const response = await axios.post(`https://my-cdm.godesqsites.com/api/quizzes`, quizDetails, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authSession.token}`,
                    'Content-Type': 'application/json',
                }
            })

            if (response.status == 200) {
                router.push(`/instructor/classes`);
            }
        } catch (error) {
            toast.error("Failed! Check all the input fields.")
            console.log(error);
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setQuizDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const handleSelectClasses = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        setQuizDetails(prevDetails => ({
            ...prevDetails,
            class_ids: selectedValues,
        }));
    }

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Create Quiz</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="font-bold">Create Quiz</a>
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                <div className='xl:col-span-2'>
                    <div className='border border-black py-2 px-3 mb-5'>
                        <div className='form-group'>
                            <label className='mb-2 block'>Title</label>
                            <input className='form-control' name='title' value={quizDetails.title} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block'>Instructions (optional)</label>
                            <textarea className='form-control'
                                rows={10}
                                cols={10}
                                name='description'
                                style={{ height: '200px' }}
                                value={quizDetails.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <div className="mb-2 block">
                                <Select isMulti="true"
                                    options={instructorClasses}
                                    onChange={handleSelectClasses}
                                    classNames={{
                                        control: (state) => 'form-control h-auto '
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='xl:col-span-1'>
                    <div className='border border-black py-2 px-3'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Points</label>
                                <input className='form-control' name='points' value={quizDetails.points} onChange={handleChange} />
                            </div>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Quiz Type</label>
                                <input className='form-control' name='quiz_type' value={quizDetails.quiz_type} onChange={handleChange} />
                            </div>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Assessment Type</label>
                                <select className="form-control" name="assessment_type" value={quizDetails.assessment_type} onChange={handleChange}>
                                    <option value="">-- SELECT ASSESSMENT TYPE --</option>
                                    <option value="prelim">Prelim</option>
                                    <option value="midterm">Midterm</option>
                                    <option value="finals">Finals</option>
                                </select>
                            </div>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Due</label>
                                <input className='form-control' name='due_datetime' type='datetime-local' value={quizDetails.due_datetime} onChange={handleChange} />
                            </div>
                        </div>
                        <button className='w-full btn btn-primary' type='button' onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
