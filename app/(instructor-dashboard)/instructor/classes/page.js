import Image from 'next/image'
import React from 'react'
import student from '../../../../public/student.png';
import Link from 'next/link';

export default function ClassesPage() {
    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Classes</h2>
                    <nav class="breadcrumb" aria-label="Breadcrumb">
                        <ol class="list-none text-sm p-0 inline-flex">
                            <li class="flex pdskdmsdnjw">
                                <a href="#" class="hover:underline">Dashboard</a>
                            </li>
                            <li class="flex pdskdmsdnjw">
                                <span class="mx-2">›</span>
                                <a href="#" class="hover:underline font-bold">Classes</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/create-class'} className='btn btn-primary hover-shadow'><i class="bi bi-plus-lg"></i> Add New Class</Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                <Link href={"/instructor/classes/1"} class="p-6 bg-white hover-shadow border-black rounded border cursor-pointer">
                    <div class="p-2 rounded bg-primary text-white border border-black inline-block  mb-4">
                        <i class="text-white bi bi-people text-2xl"></i>
                    </div>
                    <h3 class="text-xl leading-normal mb-1 font-semibold text-black">BSIT - 3H</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend sagittis tincidunt.</p>
                    <div class="relative mt-3">
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <div class="inline-flex pdskdmsdnjw justify-center rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5 text-sm">12+</div>
                        </a>
                    </div>
                </Link>
                <Link href={"/instructor/classes/1"} class="p-6 bg-white hover-shadow border-black rounded border cursor-pointer">
                    <div class="p-2 rounded bg-primary text-white border border-black inline-block  mb-4">
                        <i class="text-white bi bi-people text-2xl"></i>
                    </div>
                    <h3 class="text-xl leading-normal mb-1 font-semibold text-black">BSIT - 4D</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend sagittis tincidunt.</p>
                    <div class="relative mt-3">
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <div class="inline-flex pdskdmsdnjw justify-center rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5 text-sm">12+</div>
                        </a>
                    </div>
                </Link>
                <Link href={"/instructor/classes/1"} class="p-6 bg-white hover-shadow border-black rounded border cursor-pointer">
                    <div class="p-2 rounded bg-primary text-white border border-black inline-block  mb-4">
                        <i class="text-white bi bi-people text-2xl"></i>
                    </div>
                    <h3 class="text-xl leading-normal mb-1 font-semibold text-black">BSIT - 3F</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend sagittis tincidunt.</p>
                    <div class="relative mt-3">
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <div class="inline-flex pdskdmsdnjw justify-center rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5 text-sm">12+</div>
                        </a>
                    </div>
                </Link>
                <Link href={"/instructor/classes/1"} class="p-6 bg-white hover-shadow border-black rounded border cursor-pointer">
                    <div class="p-2 rounded bg-primary text-white border border-black inline-block  mb-4">
                        <i class="text-white bi bi-people text-2xl"></i>
                    </div>
                    <h3 class="text-xl leading-normal mb-1 font-semibold text-black">BSIT - 3F</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend sagittis tincidunt.</p>
                    <div class="relative mt-3">
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <div class="inline-flex pdskdmsdnjw justify-center rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5 text-sm">12+</div>
                        </a>
                    </div>
                </Link>
                <Link href={"/instructor/classes/1"} class="p-6 bg-white hover-shadow border-black rounded border cursor-pointer">
                    <div class="p-2 rounded bg-primary text-white border border-black inline-block  mb-4">
                        <i class="text-white bi bi-people text-2xl"></i>
                    </div>
                    <h3 class="text-xl leading-normal mb-1 font-semibold text-black">BSIT - 3F</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend sagittis tincidunt.</p>
                    <div class="relative mt-3">
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <div class="inline-flex pdskdmsdnjw justify-center rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5 text-sm">12+</div>
                        </a>
                    </div>
                </Link>
                <Link href={"/instructor/classes/1"} class="p-6 bg-white hover-shadow border-black rounded border cursor-pointer">
                    <div class="p-2 rounded bg-primary text-white border border-black inline-block  mb-4">
                        <i class="text-white bi bi-people text-2xl"></i>
                    </div>
                    <h3 class="text-xl leading-normal mb-1 font-semibold text-black">BSIT - 3F</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend sagittis tincidunt.</p>
                    <div class="relative mt-3">
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <Image class="inline-flex rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5" src={student} width={0} height={0} alt="Image Description"></Image>
                        </a>
                        <a href="#">
                            <div class="inline-flex pdskdmsdnjw justify-center rounded-full shadow w-10 h-10 max-w-full bg-white -me-3 border border-black transform hover:-translate-y-0.5 text-sm">12+</div>
                        </a>
                    </div>
                </Link>
            </div>
        </div>
    )
}
