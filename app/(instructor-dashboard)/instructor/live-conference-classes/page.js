import React from 'react'

export default function LiveConferenceClassesPage() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Live Conference Classes</h2>
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
                                <a href="#" class="hover:underline font-bold">Live Conference Classes</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <button className='btn btn-primary hover-shadow'><i class="bi bi-arrow-left"></i> Back to List</button>
            </div>

            <div className='flex justify-between items-start gap-3'>
                <div className='border border-black p-3 py-5 w-[60%] bg-white'>
                    <h3 className='text-xl font-bold'>Create Class Conference Room</h3>
                    <form className='my-3'>
                        <div className='form-group'>
                            <label className='mb-2 block font-bold'>Title</label>
                            <input className='form-control' value={10} />
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block font-bold'>Class Code</label>
                            <input className='form-control' value={`fsyxW3`} readOnly />
                        </div>
                        <button className='w-full btn btn-primary'>Create</button>
                    </form>
                </div>
                <div className='border border-black w-[40%] bg-white'>
                    <div className='border border-b-black p-3'>
                        <h3 className='text-xl font-bold'>Recent Online Conference Class</h3>

                    </div>
                    <div className='flex flex-col gap-3 my-3 p-3'>
                        <div class="today relative flex flex-start gap-3">
                            <div>
                                <div class="py-2 w-12 bg-secondary border border-black text-black rounded flex flex-col items-center gap-0.5 text-today">
                                    <span class="text-sm">May</span>
                                    <span class="text-xl font-bold leading-none">15</span>
                                </div>
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <h4 class="text-sm font-semibold">Class in BSIT-4D</h4>
                                <div class="text-xs"><i class="bi bi-clock me-1"></i>14:30 PM - 15:00 PM</div>
                            </div>
                        </div>
                        <div class="today relative flex flex-start gap-3">
                            <div>
                                <div class="py-2 w-12 bg-secondary border border-black text-black rounded flex flex-col items-center gap-0.5 text-today">
                                    <span class="text-sm">May</span>
                                    <span class="text-xl font-bold leading-none">11</span>
                                </div>
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <h4 class="text-sm font-semibold">Class in BSIT-2E</h4>
                                <div class="text-xs"><i class="bi bi-clock me-1"></i>14:30 PM - 15:00 PM</div>
                            </div>
                        </div>
                        <div class="today relative flex flex-start gap-3">
                            <div>
                                <div class="py-2 w-12 bg-secondary border border-black text-black rounded flex flex-col items-center gap-0.5 text-today">
                                    <span class="text-sm">May</span>
                                    <span class="text-xl font-bold leading-none">11</span>
                                </div>
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <h4 class="text-sm font-semibold">Class in BSIT-2A</h4>
                                <div class="text-xs"><i class="bi bi-clock me-1"></i>10:30 AM - 11:00 AM</div>
                            </div>
                        </div>
                        <div class="today relative flex flex-start gap-3">
                            <div>
                                <div class="py-2 w-12 bg-secondary border border-black text-black rounded flex flex-col items-center gap-0.5 text-today">
                                    <span class="text-sm">May</span>
                                    <span class="text-xl font-bold leading-none">11</span>
                                </div>
                            </div>
                            <div class="flex flex-col gap-1.5">
                                <h4 class="text-sm font-semibold">Class in BSIT-2C</h4>
                                <div class="text-xs"><i class="bi bi-clock me-1"></i>8:30 AM - 9:30 AM</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
