"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import student from '../../../public/student.png';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';

export default function page() {

    const [visibilityContent, setVisibilityContent] = useState('public');

    const fetchUserInstitute = async () => {
        const response = await axios.post(``);
    }

    const handleVisibilityRadioChange = async (e) => {
        const visibility = e.target.value;
        if (visibility == 'private') {

        }
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
                                <form >
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
                                    <div className={`grid grid-cols-2 gap-3 ${visibilityContent}`}>
                                        <div className={`form-group`}>
                                            <label className='form-label font-bold'>Institute</label>
                                            <select className='form-control my-2'>
                                                <option className=''>-- SELECT INSTITUTE --</option>
                                            </select>
                                        </div>
                                        <div className={`form-group`}>
                                            <label className='form-label font-bold'>Course</label>
                                            <select className='form-control my-2'>
                                                <option className=''>-- SELECT COURSE --</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className='form-group'>
                                        <label className='form-label font-bold'>Title</label>
                                        <input className='form-control my-2' />
                                    </div>
                                    <div></div>
                                    <div className='form-group'>
                                        <label className='form-label font-bold'>Content</label>
                                        <textarea className='form-control my-2' style={{ height: "150px" }} rows={20} cols={20}></textarea>
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label font-bold'>Images</label>
                                        <input className='form-control my-2' type='file' multiple />
                                    </div>
                                    <button className='w-full btn btn-primary'>Post and Upload</button>
                                </form>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className='flex flex-col gap-5 mt-4'>
                {/* Forum */}
                <div className='border border-black p-4 hover-shadow cursor-pointer'>
                    <div className='flex items-start justify-between'>
                        <div className='w-auto'>
                            <Image className="rounded-full shadow object-cover w-10 h-10 bg-white border border-black" src={student} alt="Image Description"></Image>
                        </div>
                        <div className='px-3 flex-1'>
                            <div className='forum-content'>
                                <div className='flex items-center gap-4'>
                                    <h3 className='text-lg font-bold'>James Garnfil</h3>
                                    <span className='text-muted text-xs'>2 hours ago</span>
                                </div>
                                <p>This elective course offers an in-depth exploration of web development technologies and practices.
                                    Students will learn the essential skills to build dynamic and responsive websites using modern programming languages and frameworks.
                                    The course covers both front-end and back-end development,
                                    focusing on HTML, CSS, JavaScript, and libraries such as React and Vue.js.
                                </p>
                            </div>
                            <div className='flex gap-3 items-start mt-5'>
                                <span><i className="bi bi-chat-fill"></i> 21</span>
                                <span><i className="bi bi-hand-thumbs-up"></i> 150</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Forum */}
                <div className='border border-black p-4 hover-shadow cursor-pointer'>
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
                                    {/* Image */}
                                    <Image quality={100} className='object-cover w-[100px] h-[100px] border border-black' width={100} height={0} src={`https://plus.unsplash.com/premium_photo-1664391666703-e000bf477eb3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} />
                                </div>
                            </div>
                            <div className='flex gap-3 items-start mt-5'>
                                <span><i className="bi bi-chat-fill"></i> 21</span>
                                <span><i className="bi bi-hand-thumbs-up"></i> 150</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}