import Link from 'next/link'
import React from 'react'

export default function CreateClassPage() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Create Class</h2>
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
                                <a href="#" className="hover:underline font-bold">Create Class</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes'} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left"></i> Back to List</Link>
            </div>

            <form>
                <div className='flex justify-between items-start my-3 gap-4'>
                    <div className='w-[65%] border border-black p-5 bg-white'>
                        <div className='form-group'>
                            <label className='mb-2 block font-bold'>Title</label>
                            <input className='form-control' value={10} />
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block font-bold'>Description</label>
                            <textarea className='form-control' rows={10} cols={10} style={{ height: '200px' }}></textarea>
                        </div>
                    </div>
                    <div className='w-[35%] bg-white'>
                        <div className='border border-black p-5'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                <div className='form-group '>
                                    <label className='mb-2 block'>Year</label>
                                    <input className='form-control' value={1} />
                                </div>
                                <div className='form-group '>
                                    <label className='mb-2 block'>Section</label>
                                    <input className='form-control' value={`BSIT-3H`} />
                                </div>
                                <div className='form-group col-span-2'>
                                    <label className='mb-2 block'>Subject</label>
                                    <select className='form-control'>
                                        <option>DISCRETE</option>
                                    </select>
                                </div>
                                {/* <div className='form-group col-span-2'>
                                <label className='mb-2 block'>Assigned To</label>
                                <div className='border border-black hover-shadow p-3 rounded'>
                                    All Students
                                </div>
                            </div> */}
                            </div>
                            <button className='w-full btn btn-primary'>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
