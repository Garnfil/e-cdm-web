import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Session</h2>
                    <nav class="breadcrumb" aria-label="Breadcrumb">
                        <ol class="list-none text-sm p-0 inline-flex">
                            <li class="flex pdskdmsdnjw">
                                <a href="#" class="hover:underline">Dashboard</a>
                            </li>
                            <li class="flex pdskdmsdnjw">
                                <span class="mx-2">›</span>
                                <a href="#" class="hover:underline">Live Sessions</a>
                            </li>
                            <li class="flex pdskdmsdnjw">
                                <span class="mx-2">›</span>
                                <a href="#" class="hover:underline font-bold">Session</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/student/live-sessions'} className='btn btn-primary hover-shadow'><i class="bi bi-arrow-left"></i> Back to List</Link>
            </div>

            <div className='my-3'>
                <div className='grid grid-cols-3 gap-5'>
                    <div className='col-span-1'>
                        <div className='w-full bg-white border border-black rounded hover-shadow'>
                            <div className='px-4 py-3 border border-b-black bg-green-100'>
                                <h2 className='text-xl font-bold text-primary'><i class="bi bi-camera-video-fill mr-2"></i> Session Details</h2>
                            </div>
                            <div className='p-4'>
                                <h2 className='text-lg font-bold'>Meet with BSIT 3H - IT ELECT</h2>
                                <p className='text-xs my-1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel metus dolor.
                                    Donec dignissim lectus quis nulla pulvinar pellentesque.</p>
                                <div className='flex flex-col gap-2 mt-5 mb-3'>
                                    <div className='flex justify-start items-center gap-2'>
                                        <h6 className='text-sm font-semibold'>Session Code: </h6>
                                        <h6 className='text-sm'>34325665</h6>
                                    </div>
                                    <div className='flex justify-start items-center gap-2'>
                                        <h6 className='text-sm font-semibold'>Scheduled Date: </h6>
                                        <h6 className='text-sm'>July 21, 2024 10:30 A.M</h6>
                                    </div>
                                    <div className='flex justify-start items-center gap-2'>
                                        <h6 className='text-sm font-semibold'>Class: </h6>
                                        <h6 className='text-sm'>BSIT 3H - IT ELECT</h6>
                                    </div>
                                    <div className='flex justify-start items-center gap-2'>
                                        <h6 className='text-sm font-semibold'>Start Date: </h6>
                                        <h6 className='text-sm'>July 21, 2024 10:40 A.M</h6>
                                    </div>
                                    <div className='flex justify-start items-center gap-2'>
                                        <h6 className='text-sm font-semibold'>End Date: </h6>
                                        <h6 className='text-sm'>July 21, 2024 11:40 A.M</h6>
                                    </div>
                                    <div className='flex justify-start items-center gap-2'>
                                        <h6 className='text-sm font-semibold'>Grace Period: </h6>
                                        <h6 className='text-sm'>5 minutes</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-3'>
                            <div className='w-full border border-black bg-white hover-shadow'>
                                <div className='px-4 py-3 border border-b-black bg-green-100'>
                                    <h2 className='text-xl font-bold text-primary'><i class="bi bi-card-text mr-2"></i> Notes</h2>
                                </div>
                                <div className='notes-list p-4 max-h-[300px] h-[300px] overflow-auto'>
                                    {/* Note One */}
                                    <div className='flex flex-col gap-4'>
                                        <div>
                                            {/* Note One Header */}
                                            <div className='flex justify-start gap-3'>
                                                <div className='size-10 rounded-full p-2 border border-black text-center font-bold bg-secondary'>
                                                    J
                                                </div>
                                                <div>
                                                    <h5 className='font-bold'>James Garnfil</h5>
                                                    <div className='text-gray-600 text-xs'>Male</div>
                                                </div>
                                            </div>
                                            <div className='flex justify-start gap-3 mt-2'>
                                                <div className='size-10 rounded-full p-2 px-3'></div>
                                                <div>
                                                    <p>Sed fermentum facilisis tellus, non viverra mauris facilisis eu. Praesent et laoreet orci. Suspendisse nec nulla tempus quam dictum rhoncus.
                                                        Class aptent taciti sociosqu ad litora torquent per conubia nostra, </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Note Two */}
                                        <div>
                                            {/* Note One Header */}
                                            <div className='flex justify-start gap-3'>
                                                <div className='size-10 rounded-full p-2 border border-black text-center font-bold bg-secondary'>
                                                    J
                                                </div>
                                                <div>
                                                    <h5 className='font-bold'>James Garnfil</h5>
                                                    <div className='text-gray-600 text-xs'>Male</div>
                                                </div>
                                            </div>
                                            <div className='flex justify-start gap-3 mt-2'>
                                                <div className='size-10 rounded-full p-2 px-3'></div>
                                                <div>
                                                    <p>Sed fermentum facilisis tellus, non viverra mauris facilisis eu. Praesent et laoreet orci. Suspendisse nec nulla tempus quam dictum rhoncus.
                                                        Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce vitae dapibus lacus. Ut laoreet mi id odio malesuada,
                                                        a egestas diam eleifend.  Donec a ex nec arcu tempor lobortis.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2'>
                        <table className='bg-white w-full border border-black rounded hover-shadow'>
                            <thead>
                                <tr>
                                    <th className='p-3 border border-black text-center'>Id</th>
                                    <th className='p-3 border border-black text-center'>Name</th>
                                    <th className='p-3 border border-black text-center'>Joined Start Time</th>
                                    <th className='p-3 border border-black text-center'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='p-3 border border-black text-center'>1</td>
                                    <td className='p-3 border border-black text-center'>James Garnfil</td>
                                    <td className='p-3 border border-black text-center'>10:45 A.M</td>
                                    <td className='p-3 border border-black text-center'>present</td>
                                </tr>
                                <tr>
                                    <td className='p-3 border border-black text-center'>1</td>
                                    <td className='p-3 border border-black text-center'>James Garnfil</td>
                                    <td className='p-3 border border-black text-center'>10:45 A.M</td>
                                    <td className='p-3 border border-black text-center'>present</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}
