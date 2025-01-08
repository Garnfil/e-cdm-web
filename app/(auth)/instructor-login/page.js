"use client"

import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'
import yellowIllustration from '../../../public/yellow-illustration.png';
import greenIllustration from '../../../public/green-illustration.png';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import jsCookie from 'js-cookie';
import { toast } from 'react-toastify';

export default function LoginPage() {
    const router = useRouter();
    const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);

    const [errors, setErrors] = useState([]);

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {
            setIsLoginSubmitted(true);
            let formData = new FormData(e.target);

            // Send POST request using Axios
            const response = await axios.post('http://192.168.100.110:8000/api/instructor/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status == 200) {
                jsCookie.set("session", JSON.stringify(response.data));
                setIsLoginSubmitted(false);
                router.push('/instructor/dashboard');
            }

        } catch (error) {
            // Handle errors
            setIsLoginSubmitted(false);
            toast.error(error?.response?.data?.message ?? "Server Error");
            setErrors(error?.response?.data?.errors);
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <main>
            <section className='login-section bg-[#f5f5f5] w-full h-screen py-4'>
                <div className='max-width-container h-full'>
                    <div className='flex justify-between items-center gap-5 p-10 border-2 border-black h-[80%] rounded-2xl'>
                        <div className='w-[35%] h-full'>
                            <h2 className='text-2xl font-semibold'>Instructor Login</h2>
                            <h6>Please enter your details</h6>
                            <form className='my-8' onSubmit={handleSubmitLogin}>
                                <div className='form-group'>
                                    <label className='mb-2 block'>Username/Email</label>
                                    <input id="login-id" type="text" name="login" placeholder="Enter your username..." className="form-control" />
                                </div>
                                <div className='form-group'>
                                    <label className='mb-2 block'>Password</label>
                                    <input id="password-id" type="password" name="password" placeholder="Enter your password..." className="form-control" />
                                </div>
                                <button type='submit' className='btn btn-primary w-full' disabled={isLoginSubmitted}>
                                    Sign In
                                </button>
                                <div className='mt-4'>
                                    Are you a student? <Link href={'/student-login'} className='text-primary font-bold'>Login Here</Link>
                                </div>
                            </form>
                        </div>
                        <div className='w-[65%] bg-primary h-full rounded-lg relative'>
                            <Image src={greenIllustration} className='absolute right-0' alt='green-cdm-illustration' priority />
                            <Image src={yellowIllustration} className='absolute bottom-0' alt='yellow-cdm-illustration' />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
