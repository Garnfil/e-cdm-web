import ClassFeed from '@/app/components/ClassFeed'
import ClassHeader from '@/app/components/ClassHeader'
import Image from 'next/image'
import React from 'react'
// import {  } from "../../../../../public/";

export default function Class() {
    return (
        <div className='container-fluid'>
            <div className='flex flex-col gap-4 lg:gap-6 mx-auto px-4 lg:px-6 mb-6'>
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6'>
                    <div className='xl:col-span-3'>
                        <ClassHeader />
                    </div>
                    <div className='xl:col-span-2'>
                        <ClassFeed />
                    </div>
                    <div className='xl:col-span-1 flex flex-col gap-6'>
                        <div className='border-black rounded-lg border p-6 text-base bg-white'>
                            <div className='text-lg font-semibold mb-4'>
                                Filter
                            </div>
                            <div className="relative mb-3">
                                <div className="flex flex-nowrap lsdfdfsdafd gap-3 pdskdmsdnjw mb-2">
                                    <input className="form-checkbox h-5 w-5 accent-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                                    <label className="inline-block" for="flexRadioDefault1">
                                        All
                                    </label>
                                </div>
                                <div className="flex flex-nowrap lsdfdfsdafd gap-3 pdskdmsdnjw mb-2">
                                    <input className="form-checkbox h-5 w-5 accent-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="inline-block" for="flexRadioDefault2">
                                        Modules
                                    </label>
                                </div>
                                <div className="flex flex-nowrap lsdfdfsdafd gap-3 pdskdmsdnjw mb-2">
                                    <input className="form-checkbox h-5 w-5 accent-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                    <label className="inline-block" for="flexRadioDefault3">
                                        Assignments
                                    </label>
                                </div>
                                <div className="flex flex-nowrap lsdfdfsdafd gap-3 pdskdmsdnjw mb-2">
                                    <input className="form-checkbox h-5 w-5 accent-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault4" />
                                    <label className="inline-block" for="flexRadioDefault4">
                                        Quizzes
                                    </label>
                                </div>
                                <div className="flex flex-nowrap lsdfdfsdafd gap-3 pdskdmsdnjw mb-2">
                                    <input className="form-checkbox h-5 w-5 accent-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault5" />
                                    <label className="inline-block" for="flexRadioDefault5">
                                        Activities
                                    </label>
                                </div>
                                <div className="flex flex-nowrap lsdfdfsdafd gap-3 pdskdmsdnjw mb-2">
                                    <input className="form-checkbox h-5 w-5 accent-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault5" />
                                    <label className="inline-block" for="flexRadioDefault5">
                                        Exams
                                    </label>
                                </div>
                            </div>
                            <button className='btn btn-primary hover-shadow w-full'><i class="bi bi-filter"></i> Apply Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
