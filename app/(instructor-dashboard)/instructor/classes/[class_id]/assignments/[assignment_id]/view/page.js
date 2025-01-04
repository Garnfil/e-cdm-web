"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useParams } from 'next/navigation';
import axios from 'axios';
import jsCookie from 'js-cookie';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Description } from '@radix-ui/react-dialog';

export default function ViewAssignmentPage() {
    const params = useParams();
    const { assignment_id, class_id } = params;
    const [submittedStudentWorks, setSubmittedStudentWorks] = useState([]);
    const [authSession, setAuthSession] = useState({});
    const [selectedTab, setSelectedTab] = useState('details');

    const [selectedSubmittedWork, setSelectedSubmittedWork] = useState({});
    const [openAttachmentFormDialog, setOpenAttachmentFormDialog] = useState(false);
    const [uploadAttachmentType, setUploadAttachmentType] = useState('file');
    const [submitBtnLoad, setSubmitBtnLoad] = useState(false);

    const [assignmentDetails, setAssignmentDetails] = useState({
        school_work_id: "",
        class_id: "",
        instructor_id: "",
        title: "",
        description: "",
        type: "assignment",
        status: "posted",
        assignment_id: "",
        points: "",
        assessment_type: "",
        notes: "",
        due_datetime: "",
        attachments: [],
    });

    const fetchSubmittedAssignments = async (session, school_work_id) => {
        try {
            const response = await axios.get(`http://192.168.56.1:8000/api/student-school-works/${school_work_id}/submissions`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`
                }
            });

            setSubmittedStudentWorks(response.data.student_submissions);

            if (response.data.student_submissions.length > 0) {
                setSelectedSubmittedWork(response.data.student_submissions[0]);
            }

        } catch (error) {
            console.error("Error fetching submitted assignments:", error);
        }
    };

    const fetchAssignmentDetails = async (session) => {
        const response = await axios.get(`http://192.168.56.1:8000/api/school-works/${assignment_id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session.token}`
            }
        });

        if (!response.data.school_work) router.replace('/404');

        setAssignmentDetails({
            school_work_id: response.data.school_work.id,
            class_id: response.data.school_work.class_id,
            instructor_id: response.data.school_work.instructor_id,
            title: response.data.school_work.title,
            description: response.data.school_work.description,
            type: response.data.school_work.type,
            status: response.data.school_work.status,
            assignment_id: response.data.school_work.assignment.id,
            points: response.data.school_work.assignment.points,
            assessment_type: response.data.school_work.assignment.assessment_type,
            notes: response.data.school_work.assignment.notes,
            due_datetime: response.data.school_work.due_datetime,
            attachments: response.data.school_work.attachments,
        });

        fetchSubmittedAssignments(session, response.data.school_work.id);
    }

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
        fetchAssignmentDetails(session);
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setAssignmentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const onTabChange = (value) => {
        setSelectedTab(value);
    }

    const handleUploadAttachmentSubmit = async (e) => {
        e.preventDefault();

        try {
            let formData = new FormData(e.target);
            setSubmitBtnLoad(true);
            const response = await axios.post(`http://192.168.56.1:8000/api/school-works/attachments/single-upload`, formData, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${authSession.token}`,
                }
            });

            if (response.status == 200) {
                setSubmitBtnLoad(false);
                fetchAssignmentDetails(authSession);
                setOpenAttachmentFormDialog(false);
                toast.success("Uploaded Successfully");
            }
        } catch (error) {
            setSubmitBtnLoad(false);
            console.log(error);
            toast.error(`${error?.response?.data?.message} (${error.status})`, {
                autoClose: 5000,
            });
        }
    }

    const handleDeleteAttachment = async (attachment_id) => {
        withReactContent(Swal).fire({
            icon: 'question',
            title: "Remove Attachment?",
            text: "This attachment cannot be revert.",
            confirmButtonColor: "#0b4d10",
            confirmButtonText: "Remove",
            cancelButtonColor: '#000',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`http://192.168.56.1:8000/api/school-works/attachments/${attachment_id}/destroy`, {
                        headers: {
                            "Accept": "application/json",
                            "Authorization": `Bearer ${authSession.token}`,
                        }
                    });

                    if (response.status == 200) {
                        fetchAssignmentDetails(authSession);
                        toast.success("Attachment Removed Successfully");
                    }
                } catch (error) {
                    toast.error("Failed to Removed Attachment.");
                }
            }
        })
    }

    const handleUploadAttachmentClick = async (type) => {
        setOpenAttachmentFormDialog(true);
        setUploadAttachmentType(type);
    }

    const handleUpdateAssignment = async () => {
        try {
            const response = await axios.put(`http://192.168.56.1:8000/api/assignments/${assignmentDetails.assignment_id}`, assignmentDetails, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${authSession.token}`
                }
            })

            if (response.status == 200) {
                toast.success('Assignment Updated Successfully');
                fetchAssignmentDetails(authSession);
            }
        } catch (error) {

        }
    }

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Assignment</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex items-center">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex items-center">
                                <span className="mx-2">›</span>
                                <a href="#" className="hover:underline">Class</a>
                            </li>
                            <li className="flex items-center">
                                <span className="mx-2">›</span>
                                <a href="#" className="font-bold">View Assignment</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={'/instructor/classes/1'} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Class</Link>
            </div>
            <div className="my-3">
                <Tabs onValueChange={onTabChange} defaultValue='details' className="w-full">
                    <TabsList className="border border-black">
                        <TabsTrigger value="details" className={`${selectedTab == "details" ? 'bg-primary text-white' : null}`}>Details</TabsTrigger>
                        <TabsTrigger value="student_works" className={`${selectedTab == "student_works" ? 'bg-primary text-white' : null}`}>Student Works</TabsTrigger>
                    </TabsList>
                    <TabsContent value="details" className="w-100">
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                            <div className='xl:col-span-2'>
                                <div className='border border-black py-2 px-3 mb-5'>
                                    <div className='form-group'>
                                        <label className='mb-2 block'>Title</label>
                                        <input
                                            className='form-control'
                                            value={assignmentDetails.title}
                                            name="title"
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label className='mb-2 block'>Instructions (optional)</label>
                                        <textarea className='form-control'
                                            rows={10}
                                            cols={10}
                                            name="description"
                                            onChange={handleChange}
                                            style={{ height: '200px' }} value={assignmentDetails.description}></textarea>
                                    </div>
                                    <div className='my-3'>
                                        <h2 className='mb-3 text-xl font-bold'>School Work Attachments</h2>
                                        <div className='flex flex-col gap-3'>
                                            {
                                                assignmentDetails.attachments.length > 0 ? (
                                                    assignmentDetails.attachments.map(attachment => (
                                                        <div className='border border-black hover-shadow p-3 cursor-pointer flex justify-between items-start' key={attachment.id}>
                                                            <div className='flex justify-between items-start gap-3 flex-1'>
                                                                <div className='w-[15%] h-[80px] bg-secondary border border-black flex justify-center items-center p-2'>
                                                                    {
                                                                        attachment.attachment_type == 'file' ? (
                                                                            <i className="bi bi-files-alt text-3xl"></i>
                                                                        ) : (
                                                                            <i className="bi bi-link-45deg text-4xl"></i>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div className='flex-1'>
                                                                    <h3 className='text-xl'>{attachment?.attachment_name}</h3>
                                                                    <h6 className='text-muted text-sm'>{attachment?.attachment_type}</h6>
                                                                </div>
                                                            </div>
                                                            <button onClick={() => handleDeleteAttachment(attachment.id)}><i className="bi bi-trash text-red-700 text-xl"></i></button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No Attachment Found</div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className='border border-black py-2 px-3'>
                                    <h3 className='font-bold'>Attach</h3>
                                    <div className='flex justify-center items-center gap-5'>
                                        <div className='flex flex-col justify-center items-center gap-1'>
                                            <Dialog open={openAttachmentFormDialog} onOpenChange={setOpenAttachmentFormDialog}>
                                                <DialogTrigger className='hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black hover-shadow' onClick={() => handleUploadAttachmentClick('file')}>
                                                    <i className="bi bi-file-earmark-arrow-up-fill text-2xl"></i>
                                                </DialogTrigger>
                                                <DialogContent className="bg-white">
                                                    <Description className="font-semibold">{assignmentDetails.title}</Description>
                                                    <DialogHeader>
                                                        <DialogTitle className="mb-3 text-2xl font-bold">Upload Attachment</DialogTitle>
                                                        <form className='my-3' method='POST' onSubmit={handleUploadAttachmentSubmit} encType='multipart/form-data'>
                                                            <input type='hidden' name='school_work_id' value={assignment_id} />
                                                            <div className='form-group'>
                                                                <label className='form-label'>File Type</label>
                                                                <input name='attachment_type' value={uploadAttachmentType} className='form-control my-2' readOnly />
                                                            </div>
                                                            <div className='form-group'>
                                                                <label className='form-label'>Attachment</label>
                                                                <input type={uploadAttachmentType == "file" ? "file" : "url"} className='form-control my-2' name='attachment' />
                                                            </div>
                                                            <button disabled={submitBtnLoad ? "disabled" : false} className={`my-2 w-full block btn btn-primary hover-shadow`}>Upload</button>
                                                        </form>
                                                    </DialogHeader>
                                                </DialogContent>
                                            </Dialog>
                                            <h6>Upload</h6>
                                        </div>
                                        <div className='flex flex-col justify-center items-center gap-1'>
                                            <button className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black hover-shadow" onClick={() => handleUploadAttachmentClick('link')}>
                                                <i className="bi bi-link text-2xl"></i>
                                            </button>
                                            <h6>Link</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='xl:col-span-1'>
                                <div className='border border-black py-2 px-3'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                        <div className='form-group col-span-2'>
                                            <label className='mb-2 block'>Points</label>
                                            <input className='form-control'
                                                value={assignmentDetails?.points || 0}
                                                name="points"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className='form-group col-span-2'>
                                            <label className='mb-2 block'>Due</label>
                                            <input className='form-control'
                                                value={assignmentDetails.due_datetime}
                                                type='datetime-local'
                                                name='due_datetime'
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <button onClick={handleUpdateAssignment} className='w-full btn btn-primary'>Update</button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="student_works">
                        <div className="grid grid-cols-3 gap-3">
                            <div className="col-span-1">
                                <div className="bg-white p-3 border border-black mb-3 hover-shadow">
                                    <button className="btn btn-primary">
                                        <i className="bi bi-file-check"></i> All Submissions
                                    </button>
                                </div>
                                <div className="border border-black hover-shadow p-4 bg-white">
                                    <h3 className="font-bold">Students</h3>
                                    <div className="my-3">
                                        <div className="flex flex-col">
                                            {
                                                submittedStudentWorks?.length > 0 ? (
                                                    submittedStudentWorks.map((submitted_student_work, index) => (
                                                        <div className="cursor-pointer hover:bg-gray-100 hover:rounded py-2.5 px-3 flex items-center gap-2 justify-between border border-black rounded" key={index}>
                                                            <div className="flex items-center gap-2">
                                                                <img src="#" alt="avatar" className="size-8 rounded-full bg-zinc-500" />                                                        <div className="flex flex-col gap-0.5">
                                                                    <h5 className="text-sm font-medium">{submitted_student_work.student.firstname} {submitted_student_work.student.lastname}</h5>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {/* <div className="size-2.5 bg-lime-500 rounded-full"></div> */}
                                                                <span className="text-sm">{submitted_student_work.score}/50</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No Students Found</div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                {/* All Submissions */}
                                {/* <div className="border border-black">
    
                                </div> */}
                                {/* Student Dashboard */}
                                {
                                    Object.keys(selectedSubmittedWork).length != 0 && selectedSubmittedWork.constructor === Object && (
                                        <div className="border border-black hover-shadow p-4 bg-white">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h2 className="font-semibold text-xl">{selectedSubmittedWork?.student?.firstname} {selectedSubmittedWork?.student?.lastname}</h2>
                                                        <h6 className="uppercase">Grade: {selectedSubmittedWork.grade}%</h6>
                                                    </div>
                                                    <div>
                                                        <h5 className="text-2xl">{selectedSubmittedWork.score}/{assignmentDetails.points}</h5>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="font-bold text-xl">Attachments</h2>
                                                    <div className="grid grid-cols-2 gap-3 my-3">
                                                        {
                                                            selectedSubmittedWork?.attachments?.length > 0 ? (
                                                                selectedSubmittedWork?.attachments?.map(attachment => (
                                                                    <Link href={`/instructor/classes/${class_id}/school-works/${assignment_id}/student-submissions/${attachment.student_submission_id}`} key={attachment.id}>
                                                                        <div className='border border-black hover-shadow p-3 cursor-pointer'>
                                                                            <div className='flex justify-between items-start gap-3'>
                                                                                <div className='w-[15%] h-[70px] bg-secondary border border-black flex justify-center items-center p-2'>
                                                                                    <i className="bi bi-files-alt text-3xl"></i>
                                                                                </div>
                                                                                <div className='w-[85%] text-wrap'>
                                                                                    <h3 className='text-lg text-wrap'>{attachment?.attachment_name.length >= 20 ? attachment?.attachment_name.slice(0, 20) + '...' : attachment?.attachment_name}</h3>
                                                                                    <h6 className='text-muted text-sm'>{attachment?.attachment_type}</h6>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                ))
                                                            ) : (
                                                                <div>No Attachment Found</div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div >
    )
}
