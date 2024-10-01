import React from 'react'
import whiteboardIcon from '../../../../public/whiteboard.png';
import Image from 'next/image';

export default function InstructorWhiteBoardPage() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Whiteboard</h2>
                    <nav class="breadcrumb" aria-label="Breadcrumb">
                        <ol class="list-none text-sm p-0 inline-flex">
                            <li class="flex pdskdmsdnjw">
                                <a href="#" class="hover:underline">Dashboard</a>
                            </li>
                            <li class="flex pdskdmsdnjw">
                                <span class="mx-2">›</span>
                                <a href="#" class="font-bold">Whiteboard</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <button className='btn btn-primary hover-shadow'><i class="bi bi-plus-lg mr-1"></i> Create New Whiteboard</button>
            </div>

            <div className='my-3'>
                <div className='grid grid-cols-4 gap-4'>
                    <div className='grid-cols-1 cursor-pointer'>
                        <div className='border border-black hover-shadow'>
                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                <Image src={whiteboardIcon} width={0} height={0}></Image>
                            </div>
                            <div className='border-t-black border p-3 bg-white'>
                                <h4>Sample Whiteboard</h4>
                            </div>
                        </div>
                    </div>
                    <div className='grid-cols-1 cursor-pointer'>
                        <div className='border border-black hover-shadow'>
                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                <Image src={whiteboardIcon} width={0} height={0}></Image>
                            </div>
                            <div className='border-t-black border p-3 bg-white'>
                                <h4>Sample Whiteboard</h4>
                            </div>
                        </div>
                    </div>
                    <div className='grid-cols-1 cursor-pointer'>
                        <div className='border border-black hover-shadow'>
                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                <Image src={whiteboardIcon} width={0} height={0}></Image>
                            </div>
                            <div className='border-t-black border p-3 bg-white'>
                                <h4>Sample Whiteboard</h4>
                            </div>
                        </div>
                    </div>
                    <div className='grid-cols-1 cursor-pointer'>
                        <div className='border border-black hover-shadow'>
                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                <Image src={whiteboardIcon} width={0} height={0}></Image>
                            </div>
                            <div className='border-t-black border p-3 bg-white'>
                                <h4>Sample Whiteboard</h4>
                            </div>
                        </div>
                    </div>
                    <div className='grid-cols-1 cursor-pointer'>
                        <div className='border border-black hover-shadow'>
                            <div className='bg-green-50 flex justify-center items-center py-6'>
                                <Image src={whiteboardIcon} width={0} height={0}></Image>
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
