"use client"

import axios from 'axios';
import Link from 'next/link'
import React from 'react'

export default function LoginPage() {

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);

        try {
            // Send POST request using Axios
            const response = await axios.post('http://127.0.0.1:8000/api/instructor/login', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Set appropriate content type
                },
            });

            console.log(response);

        } catch (error) {
            // Handle errors
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
                                    <input id="input-id" type="text" name="login" placeholder="Enter your username..." className="form-control" />
                                </div>
                                <div className='form-group'>
                                    <label className='mb-2 block'>Password</label>
                                    <input id="input-id" type="password" name="password" placeholder="Enter your password..." className="form-control" />
                                </div>
                                <button type='submit' className='btn btn-primary w-full'>
                                    Sign In
                                </button>
                                <div className='mt-4'>
                                    Are you a student? <Link href={'/student-login'} className='text-primary font-bold'>Login Here</Link>
                                </div>
                            </form>
                        </div>
                        <div className='w-[65%] bg-primary h-full rounded-lg'>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
