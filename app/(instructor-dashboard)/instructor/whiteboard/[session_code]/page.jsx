"use client";

import { useParams, useRouter } from "next/navigation";
import Whiteboard from "../../../../components/WhiteBoard";
import { useEffect, useState } from "react";
import jsCookie from 'js-cookie';
import axios from "axios";

const WhiteboardPage = () => {
    const params = useParams();
    const router = useRouter();
    const session_code = params.session_code;
    const [roomUUID, setRoomUUID] = useState('');
    const [roomToken, setRoomToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchConferenceSession = async (session) => {
        try {
            console.log(session);
            const response = await axios.get(`http://192.168.100.110:8000/api/whiteboards/${session_code}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${session?.token}`,
                }
            });

            const { whiteboard, whiteboard_user } = response.data;
            setRoomUUID(whiteboard.agora_whiteboard_room_uuid);
            setRoomToken(whiteboard_user.room_token);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);  // Loading is done after data is fetched
        }
    };

    useEffect(() => {
        const session = JSON.parse(jsCookie.get("session"));
        fetchConferenceSession(session);
    }, []);

    // Render loading state or error message if roomToken or roomUUID are not ready
    if (isLoading) {
        return <div>Loading whiteboard...</div>;
    }

    if (!roomUUID || !roomToken) {
        return <div>Error: Unable to load the whiteboard session.</div>;
    }

    return (
        <div className="container-fluid">
            <div className='flex flex-col md:flex-row gap-2 justify-between items-start md:items-center mb-5'>
                <div>
                    <h2 className='text-2xl font-bold'>Whiteboard</h2>
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <ol className="list-none text-sm p-0 inline-flex">
                            <li className="flex pdskdmsdnjw">
                                <a href="#" className="hover:underline">Dashboard</a>
                            </li>
                            <li className="flex pdskdmsdnjw">
                                <span className="mx-2">›</span>
                                <a href="#" className="font-bold">Whiteboard</a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <button className="btn btn-primary" onClick={() => router.back()}><i className="bi bi-arrow-left mr-1"></i> Back</button>
            </div>
            <Whiteboard session_id={session_code} roomUUID={roomUUID} roomToken={roomToken} />
        </div>
    );
};

export default WhiteboardPage;
