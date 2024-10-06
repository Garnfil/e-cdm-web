import Link from 'next/link'
import React from 'react'

export default function LiveSessionsPage() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Live Sessions</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline font-bold">Live Sessions</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes'} className='btn btn-primary hover-shadow'><i className="bi bi-plus-lg"></i> Join Session</Link>
            </div>
            <div className='my-2'>
                <table className='border border-black w-full'>
                    <thead>
                        <tr>
                            <th className='p-2 border border-black'>Id</th>
                            <th className='p-2 border border-black'>Session Code</th>
                            <th className='p-2 border border-black'>Instructor</th>
                            <th className='p-2 border border-black'>Participants</th>
                            <th className='p-2 border border-black'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='p-2 border border-black text-center'>1</td>
                            <td className='p-2 border border-black text-center'>5623456</td>
                            <td className='p-2 border border-black text-center'>Mr. John Pascual</td>
                            <td className='p-2 border border-black text-center'>20</td>
                            <td className='py-3 border border-black text-center'>
                                <Link href={'/student/live-sessions/1'} className=' btn-primary px-2 py-1 hover-shadow rounded'><i className='bi bi-eye-fill'></i></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
