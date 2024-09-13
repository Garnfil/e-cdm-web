import ClassHeader from '@/app/components/ClassHeader'
import React from 'react'

export default function ClassStudentsPage() {
    return (
        <div className='container-fluid'>
            <div className='flex flex-col gap-4 lg:gap-6 mx-auto px-4 lg:px-6 mb-6'>
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6'>
                    <div className='xl:col-span-3'>
                        <ClassHeader />
                    </div>
                    <div className='xl:col-span-3'>
                        <div className='border-black rounded-lg border text-base bg-white max-h-[70vh] overflow-auto class-stream-container'>
                            <div className='flex justify-between items-center gap-3 px-6 py-3 sticky top-0 z-30 bg-white border-b border-black'>
                                <h2 className='text-lg font-semibold'>Students</h2>
                                <button className='btn btn-primary hover-shadow'>Invite</button>
                            </div>
                            <div className='relative w-full overflow-y-auto'>
                                <table className='min-w-full divide-y divide-black'>
                                    <thead className='bg-neutral-200'>
                                        <tr>
                                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                                Name
                                            </th>
                                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                                Age
                                            </th>
                                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                                Class
                                            </th>
                                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className='bg-white divide-y divide-black'>
                                        <tr className="cursor-pointer">
                                            <td className='p-4 whitespace-nowrap'>John Doe</td>
                                            <td className='p-4 whitespace-nowrap'>16</td>
                                            <td className='p-4 whitespace-nowrap'>3-H</td>
                                            <td className='p-4 whitespace-nowrap'>
                                                <button className='py-1 px-2 bg-primary text-white rounded mr-2'><i class="bi bi-eye"></i></button>
                                                <button className='py-1 px-2 bg-red-500 text-white rounded'><i class="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                        <tr className="cursor-pointer">
                                            <td className='p-4 whitespace-nowrap'>Jane Smith</td>
                                            <td className='p-4 whitespace-nowrap'>17</td>
                                            <td className='p-4 whitespace-nowrap'>3-H</td>
                                            <td className='p-4 whitespace-nowrap'>
                                                <button className='py-1 px-2 bg-primary text-white rounded mr-2'><i class="bi bi-eye"></i></button>
                                                <button className='py-1 px-2 bg-red-500 text-white rounded'><i class="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                        <tr className="cursor-pointer">
                                            <td className='p-4 whitespace-nowrap'>Michael Johnson</td>
                                            <td className='p-4 whitespace-nowrap'>16</td>
                                            <td className='p-4 whitespace-nowrap'>3-H</td>
                                            <td className='p-4 whitespace-nowrap'>
                                                <button className='py-1 px-2 bg-primary text-white rounded mr-2'><i class="bi bi-eye"></i></button>
                                                <button className='py-1 px-2 bg-red-500 text-white rounded'><i class="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                        <tr className="cursor-pointer">
                                            <td className='p-4 whitespace-nowrap'>Sarah Lee</td>
                                            <td className='p-4 whitespace-nowrap'>15</td>
                                            <td className='p-4 whitespace-nowrap'>3-H</td>
                                            <td className='p-4 whitespace-nowrap'>
                                                <button className='py-1 px-2 bg-primary text-white rounded mr-2'><i class="bi bi-eye"></i></button>
                                                <button className='py-1 px-2 bg-red-500 text-white rounded'><i class="bi bi-trash"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
