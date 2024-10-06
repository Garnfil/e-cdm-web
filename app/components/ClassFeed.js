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

export default function ClassFeed(props) {
    const { classId } = props;
    const [schoolWorks, setSchoolWorks] = useState([]);

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));

        const fetchClassSchoolWorks = async () => {
            const response = await axios.get(`http://127.0.0.1:8000/api/classes/${classId}/school-works`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`
                }
            });

            let schoolWorksList = response.data.school_works.map(school_work => {
                let url = "#";
                switch (school_work.type) {
                    case "assignment":
                        url = `/instructor/classes/${classId}/assignments/${school_work.id}/view`;
                        break;

                    case "activity":
                        url = `/instructor/classes/${classId}/activities/${school_work.id}/view`;
                        break;

                    case "quiz":
                        url = `/instructor/classes/${classId}/quizzes/${school_work.id}/view`;
                        break;

                    case "exam":
                        url = `/instructor/classes/${classId}/exams/${school_work.id}/view`;
                        break;

                    default:
                        url = `#`;
                        break;
                }
                return {
                    school_work,
                    url: url
                };
            })

            console.log(schoolWorksList);

            setSchoolWorks(schoolWorksList);
        }

        fetchClassSchoolWorks();
    }, [])

    return (
        <div className=' text-base max-h-[70vh] overflow-auto class-stream-container'>
            <div className='flex justify-between items-center gap-3 px-6 py-3 bg-white border border-black'>
                <h2 className='text-2xl font-semibold'>Stream</h2>
                <div className='relative'>
                    <DropdownMenu>
                        <DropdownMenuTrigger className='btn btn-primary'>Create <i className='bi bi-plus-lg'></i></DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-primary text-white">
                            <DropdownMenuLabel>School Works</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white" />
                            <DropdownMenuItem>
                                <Link href={'/instructor/classes/1/modules/create'}>
                                    Modules
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={'/instructor/classes/1/assignments/create'}>
                                    Assignment
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={'/instructor/classes/1/quizzes/create'}>
                                    Quiz
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={'/instructor/classes/1/activities/create'}>
                                    Activity
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href={'/instructor/classes/1/exams/create'}>
                                    Exam
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* <button className='btn btn-primary hover-shadow'>Create <i className="bi bi-plus-lg"></i></button> */}
                </div>
            </div>
            <div className='relative w-full mt-4 overflow-y-auto flex flex-col gap-3'>
                {
                    schoolWorks.length > 0 ? (
                        schoolWorks.map(schoolWorkData => (
                            <Link href={`${schoolWorkData.url}`}>
                                <div className='bg-white border border-black hover-shadow'>
                                    <div className='py-3 px-4 border-b border-black flex justify-between items-center'>
                                        <h3 className='text-lg font-semibold mb-2'>{schoolWorkData.school_work.title}</h3>
                                        <div className='py-1 px-2 text-xs font-bold bg-secondary flex items-center rounded'>
                                            {schoolWorkData.school_work.type}
                                        </div>
                                    </div>
                                    <div className='py-3 px-4'>
                                        <p className='text-sm'>{schoolWorkData.school_work.description}</p>
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
