import Link from 'next/link'
import React from 'react'
import yellowIllustration from '../../../public/yellow-illustration.png';
import greenIllustration from '../../../public/green-illustration.png';
import Image from 'next/image';

export default function LoginPage() {
    return (
        <main>
            <section className='login-section bg-[#f5f5f5] w-full h-screen py-4'>
                <div className='max-width-container h-full'>
                    <div className='flex justify-between items-center gap-5 p-10 border-2 border-black h-[80%] rounded-2xl'>
                        <div className='w-[35%] h-full'>
                            <h2 className='text-2xl font-semibold'>Student Login</h2>
                            <h6>Please enter your details</h6>
                            <form className='my-8'>
                                <div className='form-group'>
                                    <label className='mb-2 block'>Student ID</label>
                                    <input id="input-id" type="text" name="" placeholder="Your Student ID" class="form-control" />
                                </div>
                                <div className='form-group'>
                                    <label className='mb-2 block'>Email</label>
                                    <input id="input-id" type="text" name="" placeholder="Your name" class="form-control" />
                                </div>
                                <div className='form-group'>
                                    <label className='mb-2 block'>Password</label>
                                    <input id="input-id" type="password" name="" placeholder="Your password" class="form-control" />
                                </div>
                                <button className='btn btn-primary w-full'>
                                    Sign In
                                </button>
                                <div className='mt-4'>
                                    Are you an instructor? <Link href={'/instructor-login'} className='text-primary font-bold'>Login Here</Link>
                                </div>
                            </form>
                        </div>
                        <div className='w-[65%] bg-primary h-full rounded-lg relative'>
                            <Image src={greenIllustration} className='absolute right-0' />
                            <Image src={yellowIllustration} className='absolute bottom-0' />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
