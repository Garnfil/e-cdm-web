"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import jsCookie from "js-cookie";
import Select from "react-select";

export default function SchedulePage() {
    const [classSchedules, setClassSchedules] = useState([]);
    const [classes, setClasses] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isScheduleDate, setIsScheduleDate] = useState(false);

    const [authSession, setAuthSession] = useState({});

    const daysOfWeekOptions = [
        { value: "1", label: "Monday" },
        { value: "2", label: "Tuesday" },
        { value: "3", label: "Wednesday" },
        { value: "4", label: "Thursday" },
        { value: "5", label: "Friday" },
        { value: "6", label: "Saturday" },
        { value: "7", label: "Sunday" },
    ];

    const fetchInstructorSchedules = async (session) => {
        try {
            const response = await axios.get(`http://192.168.100.110:8000/api/instructors/${session.user.id}/class-schedules`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${session.token}`,
                },
            });

            if (response.data.class_schedules.length > 0) {
                let classSchedulesData = response.data.class_schedules.map((schedule) => ({
                    class: "bg-primary py-2 text-white",
                    title: schedule.class.title,
                    daysOfWeek: schedule.days_of_week,
                    startTime: schedule.start_time,
                    endTime: schedule.end_time,
                }));

                setClassSchedules(classSchedulesData);
            }
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    };

    const fetchInstructorClasses = async (session) => {
        try {
            const response = await axios.get(`http://192.168.100.110:8000/api/instructors/${session.user.id}/classes`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${session.token}`,
                },
            });
            setClasses(response.data.classes);
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    };

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
        fetchInstructorSchedules(session);
        fetchInstructorClasses(session);
    }, []);

    const handleClassScheduleSubmit = async (e) => {
        e.preventDefault();
        try {
            let formData = new FormData(e.target);

            const response = await axios.post(`http://192.168.100.110:8000/api/class-schedules`, formData, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authSession.token}`,
                },
            });

            if (response.status == 200) {
                toast.success("Added Successfully");
                setOpenDialog(false);
                fetchInstructorSchedules(authSession);
            }
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    };

    return (
        <div className="container-fluid">
            <div className="flex flex-col md:flex-row gap-2 justify-between items-start md:items-center mb-5">
                <div>
                    <h2 className="text-2xl font-semibold">Schedules</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-hsdfdsfhsdf">
                            <li className="hsdfdsfhsdf pdskdmsdnjw">
                                <a href="#" className="hover:underline">
                                    Dashboard
                                </a>
                            </li>
                            <li className="hsdfdsfhsdf pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline font-bold">
                                    Schedules
                                </a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger className="btn btn-primary hover-shadow">
                        <i className="bi bi-plus-lg"></i> Add New Schedule
                    </DialogTrigger>
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle className="mb-3">Create New Schedule</DialogTitle>
                            <form className="my-5" onSubmit={handleClassScheduleSubmit}>
                                <input type="hidden" name="instructor_id" value={authSession?.user?.id} />
                                <div className="form-group">
                                    <label className="form-label">Class</label>
                                    <select name="class_id" className="form-control my-2">
                                        <option>--- SELECT CLASS ---</option>
                                        {classes.length > 0 &&
                                            classes.map((classRoom) => (
                                                <option key={classRoom.id} value={classRoom.id}>
                                                    {classRoom.title}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <input id="has-schedule-date" type="checkbox" name="has_schedule_date" onChange={(e) => setIsScheduleDate(e.target.checked)} />
                                    <label htmlFor="has-schedule-date" className="ml-2 inline-block">
                                        Has Schedule Date
                                    </label>
                                </div>
                                <div className={`form-group ${isScheduleDate ? "block" : "hidden"}`}>
                                    <label className="form-label">Scheduled Date</label>
                                    <input name="scheduled_date" type="datetime-local" className="form-control mt-1" />
                                </div>
                                <div className={`mb-3 ${isScheduleDate ? "hidden" : "block"}`}>
                                    <label className="form-label">Days Of Week</label>
                                    <Select
                                        className="my-2"
                                        styles={{
                                            control: (baseStyles, state) => ({
                                                ...baseStyles,
                                                borderColor: state.isFocused ? "black" : "black",
                                                padding: "7px",
                                            }),
                                            dropdownIndicator: (baseStyles, state) => ({
                                                ...baseStyles,
                                                color: "black",
                                            }),
                                        }}
                                        isMulti
                                        name="days_of_week[]"
                                        options={daysOfWeekOptions}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="form-group">
                                        <label className="form-label">Start Time</label>
                                        <input name="start_time" type="time" className="form-control my-2" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">End Time</label>
                                        <input name="end_time" type="time" className="form-control my-2" />
                                    </div>
                                </div>
                                <button className="w-full btn btn-primary">Add New</button>
                            </form>
                            {/* <DialogDescription>
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </DialogDescription> */}
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
            <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" events={classSchedules} eventColor="#1d6532" />
        </div>
    );
}
