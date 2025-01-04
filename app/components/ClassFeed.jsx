"use client"
import React, { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import axios from 'axios';
import jsCookie from 'js-cookie';
import { format } from "date-fns";
import searchResult from '../../public/search-result.png';
import Image from 'next/image';

export default function ClassFeed(props) {
    const { classId } = props;
    const [schoolWorks, setSchoolWorks] = useState([]);
    const [modules, setModules] = useState([]);

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));

        const fetchClassSchoolWorks = async () => {
            const response = await axios.get(`http://192.168.56.1:8000/api/classes/${classId}/school-works`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`
                }
            });

            console.log(response.data);

            let schoolWorksList = response.data.school_works.map(school_work => {
                let url = "#";
                let points = 0;
                switch (school_work.type) {
                    case "assignment":
                        url = `/instructor/classes/${classId}/assignments/${school_work.id}/view`;
                        points = school_work.assignment.points;
                        break;

                    case "activity":
                        url = `/instructor/classes/${classId}/activities/${school_work.id}/view`;
                        points = school_work.activity.points;
                        break;

                    case "quiz":
                        url = `/instructor/classes/${classId}/quizzes/${school_work.id}/view`;
                        points = school_work.quiz.points;
                        break;

                    case "exam":
                        url = `/instructor/classes/${classId}/exams/${school_work.id}/view`;
                        points = school_work.exam.points;
                        break;

                    default:
                        url = `#`;
                        points = 0;
                        break;
                }
                return {
                    school_work,
                    url: url,
                    points: points,
                };
            })

            setSchoolWorks(schoolWorksList);
            setModules(response.data.modules);
        }

        fetchClassSchoolWorks();
    }, [])

    return (
        <div className=' text-base  overflow-auto class-stream-container'>
            <div className='flex justify-between items-center gap-3 px-6 py-3 bg-white border border-black'>
                <h2 className='text-2xl font-semibold'>Stream</h2>
            </div>
            <div className='relative w-full mt-4 overflow-y-auto flex flex-col gap-5'>
                {
                    modules.length > 0 ? (
                        modules.map(moduleData => (
                            <Link href={`/instructor/classes/${moduleData.class_id}/modules/${moduleData.id}/view`} key={moduleData.id}>
                                <div className='bg-white border border-black hover-shadow'>
                                    <div className='py-3 px-4 border-b border-black flex justify-between items-center'>
                                        <h3 className='text-lg font-semibold mb-2'>{moduleData.title}</h3>
                                        <div className='py-1 px-2 text-xs font-bold bg-secondary flex items-center rounded'>
                                            Module
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        schoolWorks.length < 1 && modules.length < 1 && (
                            <div className='flex justify-center items-center flex-col'>
                                <Image src={searchResult} width={400} />
                                <h3 className='text-xl text-center'>No results found. <br /> Add Modules or School Work to this Class.</h3>
                            </div>
                        )
                    )
                }
                {
                    schoolWorks.length > 0 ? (
                        schoolWorks.map(schoolWorkData => (
                            <Link href={`${schoolWorkData.url}`} key={schoolWorkData.school_work.id}>
                                <div className='bg-white border border-black hover-shadow'>
                                    <div className='py-3 px-4 border-b border-black flex justify-between items-center'>
                                        <h3 className='text-lg font-semibold mb-2'>{schoolWorkData.school_work.title}</h3>
                                        <div className='py-1 px-2 text-xs font-bold bg-secondary flex items-center rounded'>
                                            {schoolWorkData.school_work.type}
                                        </div>
                                    </div>
                                    <div className='py-3 px-4'>
                                        <p className='text-sm'><span className='font-bold'>Due:</span> {format(schoolWorkData.school_work.due_datetime, 'MMM dd, yyyy')}</p>
                                        <p className='text-sm'><span className='font-bold'>Points:</span> {schoolWorkData.points}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div></div>
                    )
                }
            </div>
        </div >
    )
}
