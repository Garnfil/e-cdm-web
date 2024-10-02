import Link from 'next/link'
import React from 'react'

export default function CreateModulePage() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Create Module</h2>
                    <nav class="breadcrumb" aria-label="Breadcrumb">
                        <ol class="list-none text-sm p-0 inline-flex">
                            <li class="flex pdskdmsdnjw">
                                <a href="#" class="hover:underline">Dashboard</a>
                            </li>
                            <li class="flex pdskdmsdnjw">
                                <span class="mx-2">›</span>
                                <a href="#" class="hover:underline">Class</a>
                            </li>
                            <li class="flex pdskdmsdnjw">
                                <span class="mx-2">›</span>
                                <a href="#" class="font-bold">Create Module</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes/1'} className='btn btn-primary hover-shadow'><i class="bi bi-arrow-left mr-1"></i> Back to Class</Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                <div className='xl:col-span-3'>
                    <div className='border border-black py-2 px-3 mb-5'>
                        <div className='form-group'>
                            <label className='mb-2 block'>Title</label>
                            <input className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block'>Description (optional)</label>
                            <textarea className='form-control' rows={10} cols={10} style={{ height: '200px' }}></textarea>
                        </div>
                    </div>
                    <div className='border border-black py-2 px-3'>
                        <h3 className='font-bold'>Attach</h3>
                        <div className='flex justify-center items-center gap-5'>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <button class="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black hover-shadow">
                                    <i class="bi bi-file-earmark-arrow-up-fill text-2xl"></i>
                                </button>
                                <h6>Upload</h6>
                            </div>
                            <div className='flex flex-col justify-center items-center gap-1'>
                                <button class="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black hover-shadow">
                                    <i class="bi bi-link text-2xl"></i>
                                </button>
                                <h6>Link</h6>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='xl:col-span-1'>
                    <div className='border border-black py-2 px-3'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Points</label>
                                <input className='form-control' value={10} />
                            </div>
                            <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Due</label>
                                <input className='form-control' type='date' />
                            </div>
                        </div>
                        <button className='w-full btn btn-primary'>Submit</button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
