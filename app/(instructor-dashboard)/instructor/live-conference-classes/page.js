"use client"
import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { format, formatDate } from 'date-fns';

export default function LiveConferenceClassesPage() {
    const router = useRouter();
    const [sessionDetails, setSessionDetails] = useState({
        title: '',
        description: '',
        start_datetime: '',
        end_datetime: '',
        instructor_id: '',
        class_id: '',
    });
    const [classes, setClasses] = useState([]);
    const [authSession, setAuthSession] = useState({});
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const [recentClassSessions, setRecentClassSessions] = useState([]);

    const fetchClasses = async (session) => {
        try {
            const response = await axios.get(`http://192.168.56.1:8000/api/instructors/${session.user.id}/classes`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                }
            });
            console.log(response);
            // If successful, set the classes data
            setClasses(response.data.classes);
        } catch (error) {
            setClasses([]);
        }
    };

    const fetchRecentClassSessions = async (session) => {
        try {
            const response = await axios.get(`http://192.168.56.1:8000/api/live-sessions/instructor-recent-classes`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                }
            });

            setRecentClassSessions(response.data.conference_sessions);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
        setSessionDetails((prevDetails) => ({ ...prevDetails, instructor_id: session.user.id }));
        fetchClasses(session);
        fetchRecentClassSessions(session);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setSessionDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const handleSessionSubmit = async () => {
        try {
            setIsSubmitLoading(true);
            let session = JSON.parse(jsCookie.get("session"));
            const response = await axios.post('http://192.168.56.1:8000/api/live-sessions', sessionDetails, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`,
                }
            });

            router.push(`/video-class-conference/${response.data.conference_session.session_code}`);
            setIsSubmitLoading(false);
        } catch (error) {
            setIsSubmitLoading(false);
            console.log(error);
            toast.error(error?.response?.data?.message ?? "Server Error")
        }
    }


    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-semibold'>Live Conference Classes</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline">Class</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline font-bold">Class Video Conference</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <button className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left"></i> Back to List</button>
            </div>

            <div className='flex justify-between items-start gap-3'>
                <div className='border border-black p-3 py-5 w-[60%] bg-white'>
                    <h3 className='text-xl font-bold'>Create Class Conference Room</h3>
                    <form className='my-3'>
                        <div className='form-group'>
                            <label className='mb-2 block font-bold'>Title</label>
                            <input className='form-control' name='title' id='title-field' value={sessionDetails.title} onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block font-bold'>Description</label>
                            <textarea className='form-control' name='description' id='description-field' onChange={handleChange}>{sessionDetails.description}</textarea>
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block font-bold'>Class</label>
                            <select className='form-control my-2 text-black' name='class_id' readonly onChange={handleChange}>
                                <option className=''>-- SELECT CLASS --</option>
                                {
                                    classes.map(classRoom => (
                                        <option key={classRoom.id} value={classRoom.id}>{classRoom.title}</option>
                                    ))
                                }
                            </select>
                        </div>
                        {/* <div className='form-group'>
                            <label className='mb-2 block font-bold'>Start DateTime</label>
                            <input type='datetime-local' className='form-control' name='start_datetime' id='start-datetime-field' onChange={handleChange} />
                        </div>
                        <div className='form-group'>
                            <label className='mb-2 block font-bold'>End DateTime</label>
                            <input type='datetime-local' className='form-control' name='end_datetime' id='end-datetime-field' onChange={handleChange} />
                        </div> */}
                        <button type='button' onClick={handleSessionSubmit} className='w-full btn btn-primary' disabled={isSubmitLoading}>Create</button>
                    </form>
                </div>
                <div className='border border-black w-[40%] bg-white'>
                    <div className='border border-b-black p-3'>
                        <h3 className='text-xl font-bold'>Recent Online Conference Class</h3>

                    </div>
                    <div className='flex flex-col gap-3 my-3 p-3'>

                        {
                            recentClassSessions.length > 0 ? (
                                recentClassSessions.map(class_session => (
                                    <div className="today relative flex flex-start gap-3">
                                        <div>
                                            <div className="py-2 w-12 bg-secondary border border-black text-black rounded flex flex-col items-center gap-0.5 text-today">
                                                <span className="text-sm">{formatDate(class_session.scheduled_datetime, "MMM")}</span>
                                                <span className="text-xl font-bold leading-none">{formatDate(class_session.scheduled_datetime, "dd")}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <h4 className="text-sm font-semibold">Class in {class_session.classroom.title ?? ""}</h4>
                                            <div className="text-xs"><i className="bi bi-clock me-1"></i>
                                                <span className='mr-2'>{formatDate(class_session.start_datetime, 'MMM dd, yyyy h:m a')}</span>
                                                -
                                                <span className='ml-2'>{formatDate(class_session.end_datetime, 'MMM dd, yyyy h:m a')}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='text-center'>
                                    No Result Found
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}
