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

export default function ClassFeed(props) {
    const { classId } = props;
    const [schoolWorks, setSchoolWorks] = useState([]);
    const [modules, setModules] = useState([]);

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));

        const fetchClassSchoolWorks = async () => {
            const response = await axios.get(`https://app-digital-cdm.godesqsites.com/api/classes/${classId}/school-works`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`
                }
            });

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
                <div className='relative'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='btn btn-primary'>Create <i className='bi bi-plus-lg'></i></DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-primary text-white">
                            <DropdownMenuLabel>School Works</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white" />
                            <DropdownMenuItem>
                                <Link href={`/instructor/classes/${classId}/modules/create`}>
                                    Modules
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={`/instructor/classes/${classId}/assignments/create`}>
                                    Assignment
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={`/instructor/classes/${classId}/quizzes/create`}>
                                    Quiz
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={`/instructor/classes/${classId}/activities/create`}>
                                    Activity
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={`/instructor/classes/${classId}/exams/create`}>
                                    Exam
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* <button className='btn btn-primary hover-shadow'>Create <i className="bi bi-plus-lg"></i></button> */}
                </div>
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
                        <div></div>
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
