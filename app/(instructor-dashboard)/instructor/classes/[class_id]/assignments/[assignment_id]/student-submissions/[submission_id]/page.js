import Link from 'next/link'
import React from 'react'

export default function StudentSubmissionPage() {
    return (
        <div className="container-fluid">
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Student Submission</h2>
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
                                <a href="#" className="hover:underline">Assignment</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="font-bold">Student Submission</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes/1/assignments/1/view'} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Assignment</Link>
            </div>

            <div className="my-3">
                <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2">
                        <div className="border border-black bg-white p-4" style={{ height: "calc(100vh - 200px)" }}>
                            <div className="border border-black h-full">
                                <iframe frameborder="0" scrolling="yes" width="100%" height="100%"
                                    src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" name="imgbox" id="imgbox">
                                </iframe>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="border border-black bg-white">
                            <div className="border-b border-black  p-4">
                                <h2 className="font-semibold text-xl">Assignment Details</h2>
                                <h4 className="my-2"><span className="font-bold">Title: </span>Assignment #1</h4>
                                <h4 className="my-2"><span className="font-bold">Due Date: </span>Oct 5, 7:00 AM</h4>
                                <h4 className="my-2"><span className="font-bold">Student Name: </span>James Garnfil</h4>
                            </div>
                            <div className="border-b border-black  p-4">
                                <div className="mb-4">
                                    <h2 className="font-semibold text-xl">Files</h2>
                                    <p>Submitted on Oct 5, 11:10 AM</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    {/* File Attachment */}
                                    <Link href="/instructor/classes/1/assignments/1/student-submissions/1">
                                        <div className='border border-black hover-shadow p-3 cursor-pointer'>
                                            <div className='flex justify-between items-start gap-3'>
                                                <div className='w-[15%] h-[45px] bg-secondary border border-black flex justify-center items-center p-2'>
                                                    <i className="bi bi-files-alt text-xl"></i>
                                                </div>
                                                <div className='w-[85%]'>
                                                    <h3 className='text-medium'>assignment-1-schoolattachment.pdf</h3>
                                                    <h6 className='text-muted text-sm'>File</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                    {/* File Attachment */}
                                    <Link href="/instructor/classes/1/assignments/1/student-submissions/1">
                                        <div className='border border-black hover-shadow p-3 cursor-pointer'>
                                            <div className='flex justify-between items-start gap-3'>
                                                <div className='w-[15%] h-[45px] bg-secondary border border-black flex justify-center items-center p-2'>
                                                    <i className="bi bi-files-alt text-xl"></i>
                                                </div>
                                                <div className='w-[85%]'>
                                                    <h3 className='text-medium'>assignment-1-schoolattachment-2.pdf</h3>
                                                    <h6 className='text-muted text-sm'>File</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4">
                                <h2 className="font-semibold text-xl mb-2">Points</h2>
                                <input className="form-control" name="points" value="50" />
                                <button className="btn btn-primary mt-3 w-full">Submit Points</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
