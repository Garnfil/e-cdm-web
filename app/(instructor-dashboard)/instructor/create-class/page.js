"use client"
import axios from 'axios';
import jsCookie from 'js-cookie';
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";

export default function CreateClassPage() {
    const router = useRouter();

    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [authSession, setAuthSession] = useState({});
    const [classDetails, setClassDetails] = useState({
        semester: '1st',
        subject_id: '',
        section_id: '',
        instructor_id: '',
        description: '',
        current_assessment_category: 'prelim',
    })

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
        setClassDetails(prevDetails => ({
            ...prevDetails,
            instructor_id: session.user.id,
        }))

        const fetchSubjects = async () => {
            const response = await axios.get('https://e-learn.godesqsites.com/api/subjects', {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${session.token}`,
                }
            });

            const fetchedSubjects = response.data.sections;
            setSubjects(fetchedSubjects);
        }

        fetchSubjects();
    }, []);

    const fetchSections = async (year_level = 1) => {
        const response = await axios.get(`https://e-learn.godesqsites.com/api/sections?year_level=${year_level}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authSession.token}`
            }
        });

        const fetchedSections = response.data.sections;
        setSections(fetchedSections);
    }

    const handleYearLevelChanged = (e) => {
        const year_level = e.target.value;
        fetchSections(year_level);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setClassDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const handleSubmitBtnClicked = async () => {
        const response = await axios.post('https://e-learn.godesqsites.com/api/classes', classDetails, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authSession.token}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.status == 200) {
            router.push('/instructor/classes');
        }
    }


    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Create Class</h2>
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
                                <a href="#" className="hover:underline font-bold">Create Class</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes'} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left"></i> Back to List</Link>
            </div>

            <form>
                <div className='flex justify-between items-start my-3 gap-4'>
                    <div className='w-[65%] border border-black p-5 bg-white'>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='form-group '>
                                <label className='mb-2 block'>Year</label>
                                <select className='form-control' onChange={handleYearLevelChanged}>
                                    <option value="">-- SELECT YEAR LEVEL --</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                </select>
                            </div>
                            <div className='form-group '>
                                <label className='mb-2 block'>Section</label>
                                <select className='form-control' name='section_id' onChange={handleChange} value={classDetails.section_id}>
                                    <option value="">-- SELECT SECTION --</option>
                                    {
                                        sections.length > 0 && (
                                            sections.map(section => (
                                                <option key={section.id} value={section.id}>{section.name}</option>
                                            ))
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block font-bold'>Description (optional)</label>
                            <textarea className='form-control'
                                rows={10}
                                cols={10}
                                style={{ height: '200px' }}
                                name='description'
                                onChange={handleChange}
                                value={classDetails.description}>
                            </textarea>
                        </div>
                    </div>
                    <div className='w-[35%] bg-white'>
                        <div className='border border-black p-5'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                <div className='form-group col-span-2'>
                                    <label className='mb-2 block'>Subject</label>
                                    <select className='form-control' name='subject_id' onChange={handleChange} value={classDetails.subject_id}>
                                        <option value="">-- SELECT SUBJECT --</option>
                                        {
                                            subjects.length > 0 && (
                                                subjects.map(subject => (
                                                    <option key={subject.id} value={subject.id}>{subject.title}</option>
                                                ))
                                            )
                                        }
                                    </select>
                                </div>
                                <div className='form-group col-span-2'>
                                    <label className='form-label'>Semester</label>
                                    <select className='form-control mt-2' name='semester' onChange={handleChange} value={classDetails.semester}>
                                        <option value="1st">1st</option>
                                        <option value="2nd">2nd</option>
                                    </select>
                                </div>
                                <div className='form-group col-span-2'>
                                    <label className='form-label'>Current Assessment Category</label>
                                    <select className='form-control mt-2' name='current_assessment_category' onChange={handleChange} value={classDetails.current_assessment_category}>
                                        <option value="prelim">Prelim</option>
                                        <option value="midterm">Midterm</option>
                                        <option value="finals">Finals</option>
                                    </select>
                                </div>
                            </div>
                            <button className='w-full btn btn-primary' type="button" onClick={handleSubmitBtnClicked}>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
