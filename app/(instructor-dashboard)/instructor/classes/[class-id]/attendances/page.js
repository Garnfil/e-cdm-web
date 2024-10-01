import Link from 'next/link'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function ClassAttendancePage() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Class Attendance</h2>
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
                                <a href="#" class="font-bold">Class Attendance</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div className='flex gap-2'>
                    <Link href={'/instructor/classes/1'} className='btn hover-shadow'><i class="bi bi-arrow-left mr-1"></i> Back to Class</Link>
                    <Dialog>
                        <DialogTrigger className='btn btn-primary hover-shadow'>
                            Add New Attendance
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                <DialogTitle className="mb-3">Create New Attendance</DialogTitle>
                                <form className='my-5'>
                                    <div className='form-group'>
                                        <label className='form-label'>Attendance Code</label>
                                        <input className='form-control my-2' value={'dfdsf-32432'} readOnly />
                                    </div>
                                    <div className='form-group'>
                                        <label className='form-label'>Attendance Date</label>
                                        <input type='date' className='form-control my-2' />
                                    </div>
                                    <button className='w-full btn btn-primary'>Add New</button>
                                </form>
                                {/* <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription> */}
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className='my-3'>
                <table className='min-w-full divide-y divide-black border border-black'>
                    <thead className='bg-neutral-200'>
                        <tr>
                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                ID
                            </th>
                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                Attendance Code
                            </th>
                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                Total Student Present
                            </th>
                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-black'>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>1</td>
                            <td className='p-4 whitespace-nowrap'>fsdfeab-9234232</td>
                            <td className='p-4 whitespace-nowrap'>20</td>
                            <td className='p-4 whitespace-nowrap'>
                                <button className='py-1 px-2 bg-primary text-white rounded mr-2'><i class="bi bi-eye"></i></button>
                                <button className='py-1 px-2 bg-red-500 text-white rounded'><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>2</td>
                            <td className='p-4 whitespace-nowrap'>fsdfeab-9234231</td>
                            <td className='p-4 whitespace-nowrap'>20</td>
                            <td className='p-4 whitespace-nowrap'>
                                <button className='py-1 px-2 bg-primary text-white rounded mr-2'><i class="bi bi-eye"></i></button>
                                <button className='py-1 px-2 bg-red-500 text-white rounded'><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>3</td>
                            <td className='p-4 whitespace-nowrap'>bskdfgr-3423453</td>
                            <td className='p-4 whitespace-nowrap'>20</td>
                            <td className='p-4 whitespace-nowrap'>
                                <button className='py-1 px-2 bg-primary text-white rounded mr-2'><i class="bi bi-eye"></i></button>
                                <button className='py-1 px-2 bg-red-500 text-white rounded'><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>4</td>
                            <td className='p-4 whitespace-nowrap'>kuzdfw-32432441</td>
                            <td className='p-4 whitespace-nowrap'>30</td>
                            <td className='p-4 whitespace-nowrap'>
                                <button className='py-1 px-2 bg-primary text-white rounded mr-2'><i class="bi bi-eye"></i></button>
                                <button className='py-1 px-2 bg-red-500 text-white rounded'><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
