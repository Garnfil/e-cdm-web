"use client";

import Link from "next/link";
import React, { useState } from "react";
import yellowIllustration from "../../../public/yellow-illustration.png";
import greenIllustration from "../../../public/green-illustration.png";
import Image from "next/image";
import axios from "axios";
import jsCookie from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function StudentLoginPage() {
    const router = useRouter();

    const [studentDetails, setStudentDetails] = useState({
        student_id: "",
        email: "",
        password: "",
    });
    const [isLoginSubmitted, setIsLoginSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setStudentDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setIsLoginSubmitted(true);
            const response = await axios.post("http://192.168.100.44:8000/api/student/login", studentDetails, {
                headers: {
                    // 'Content-Type': 'multipart/form-data', // Set appropriate content type
                    "Content-Type": "application/json",
                },
            });

            if (response.status == 200) {
                jsCookie.set("session", JSON.stringify(response.data));
                setIsLoginSubmitted(false);
                router.push("/student/dashboard");
            }
        } catch (error) {
            // Handle errors
            setIsLoginSubmitted(false);
            toast.error(error.response.data.message ?? "Oops! Something wen't Wrong.");
            // console.error('Error submitting form:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <main>
            <section className="login-section bg-[#f5f5f5] w-full h-screen py-4">
                <div className="max-width-container h-full">
                    <div className="flex justify-between items-center gap-5 p-10 border-2 border-black h-[80%] rounded-2xl">
                        <div className="w-[35%] h-full">
                            <h2 className="text-2xl font-semibold">Student Login</h2>
                            <h6>Please enter your details</h6>
                            <form className="my-8">
                                <div className="form-group">
                                    <label className="mb-2 block">Student ID</label>
                                    <input
                                        id="input-id"
                                        type="text"
                                        name="student_id"
                                        value={studentDetails.student_id}
                                        onChange={handleChange}
                                        placeholder="Your Student ID"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="mb-2 block">Email</label>
                                    <input id="input-id" type="text" name="email" value={studentDetails.email} onChange={handleChange} placeholder="Your email" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label className="mb-2 block">Password</label>
                                    <input id="input-id" type="password" name="password" value={studentDetails.password} onChange={handleChange} placeholder="Your password" className="form-control" />
                                </div>
                                <button type="button" onClick={handleSubmit} className="btn btn-primary w-full" disabled={isLoginSubmitted}>
                                    Sign In
                                </button>
                                <div className="mt-4">
                                    Are you an instructor?{" "}
                                    <Link href={"/instructor-login"} className="text-primary font-bold">
                                        Login Here
                                    </Link>
                                </div>
                            </form>
                        </div>
                        <div className="w-[65%] bg-primary h-full rounded-lg relative">
                            <Image src={greenIllustration} className="absolute right-0" />
                            <Image src={yellowIllustration} className="absolute bottom-0" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
