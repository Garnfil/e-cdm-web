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

export default function ViewModulePage() {
    const params = useParams();
    const { module_id, class_id } = params;
    const [authSession, setAuthSession] = useState({});
    const [openAttachmentFormDialog, setOpenAttachmentFormDialog] = useState(false);
    const [uploadAttachmentType, setUploadAttachmentType] = useState('file');
    const [submitBtnLoad, setSubmitBtnLoad] = useState(false);

    const [moduleDetails, setModuleDetails] = useState({
        id: "",
        class_id: "",
        instructor_id: "",
        title: "",
        description: "",
        status: "posted",
        scheduled_datetime: "",
        attachments: [],
    });

    const fetchModule = async (session) => {
        try {
            const response = await axios.get(`http://192.168.100.110:8000/api/modules/${module_id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${session.token}`
                }
            });

            const { module } = response.data;

            if (response.status == 200) {
                setModuleDetails((prevDetails) => ({
                    ...prevDetails,
                    id: module.id,
                    class_id: module.class_id,
                    instructor_id: module.instructor_id,
                    title: module.title,
                    description: module.description,
                    status: module.status,
                    scheduled_datetime: module.scheduled_datetime,
                    attachments: module.attachments,
                }))
            }


        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
        fetchModule(session);
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Dynamically update the state property using the name of the input
        setModuleDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    }

    const handleUploadAttachmentSubmit = async (e) => {
        e.preventDefault();

        try {
            let formData = new FormData(e.target);
            setSubmitBtnLoad(true);
            const response = await axios.post(`http://192.168.100.110:8000/api/modules/attachments/single-upload`, formData, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${authSession.token}`,
                }
            });

            if (response.status == 200) {
                setSubmitBtnLoad(false);
                fetchModule(authSession);
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
                    const response = await axios.delete(`http://192.168.100.110:8000/api/school-works/attachments/${attachment_id}/destroy`, {
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

    const handleUpdateModule = async () => {
        try {
            const response = await axios.put(`http://192.168.100.110:8000/api/modules/${moduleDetails.id}`, moduleDetails, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${authSession.token}`
                }
            })

            if (response.status == 200) {
                toast.success('Assignment Updated Successfully');
                fetchModule(authSession);
            }
        } catch (error) {
            toast.error(error.message ?? "Server Error");
        }
    }

    return (
        <div className='container-fluid'>
            <div className='flex justify-between items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Module</h2>
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
                                <a href="#" className="font-bold">View Module</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <Link href={`/instructor/classes/${class_id}`} className='btn btn-primary hover-shadow'><i className="bi bi-arrow-left mr-1"></i> Back to Class</Link>
            </div>
            <div className="my-3">
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                    <div className='xl:col-span-2'>
                        <div className='border border-black py-2 px-3 mb-5'>
                            <div className='grid grid-cols-3 gap-3'>
                                <div className='form-group'>
                                    <label className='mb-2 block'>Title</label>
                                    <input
                                        className='form-control'
                                        value={moduleDetails.title}
                                        name="title"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label className='mb-2 block'>Scheduled Date Time</label>
                                    <input
                                        type='datetime-local'
                                        className='form-control'
                                        value={moduleDetails.scheduled_datetime}
                                        name="scheduled_datetime"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label className='mb-2 block'>Status</label>
                                    <select className='form-control'>
                                        <option selected={moduleDetails.status == 'posted' ? true : false} value={'posted'}>Posted</option>
                                        <option value={'draft'} selected={moduleDetails.status == 'draft' ? true : false}>Draft</option>
                                    </select>
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='mb-2 block'>Description </label>
                                <textarea className='form-control'
                                    rows={10}
                                    cols={10}
                                    name="description"
                                    onChange={handleChange}
                                    style={{ height: '200px' }} value={moduleDetails.description}></textarea>
                            </div>

                            <button className='btn btn-primary' onClick={handleUpdateModule}>Update Module</button>


                            <div className='mb-3 mt-5'>
                                <h2 className='mb-3 text-xl font-bold'>Module Attachments</h2>
                                <div className='flex flex-col gap-3'>
                                    {
                                        moduleDetails.attachments.length > 0 ? (
                                            moduleDetails.attachments.map(attachment => (
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

                    </div>
                    <div className='xl:col-span-1'>
                        <div className='border border-black py-2 px-3'>
                            <h3 className='font-bold'>Attach</h3>
                            <div className='flex justify-center items-center gap-5'>
                                <div className='flex flex-col justify-center items-center gap-1'>
                                    <Dialog open={openAttachmentFormDialog} onOpenChange={setOpenAttachmentFormDialog}>
                                        <DialogTrigger className='hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-white border border-black hover-shadow' onClick={() => handleUploadAttachmentClick('file')}>
                                            <i className="bi bi-file-earmark-arrow-up-fill text-2xl"></i>
                                        </DialogTrigger>
                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                                <DialogTitle className="mb-3">Upload Attachment</DialogTitle>
                                                <form className='my-3' method='POST' onSubmit={handleUploadAttachmentSubmit} encType='multipart/form-data'>
                                                    <input type='hidden' name='module_id' value={module_id} />
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
                </div>
            </div>
        </div >
    )
}
