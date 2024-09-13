import React from 'react'

export default function ClassFeed() {
    return (
        <div className='border-black rounded-lg border text-base bg-white max-h-[70vh] overflow-auto class-stream-container'>
            <div className='flex justify-between items-center gap-3 px-6 py-3 sticky top-0 z-30 bg-white border-b border-black'>
                <h2 className='text-lg font-semibold'>Stream</h2>
                <button className='btn btn-primary hover-shadow'>Create</button>
            </div>
            <div className='relative w-full overflow-y-auto'>
                <table className='min-w-full divide-y divide-black'>
                    <thead className='bg-neutral-200 '>
                        <tr>
                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                Title
                            </th>
                            <th scope='col' className='min-w-20 p-4 text-start text-xs font-medium text-black uppercase tracking-wider'>
                                Type
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-black'>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Test One</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                        <tr className="cursor-pointer">
                            <td className='p-4 whitespace-nowrap'>Quiz One - Bridge</td>
                            <td className='p-4 whitespace-nowrap'>
                                <span className='inline-flex items-center gap-x-1 py-1.5 px-3 rounded-full text-xs font-medium border border-black bg-secondary text-black'>Exam</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
