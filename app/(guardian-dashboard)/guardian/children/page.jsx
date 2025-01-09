"use client";

import React, { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import userProfileAvatar from "../../../../public/user-profile.jpg";
import Image from "next/image";

export default function ChildrenPage() {
    const [authSession, setAuthSession] = useState({});
    const [currentStudentTab, setCurrentStudentTab] = useState("profile");
    const [currentStudent, setCurrentStudent] = useState(null);
    const [students, setStudents] = useState([]);
    const [selectedStudentGrades, setSelectedStudentGrades] = useState([]);

    const fetchGuardianChildren = async (session) => {
        try {
            const response = await axios.get(`https://my-cdm.godesqsites.com/api/guardians/${session?.user?.id}/children`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${session?.token}`,
                },
            });

            setStudents(response.data.students);
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    };

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
        fetchGuardianChildren(session);
    }, []);

    const getStudentFinalGrade = async (student_id) => {
        try {
            const response = await axios.get(`https://my-cdm.godesqsites.com/api/students/${student_id}/classes/final-grades`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authSession?.token}`,
                },
            });

            setSelectedStudentGrades(response.data.final_grades);
            setCurrentStudent(response.data.student);
        } catch (error) {
            toast.error(error.message ?? "Server Error");
            console.log(error);
        }
    };

    return (
        <div className="container-fluid w-full">
            <div className="flex justify-between flex-col xl:flex-row items-start gap-3 w-full">
                <div className="xl:w-[30%] w-full border border-black rounded">
                    <div className="children-sidebar p-4 ">
                        <h2 className="text-2xl">Children</h2>
                        <div className="flex flex-col mt-3">
                            {students?.length > 0 ? (
                                students?.map((student) => (
                                    <div
                                        className="py-1.5 px-2 rounded border border-black flex items-center justify-between gap-3 hover:bg-green-50 cursor-pointer"
                                        onClick={() => getStudentFinalGrade(student.id)}
                                        key={student.id}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Image src={userProfileAvatar} width={0} height={0} className="size-10 rounded-lg" alt="app image" />
                                            <div className="flex flex-col">
                                                <h4 className="text-sm font-medium whitespace-nowrap text-ellipsis overflow-hidden w-36 sm:w-60 xl:w-36">
                                                    {student.firstname} {student.lastname}
                                                </h4>
                                                <span className="text-xs">{student.student_id}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="xl:w-[70%] w-full">
                    {currentStudent ? (
                        <div>
                            <div className="border-black rounded-lg border bg-gradient-to-r from-green-800 to-secondary overflow-hidden">
                                <div className="group h-40 sm:h-60 overflow-hidden relative border-b border-black"></div>
                                <div className="flex flex-col sm:flex-row items-center sm:gap-4 mb-2">
                                    <div className="relative flex sm:inline-flex flex-col gap-1.5  items-center sm:items-start sm:ms-12 -mt-6">
                                        <a className="group" href="javascript:;">
                                            <Image src={userProfileAvatar} className="rounded-full size-24 bg-neutral-400 border-solid border-black border -mt-3" />
                                        </a>
                                        <h3 className="font-semibold [text-shadow:2px_2px_4px_var(--tw-shadow-color)] shadow-lime-200 dark:shadow-lime-700 sm:text-xl sm:raiytahskcn sm:-end-28 sm:-top-3">
                                            Ari Budin
                                        </h3>
                                    </div>

                                    <div className="flex sm:inline-flex items-center justify-center">
                                        <a
                                            href="#"
                                            className={`active ${currentStudentTab == "profile" ? "text-secondary" : "text-white"} flex items-center py-2 px-3 gap-1.5 font-medium hover:text-secondary`}
                                            onClick={(e) => setCurrentStudentTab("profile")}
                                        >
                                            <i className="bi bi-person-fill max-md:text-2xl"></i>
                                            <span className="hidden md:block">Profile</span>
                                        </a>
                                        {/* <a href="message.html" className="text-white flex items-center py-2 px-3 gap-1.5 font-medium hover:text-secondary">
                                    <i className="bi bi-envelope-fill max-md:text-2xl"></i>
                                    <span className="hidden md:block">School Works</span>
                                </a> */}
                                        <a
                                            href="#"
                                            className={`active ${currentStudentTab == "grades" ? "text-secondary" : "text-white"} flex items-center py-2 px-3 gap-1.5 font-medium hover:text-secondary`}
                                            onClick={(e) => setCurrentStudentTab("grades")}
                                        >
                                            <i className="bi bi-1-square-fill max-md:text-2xl"></i>
                                            <span className="hidden md:block">Grades</span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className={`${currentStudentTab == "profile" ? "block" : "hidden"} border-black rounded-lg border py-8 px-6 text-base bg-white min-h-[50vh] mt-4`}>
                                <div className="flex flex-col gap-8">
                                    <div className="relative">
                                        <h2 className="text-lg font-semibold mb-3">Personal Information</h2>
                                        <div className="w-full overflow-y-auto">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row" className="text-start py-2">
                                                            Full Name :
                                                        </th>
                                                        <td className="text-neutral-500 dark:text-neutral-400 ps-6 py-2">
                                                            {currentStudent.firstname} {currentStudent.lastname}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="text-start py-2">
                                                            Student ID :
                                                        </th>
                                                        <td className="text-neutral-500 dark:text-neutral-400 ps-6 py-2">{currentStudent.student_id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="text-start py-2">
                                                            Email :
                                                        </th>
                                                        <td className="text-neutral-500 dark:text-neutral-400 ps-6 py-2">{currentStudent.email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="text-start py-2">
                                                            Year Level & Section :
                                                        </th>
                                                        <td className="text-neutral-500 dark:text-neutral-400 ps-6 py-2">
                                                            {currentStudent.year_level} & {currentStudent.section}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="text-start py-2">
                                                            Institute :
                                                        </th>
                                                        <td className="text-neutral-500 dark:text-neutral-400 ps-6 py-2">{currentStudent?.institute?.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row" className="text-start py-2">
                                                            Course :
                                                        </th>
                                                        <td className="text-neutral-500 dark:text-neutral-400 ps-6 py-2">{currentStudent?.course?.name}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${currentStudentTab == "grades" ? "block" : "hidden"} border border-black rounded-lg py-8 px-6 bg-white mt-4 overflow-auto`}>
                                <div className="btn btn-primary my-3">Prelim Grade</div>

                                <table className="min-w-full divide-y divide-black border border-black bg-white text-wrap">
                                    <thead className="bg-neutral-200 dark:bg-neutral-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-black uppercase ">
                                                Class Name
                                            </th>
                                            <th>Final Grade</th>
                                        </tr>
                                    </thead>

                                    <tbody className="text-sm text-wrap">
                                        {selectedStudentGrades.length > 0 ? (
                                            selectedStudentGrades.map((class_grade, index) => (
                                                <tr key={index} className="*:px-6 *:py-4 *:whitespace-nowrap text-center">
                                                    <td>
                                                        <div className="text-start">{class_grade?.classroom?.title}</div>
                                                    </td>
                                                    <td>
                                                        <span className="text-neutral-500 dark:text-neutral-300 text-sm">
                                                            {class_grade.final_grade ? class_grade.final_grade + "%" : "No Grade"} / 100%
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr className="*:px-6 *:py-4 *:whitespace-nowrap text-center">
                                                <td colSpan="2">Student Final Grades Not Available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div>No Current Student Available</div>
                    )}
                </div>
            </div>
        </div>
    );
}
