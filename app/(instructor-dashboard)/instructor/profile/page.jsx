"use client"

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsCookie from 'js-cookie';

export default function InstructorProfilePage() {
    const params = useParams();
    const [authSession, setAuthSession] = useState({});

    // State for form fields
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        contact_no: '',
        gender: 'Male', // default value
        address: '',
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const getUserProfile = async (session) => {
        try {
            const response = await axios.post(`http://192.168.100.44:8000/api/instructor/profile/${session.user.id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                }
            });

            console.log(response);

            setFormData((prevData) => ({
                ...prevData,
                firstname: response.data?.user.firstname,
                lastname: response.data?.user.lastname,
                email: response.data?.user.email,
                username: response.data?.user.username,
                contact_no: response.data?.user.contact_no,
                gender: response.data?.user.gender,
                address: response.data?.user.address,
            }));
        } catch (error) {
            console.log(error);
            toast.error(error?.message ?? "Server Error")
        }
    }

    useEffect(() => {
        const session = JSON.parse(jsCookie.get('session'));
        setAuthSession(session);
        getUserProfile(session);
    }, [])


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Replace with your actual API endpoint
            const response = await axios.post('/api/instructor-profile', formData);
            alert('Profile updated successfully!');
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to update profile. Please try again.');
        }
    };

    return (
        <div className='container-fluid'>
            <form onSubmit={handleSubmit} className="grid grid-cols-2">
                <div className="border-black col-span-2 rounded-lg border py-8 px-6 lg:px-8 lg:py-12 text-base bg-white dark:bg-neutral-600 min-h-[70vh]">
                    <div className="flex flex-col gap-8">
                        <div className="relative">
                            <h2 className="text-xl font-semibold mb-3">Personal Info</h2>
                            <div className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="input-firstName" className="mb-2">First name</label>
                                        <input
                                            id="input-firstName"
                                            type="text"
                                            name="firstName"
                                            className="w-full py-3 px-4 h-12 border form-control"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="input-lastName" className="mb-2">Last name</label>
                                        <input
                                            id="input-lastName"
                                            type="text"
                                            name="lastName"
                                            className="w-full py-3 px-4 h-12 border form-control"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="input-email" className="mb-2">Email</label>
                                        <input
                                            id="input-email"
                                            type="email"
                                            name="email"
                                            className="w-full py-3 px-4 h-12 border form-control"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="input-username" className="mb-2">Username</label>
                                        <input
                                            id="input-username"
                                            type="text"
                                            name="username"
                                            className="w-full py-3 px-4 h-12 border form-control"
                                            value={formData.username}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col">
                                        <label htmlFor="input-phone" className="mb-2">Contact Number</label>
                                        <div className="relative rounded">
                                            <input
                                                id="input-phone"
                                                type="number"
                                                name="contactNumber"
                                                placeholder="Phone number"
                                                className="w-full py-3 ps-16 pe-4 h-12 border form-control"
                                                value={formData.contactNumber}
                                                onChange={handleChange}
                                            />
                                            <span className="size-12 flex justify-center items-center start-0 top-0 border rounded-s border-black bg-neutral-200 dark:bg-neutral-800 absolute px-2">
                                                <span className="text-lg">+63</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="input-gender" className="mb-2">Gender</label>
                                        <select
                                            id="input-gender"
                                            name="gender"
                                            className="form-control"
                                            value={formData.gender}
                                            onChange={handleChange}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="TextareaId" className="mb-2">Address</label>
                                    <div className="relative z-0">
                                        <textarea
                                            id="TextareaId"
                                            name="address"
                                            className="w-full py-3 px-4 border form-control"
                                            placeholder="Address"
                                            rows="3"
                                            value={formData.address}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <button className="btn btn-primary mt-4">Submit</button>
                </div>
            </form>
        </div>
    );
}
