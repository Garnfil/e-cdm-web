"use client"
import React from 'react'
import whiteboardIcon from '../../../../public/whiteboard.png';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function InstructorWhiteBoardPage() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Whiteboard</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="font-bold">Whiteboard</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Dialog>
                    <DialogTrigger className='btn btn-primary hover-shadow'>
                        <i className="bi bi-plus-lg mr-1"></i> Create New Whiteboard
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle className="mb-4 border-b border-black py-3">Whiteboard Session</DialogTitle>
                            <DialogDescription>
                                <form>
                                    <div className='form-group'>
                                        <label className='form-label font-bold'>Session Code</label>
                                        <input className='form-control mt-2' value={'fdgbwj3423'} readOnly />

                                        <button className='btn btn-primary w-full mt-2'>Create <i className='bi bi-plus-lg ml-1'></i></button>
                                    </div>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>

            <div className='my-3'>
                <div className='grid grid-cols-4 gap-4'>
                    <div className='grid-cols-1 cursor-pointer'>
                        <div className='border border-black hover-shadow'>
                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                <Image src={whiteboardIcon} width={0} height={0} alt='whiteboard'></Image>
                            </div>
                            <div className='border-t-black border p-3 bg-white'>
                                <h4>Sample Whiteboard</h4>
                            </div>
                        </div>
                    </div>
                    <div className='grid-cols-1 cursor-pointer'>
                        <div className='border border-black hover-shadow'>
                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                <Image src={whiteboardIcon} width={0} height={0} alt='whiteboard'></Image>
                            </div>
                            <div className='border-t-black border p-3 bg-white'>
                                <h4>Sample Whiteboard</h4>
                            </div>
                        </div>
                    </div>
                    <div className='grid-cols-1 cursor-pointer'>
                        <div className='border border-black hover-shadow'>
                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                <Image src={whiteboardIcon} width={0} height={0} alt='whiteboard'></Image>
                            </div>
                            <div className='border-t-black border p-3 bg-white'>
                                <h4>Sample Whiteboard</h4>
                            </div>
                        </div>
                    </div>
                    <div className='grid-cols-1 cursor-pointer'>
                        <div className='border border-black hover-shadow'>
                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                <Image src={whiteboardIcon} width={0} height={0} alt='whiteboard'></Image>
                            </div>
                            <div className='border-t-black border p-3 bg-white'>
                                <h4>Sample Whiteboard</h4>
                            </div>
                        </div>
                    </div>
                    <div className='grid-cols-1 cursor-pointer'>
                        <div className='border border-black hover-shadow'>
                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                <Image src={whiteboardIcon} width={0} height={0} alt='whiteboard'></Image>
                            </div>
                            <div className='border-t-black border p-3 bg-white'>
                                <h4>Sample Whiteboard</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
