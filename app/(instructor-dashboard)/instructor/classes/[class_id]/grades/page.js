"use client"

import Link from 'next/link'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function page() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Class Grade</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="font-bold">Class Grade</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes/1'} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Class</Link>
            </div>

            <div className='my-3'>
                <div className='my-4'>
                    <Select >
                        <SelectTrigger className="w-[180px] bg-primary text-white" >
                            <SelectValue placeholder="Assessment Type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectItem value="prelim">Prelim</SelectItem>
                            <SelectItem value="midterm">Midterm</SelectItem>
                            <SelectItem value="finals">Finals</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <table className="bg-white table-auto w-full  border border-black text-sm">
                    <thead>
                        <tr>
                            <th className="border border-black px-4 py-2">Student</th>

                            {/* Assignments */}
                            <th colSpan="5" className="border border-black px-4 py-2">
                                Assignments
                            </th>

                            {/* Total of Assignments */}
                            <th className='bg-primary text-white border border-black px-4 py-2'>Avg. Ass</th>

                            {/* Quizzes */}
                            <th colSpan="5" className="border border-black px-4 py-2">
                                Quizzes
                            </th>

                            {/* Total of Quizzes */}
                            <th className='bg-primary text-white border border-black px-4 py-2'>Avg. Quiz</th>

                            {/* Activities */}
                            <th colSpan="5" className="border border-black px-4 py-2">
                                Activities
                            </th>

                            {/* Avg of Activities */}
                            <th className='bg-primary text-white border border-black px-4 py-2'>Avg. Act</th>

                            {/* Exams */}
                            <th colSpan="1" className="border border-black px-4 py-2">
                                Exams
                            </th>

                            {/* Avg of Exams */}
                            <th className='bg-primary text-white border border-black px-4 py-2'>Avg. Exam</th>

                            {/* Attendance */}
                            <th colSpan="1" className="border border-black px-4 py-2">
                                Attendance
                            </th>

                            {/* Avg of Activities */}
                            <th className='bg-primary text-white border border-black px-4 py-2'>Avg. Activity</th>

                            {/* Initial Grade */}
                            <th className='bg-primary text-white border border-black px-4 py-2'>I. Grade</th>

                            {/* Initial Grade */}
                            <th className='bg-primary text-white border border-black px-4 py-2'>F. Grade</th>
                        </tr>
                        <tr>
                            {/* Empty space for "Student" column */}
                            <th className="border border-black px-4 py-2">-</th>

                            {/* Total Scores for Assignments */}
                            <th className="border border-black px-4 py-2">20</th>
                            <th className="border border-black px-4 py-2">15</th>
                            <th className="border border-black px-4 py-2">25</th>
                            <th className="border border-black px-4 py-2">50</th>
                            <th className="border border-black px-4 py-2">100</th>

                            <th className='bg-lime-50 border border-black'>10%</th>

                            {/* Total Scores for Quizzes */}
                            <th className="border border-black px-4 py-2">20</th>
                            <th className="border border-black px-4 py-2">15</th>
                            <th className="border border-black px-4 py-2">25</th>
                            <th className="border border-black px-4 py-2">50</th>
                            <th className="border border-black px-4 py-2">100</th>

                            <th className='bg-lime-50 border border-black'>20%</th>

                            {/* Total Scores for Activities */}
                            <th className="border border-black px-4 py-2">20</th>
                            <th className="border border-black px-4 py-2">15</th>
                            <th className="border border-black px-4 py-2">25</th>
                            <th className="border border-black px-4 py-2">50</th>
                            <th className="border border-black px-4 py-2">100</th>

                            <th className='bg-lime-50 border border-black'>35%</th>

                            {/* Total Scores for Exams */}
                            <th className="border border-black px-4 py-2">20</th>

                            <th className='bg-lime-50 border border-black'>30%</th>

                            {/* Total Scores for Attendance */}
                            <th className="border border-black px-4 py-2">20</th>

                            <th className='bg-lime-50 border border-black'>5%</th>

                            {/* Initial Grade */}
                            <th className='bg-lime-50 border border-black'>100%</th>

                            {/* Final Grade */}
                            <th className='bg-lime-50 border border-black'>1 - 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-black px-4 py-2 font-bold">James Garnfil</td>

                            {/* Student Scores for Assignments */}
                            <td className="border border-black px-4 py-2 text-center">20</td>
                            <td className="border border-black px-4 py-2 text-center">15</td>
                            <td className="border border-black px-4 py-2 text-center">25</td>
                            <td className="border border-black px-4 py-2 text-center">50</td>
                            <td className="border border-black px-4 py-2 text-center">100</td>

                            <th className='border border-black'>210</th>

                            {/* Student Scores for Quizzes */}
                            <td className="border border-black px-4 py-2 text-center">20</td>
                            <td className="border border-black px-4 py-2 text-center">15</td>
                            <td className="border border-black px-4 py-2 text-center">25</td>
                            <td className="border border-black px-4 py-2 text-center">50</td>
                            <td className="border border-black px-4 py-2 text-center">100</td>

                            <th className='border border-black'>210</th>

                            {/* Student Scores for Activities */}
                            <td className="border border-black px-4 py-2 text-center">20</td>
                            <td className="border border-black px-4 py-2 text-center">15</td>
                            <td className="border border-black px-4 py-2 text-center">25</td>
                            <td className="border border-black px-4 py-2 text-center">50</td>
                            <td className="border border-black px-4 py-2 text-center">100</td>

                            <th className='border border-black'>210</th>

                            {/* Student Scores for Exams */}
                            <td className="border border-black px-4 py-2 text-center">20</td>

                            <td className='border border-black px-4 py-2 text-center'>20</td>

                            {/* Student Scores for Attendance */}
                            <td className="border border-black px-4 py-2 text-center">20</td>

                            <td className='border border-black px-4 py-2 text-center'>5%</td>

                            <td className='border border-black px-4 py-2 text-center'>85%</td>

                            <td className='border border-black text-center'>1.25</td>
                        </tr>
                        <tr>
                            <td className="border border-black px-4 py-2 font-bold">James Garnfil</td>

                            {/* Student Scores for Assignments */}
                            <td className="border border-black px-4 py-2 text-center">20</td>
                            <td className="border border-black px-4 py-2 text-center">15</td>
                            <td className="border border-black px-4 py-2 text-center">25</td>
                            <td className="border border-black px-4 py-2 text-center">50</td>
                            <td className="border border-black px-4 py-2 text-center">100</td>

                            <th className='border border-black'>210</th>

                            {/* Student Scores for Quizzes */}
                            <td className="border border-black px-4 py-2 text-center">20</td>
                            <td className="border border-black px-4 py-2 text-center">15</td>
                            <td className="border border-black px-4 py-2 text-center">25</td>
                            <td className="border border-black px-4 py-2 text-center">50</td>
                            <td className="border border-black px-4 py-2 text-center">100</td>

                            <th className='border border-black'>210</th>

                            {/* Student Scores for Activities */}
                            <td className="border border-black px-4 py-2 text-center">20</td>
                            <td className="border border-black px-4 py-2 text-center">15</td>
                            <td className="border border-black px-4 py-2 text-center">25</td>
                            <td className="border border-black px-4 py-2 text-center">50</td>
                            <td className="border border-black px-4 py-2 text-center">100</td>

                            <th className='border border-black'>210</th>

                            {/* Student Scores for Exams */}
                            <td className="border border-black px-4 py-2 text-center">20</td>

                            <td className='border border-black px-4 py-2 text-center'>20</td>

                            {/* Student Scores for Attendance */}
                            <td className="border border-black px-4 py-2 text-center">20</td>

                            <td className='border border-black px-4 py-2 text-center'>5%</td>

                            <td className='border border-black px-4 py-2 text-center'>85%</td>

                            <td className='border border-black text-center'>1.25</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div >
    )
}
