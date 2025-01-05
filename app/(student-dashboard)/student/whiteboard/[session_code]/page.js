"use client";

import { useParams } from "next/navigation";
import Whiteboard from "../../../../components/WhiteBoard";
import { useEffect, useState } from "react";
import jsCookie from 'js-cookie';
import axios from "axios";

const WhiteboardPage = () => {
    const params = useParams();
    const session_code = params.session_code;
    const [roomUUID, setRoomUUID] = useState('');
    const [roomToken, setRoomToken] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchConferenceSession = async (session) => {
        try {
            console.log(session);
            const response = await axios.get(`http://192.168.100.44:8000/api/whiteboards/${session_code}`, {
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
            <Whiteboard session_id={session_code} roomUUID={roomUUID} roomToken={roomToken} />
        </div>
    );
};

export default WhiteboardPage;
