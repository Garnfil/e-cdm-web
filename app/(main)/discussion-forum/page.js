"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import student from '../../../public/student.png';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function page() {
    const router = useRouter();
    const [authSession, setAuthSession] = useState(null);
    const [visibilityContent, setVisibilityContent] = useState('');
    const [userInstitute, setUserInstitute] = useState({});
    const [userCourse, setUserCourse] = useState({});
    const [discussions, setDiscussions] = useState([]);


    const fetchDiscussions = async (session) => {
        try {
            const response = await axios.get(`https://e-learn.godesqsites.com/api/discussions`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session?.token}`,
                }
            });

            setDiscussions(response.data.discussions);

        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    useEffect(() => {
        let session = jsCookie.get("session") ? JSON.parse(jsCookie.get("session")) : null;
        setAuthSession(session);

        fetchDiscussions(session);
    }, [])

    const fetchUserInstitute = async () => {
        try {
            const response = await axios.get(`https://e-learn.godesqsites.com/api/institutes/${authSession?.user?.institute_id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${authSession.token}`,
                }
            });

            setUserInstitute(response.data.institute);

        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    const fetchUserCourse = async () => {
        try {
            const response = await axios.get(`https://e-learn.godesqsites.com/api/courses/${authSession?.user?.course_id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${authSession.token}`,
                }
            });

            setUserCourse(response.data.course);
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }

    }

    const handleVisibilityRadioChange = async (e) => {
        const visibility = e.target.value;
        if (visibility == 'private') {
            fetchUserInstitute();
            fetchUserCourse();
        }


        setVisibilityContent(e.target.value);
    }

    const handleSubmitDiscussion = async (e) => {
        e.preventDefault();

        try {
            let formData = new FormData(e.target);
            const response = await axios.post(`https://e-learn.godesqsites.com/api/discussions`, formData, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${authSession?.token}`,
                    "Content-Type": "multipart/form-data",
                }
            });

            toast.success("Added");
            fetchDiscussions(authSession)
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    const handleClickDiscussion = async (discussion_id) => {
        router.push(`/discussion-forum/${discussion_id}`);
    }

    if (!authSession) {
        return (
            <div className='text-center mt-4'>You need to login first.</div>
        )
    }

    return (
        <div className='max-width-container py-4'>
            <div className='flex justify-between items-center my-3'>
                <h2 className='text-2xl font-bold'>Discussions</h2>
                <div className='flex gap-3'>
                    <button className='btn btn-secondary hover-shadow'><i className="bi bi-filter"></i> Filter</button>
                    <Dialog>
                        <DialogTrigger className='btn btn-primary hover-shadow'><i className="bi bi-plus-lg"></i> Add New Discussion</DialogTrigger>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                <DialogTitle className="mb-5">New Discussion</DialogTitle>
                                <form onSubmit={handleSubmitDiscussion}>
                                    <input type='hidden' name='user_id' value={authSession?.user?.id} />
                                    <input type='hidden' name='user_type' value={authSession?.user?.role} />
                                    <div className='form-group'>
                                        <label className='form-label font-bold'>Visibility</label>
                                        <div className='form-check'>
                                            <input type='radio' name='visibility' value="public" id='public-radio' onChange={handleVisibilityRadioChange} />
                                            <label htmlFor='public-radio' className='inline-block ml-2'>Public</label>
                                        </div>
                                        <div className='form-check'>
                                            <input type='radio' name='visibility' value="private" id='private-radio' onChange={handleVisibilityRadioChange} />
                                            <label htmlFor='private-radio' className='inline-block ml-2'>Private</label>
                                        </div>
                                    </div>
                                    <div className={`grid grid-cols-2 gap-3 ${visibilityContent == "public" ? "hidden" : ""}`}>
                                        <div className={`form-group`}>
                                            <label className='form-label font-bold'>Institute</label>
                                            <select className='form-control my-2' name='institute_id' readonly value={userInstitute?.id}>
                                                <option className=''>-- SELECT INSTITUTE --</option>
                                                {
                                                    Object.keys(userInstitute).length > 0 && (
                                                        <option value={userInstitute.id}>{userInstitute.name}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className={`form-group`}>
                                            <label className='form-label font-bold'>Course</label>
                                            <select className='form-control my-2' name='course_id' value={userCourse?.id}>
                                                <option className=''>-- SELECT COURSE --</option>
                                                {
                                                    Object.keys(userCourse).length > 0 && (
                                                        <option value={userCourse.id}>{userCourse.name}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label className='form-label font-bold'>Title</label>
                                        <input className='form-control my-2' name='title' />
                                    </div>
                                    <div></div>
                                    <div className='form-group'>
                                        <label className='form-label font-bold'>Content</label>
                                        <textarea className='form-control my-2' style={{ height: "150px" }} name='discussion_content' rows={20} cols={20}></textarea>
                                    </div>
                                    {/* <div className='form-group'>
                                        <label className='form-label font-bold'>Images</label>
                                        <input className='form-control my-2' type='file' multiple name='images[]' />
                                    </div> */}
                                    <button className='w-full btn btn-primary'>Post and Upload</button>
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className='flex flex-col gap-5 mt-4'>
                {
                    discussions.length > 0 ? (
                        discussions.map(discussion => (
                            <div className='border border-black p-4 hover-shadow cursor-pointer' key={discussion.id} onClick={() => handleClickDiscussion(discussion.id)}>
                                <div className='flex items-start justify-between'>
                                    <div className='w-auto'>
                                        <Image className="rounded-full shadow object-cover w-10 h-10 bg-white border border-black" src={student} alt="Image Description"></Image>
                                    </div>
                                    <div className='px-3 flex-1'>
                                        <div className='forum-content'>
                                            <div className='flex items-center gap-4'>
                                                <h3 className='text-lg font-bold'>{discussion?.user?.firstname} {discussion?.user?.lastname}</h3>
                                                <span className='text-muted text-xs'>2 hours ago</span>
                                            </div>
                                            <h3 className='mt-3 font-bold text-lg'>{discussion?.title}</h3>
                                            <p className='text-sm'>
                                                {discussion?.content}
                                            </p>
                                        </div>
                                        <div className='flex gap-3 items-start mt-5'>
                                            <span><i className="bi bi-chat-fill"></i> 21</span>
                                            <span><i className="bi bi-hand-thumbs-up"></i> 150</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No Disscussion Found</div>
                    )
                }


                {/* <div className='border border-black p-4 hover-shadow cursor-pointer'>
                    <div className='flex items-start justify-between'>
                        <div className='w-auto'>
                            <Image className="rounded-full shadow object-cover w-10 h-10 bg-white border border-black" src={student} alt="Image Description"></Image>
                        </div>
                        <div className='px-3 flex-1'>
                            <div className='forum-content'>
                                <div className='flex items-center gap-4'>
                                    <h3 className='text-lg font-bold'>Bryan Mortel</h3>
                                    <span className='text-muted text-xs'>2 hours ago</span>
                                </div>
                                <p>This elective course offers an in-depth exploration of web development technologies and practices.
                                    Students will learn the essential skills to build dynamic and responsive websites using modern programming languages and frameworks.
                                    The course covers both front-end and back-end development,
                                    focusing on HTML, CSS, JavaScript, and libraries such as React and Vue.js.
                                </p>
                                <div className='flex justify-start items-center gap-3 my-3'>
                                    <Image quality={100} className='object-cover w-[100px] h-[100px] border border-black' width={100} height={0} src={`https://plus.unsplash.com/premium_photo-1664391666703-e000bf477eb3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} />
                                </div>
                            </div>
                            <div className='flex gap-3 items-start mt-5'>
                                <span><i className="bi bi-chat-fill"></i> 21</span>
                                <span><i className="bi bi-hand-thumbs-up"></i> 150</span>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
