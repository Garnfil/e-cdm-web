"use client"

import React, { useEffect, useRef, useState } from 'react'
import jsCookie from 'js-cookie';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { formatDate } from 'date-fns';
import Pusher from 'pusher-js';
import cdmAvatar from '../../../../../../public/user-profile.jpg';
import Image from 'next/image';

const ClassChatPage = () => {
    const params = useParams();
    const chatboxRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [authSession, setAuthSession] = useState({});
    const [classroom, setClassroom] = useState({});
    const [message, setMessage] = useState('');

    const fetchClassMessages = async (session) => {
        try {
            const response = await axios.get(`https://app-digital-cdm.godesqsites.com/api/messages/classes/${params.class_id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`
                }
            });

            setMessages(response?.data?.messages);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchClass = async (session) => {
        try {
            const response = await axios.get(`https://app-digital-cdm.godesqsites.com/api/classes/${params.class_id}`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${session.token}`
                }
            });

            setClassroom(response?.data?.class);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
        fetchClassMessages(session);
        fetchClass(session);

        // Initialize Pusher for real-time updates
        const pusher = new Pusher('dcb5e22ff8f02d72a547', {
            cluster: 'ap1',
            encrypted: true
        });

        // Subscribe to the specific class channel
        const channel = pusher.subscribe(`class.message.${params.class_id}`);
        channel.bind('new-class-message', (data) => {
            console.log(data);
            setMessages((prevMessages) => [...prevMessages, data]);
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        });

        // Cleanup on component unmount
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
            pusher.disconnect();
        };
    }, [])

    const handleSubmitMessage = async () => {
        try {
            const data = {
                user_id: authSession.user.id,
                user_type: authSession.user.role,
                content: message
            }
            console.log(data);
            const response = await axios.post(`https://app-digital-cdm.godesqsites.com/api/messages/classes/${params.class_id}`, data, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authSession.token}`,
                }
            })

            setMessage("");

        } catch (error) {
            console.log(response);
        }
    }

    return (
        <div className='container-fluid'>
            <div className="border-black rounded-lg border text-base bg-white dark:bg-neutral-600 min-h-[60vh]">
                <div className="overflow-hidden w-full relative">
                    <div className="hsdfdsfhsdf lsdfdfsdafd pdskdmsdnjw qesolakmsjd px-6 pt-3 pb-3 border-b border-black">
                        <h3 className="text-lg font-semibold">{classroom?.title}</h3>
                    </div>

                    <div id="chatbox" ref={chatboxRef} className="hsdfdsfhsdf oskasdadiaa gap-6 h-[70vh] scrollbars show overflow-auto p-6 rounded-t-xl">
                        {
                            messages.length > 0 ? (
                                messages.map((message, index) => (
                                    <div className={`${authSession?.user?.id == message.user.id && authSession.user.role == message.user.role ? "chat-2" : "chat-1"} hsdfdsfhsdf lsdfdfsdafd gap-2`} key={index}>
                                        <div className="chat-avatar hsdfdsfhsdf-none w-8 h-8 hsdfdsfhsdf pdskdmsdnjw justify-center rounded-full font-bold bg-neutral-100 dark:bg-neutral-700 border border-black">
                                            <Image src={cdmAvatar} width={0} height={0} alt="avatar" className="w-8 h-8 rounded-full" />
                                        </div>

                                        <div className="chat-content max-w-[280px] py-2 px-4 w-auto bg-neutral-100 dark:bg-neutral-700 border border-black">
                                            <small className='text-primary font-bold'>{message?.user?.firstname} {message?.user?.lastname}</small>
                                            <p className="text-sm">{message.content}</p>
                                            <span className="text-xs text-neutral-500 dark:text-neutral-400">{formatDate(new Date(message.created_at), 'MMM dd, yyyy h:m a')}</span>
                                        </div>
                                    </div>
                                ))

                            ) : (
                                <div className="text-center">
                                    No Messages Found
                                </div>
                            )
                        }
                    </div>
                    <div className="px-6 py-4 hsdfdsfhsdf pdskdmsdnjw qesolakmsjd relative rounded-b-xl gap-2">
                        <div className="hsdfdsfhsdf pdskdmsdnjw gap-3 absolute right-1 top-[1.100rem] pe-9">

                            <button className="ms-1 inline-hsdfdsfhsdf !pdskdmsdnjw justify-center  gap-x-2 py-2.5 rounded-[6.25rem] text-sm tracking-[.00714em] text-center font-medium" onClick={handleSubmitMessage}>
                                <span className="bi bi-send rotate-45 text-xl"></span>
                            </button>
                        </div>

                        <input type="text" placeholder="Type a message..." className="w-full py-3 px-4 h-12 border border-black rounded focus:outline-none bg-neutral-100 focus:ring-0" value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ClassChatPage;
