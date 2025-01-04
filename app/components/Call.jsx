"use client";

import AgoraRTC, {
    AgoraRTCProvider,
    LocalUser,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRTCClient,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jsCookie from 'js-cookie';

function Call(props) {
    const client = useRTCClient(
        AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
    );

    return (
        <AgoraRTCProvider client={client}>
            <Videos channelName={props.channelName} AppID={props.appId} studentId={props.studentId} />
        </AgoraRTCProvider>
    );
}

function Videos(props) {
    const router = useRouter();
    const [micOn, setMic] = useState(false);
    const [cameraOn, setCamera] = useState(true);
    const { AppID, channelName } = props;
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack(cameraOn);
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);
    const client = useRTCClient(); // Get the AgoraRTC client instance
    const [isAllowed, setIsAllowed] = useState(true);
    const [hasLeft, setHasLeft] = useState(false);

    usePublish([localMicrophoneTrack, localCameraTrack]);

    useJoin({
        appid: AppID,
        channel: channelName,
        token: null,
        uid: props.studentId ?? "Instructor",
    });

    audioTracks.forEach((track) => track.play());

    const deviceLoading = isLoadingMic || isLoadingCam;

    const leaveChannel = async () => {
        try {
            const session = JSON.parse(jsCookie.get('session'));
            const response = await axios.post(`http://192.168.56.1:8000/api/live-sessions/leave-session`, { session_code: props.session_id }, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${session.token}`,
                }
            });

            await client.leave();
            setHasLeft(true);
            console.log("Left the channel successfully");
            router.back();
        } catch (error) {
            console.error("Failed to leave the channel:", error);
        }
    };

    if (hasLeft) {
        return (
            <div className="flex flex-col items-center pt-40">
                You have left the channel.
            </div>
        );
    }

    if (!isAllowed) {
        return (
            <div className="flex flex-col items-center pt-40">
                Another tab is already open in this room.
            </div>
        );
    }

    if (deviceLoading) {
        return (
            <div className="flex flex-col items-center pt-40">Loading devices...</div>
        );
    }

    return (
        <main className="container">
            <div id="room__container">
                <section id="members__container">
                    <div id="members__header">
                        <p>Participants <span className="text-small">({props.channelName})</span></p>
                        <strong id="members__count">{remoteUsers.length + 1}</strong>
                    </div>
                    <div id="member__list" className="mt-5">
                        <div className="member__wrapper" id="member__2__wrapper">
                            <span className="green__icon"></span>
                            <p className="member_name">{props.studentId ?? "Instructor"} (You)</p>
                            <div>
                                <span>{cameraOn ? '📷 On' : '📷 Off'}</span>
                                <span>{micOn ? '🎤 On' : '🎤 Off'}</span>
                            </div>
                        </div>
                        {remoteUsers.map((user) => (
                            <div className="member__wrapper" id={`member__${user.uid}__wrapper`} key={user.uid}>
                                <span className="green__icon"></span>
                                <p className="member_name">User {user.uid}</p>
                                <div>
                                    <span>{user.videoTrack ? '📷 On' : '📷 Off'}</span>
                                    <span>{user.audioTrack ? '🎤 On' : '🎤 Off'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="stream__container">
                    <div id="streams__container">
                        <LocalUser
                            audioTrack={localMicrophoneTrack}
                            cameraOn={cameraOn}
                            micOn={micOn}
                            videoTrack={localCameraTrack}
                            className="video__container"
                            cover="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
                        >
                            <samp className="user-name text-white text-xl">You</samp>
                        </LocalUser>
                        {remoteUsers.map((user) => (
                            <RemoteUser
                                key={user.uid}
                                user={user}
                                cover="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png"
                                className="video__container"
                            />
                        ))}
                    </div>

                    <div className="stream__actions">
                        <button id="camera-btn" className={cameraOn ? 'active' : null} onClick={() => setCamera((prev) => !prev)}>
                            <i className="bi bi-camera-video"></i>
                        </button>
                        <button id="mic-btn" className={micOn ? 'active' : null} onClick={() => setMic((prev) => !prev)}>
                            <i className="bi bi-mic"></i>
                        </button>
                        <button id="leave-btn" onClick={leaveChannel}>
                            <i className="bi bi-box-arrow-right"></i> Leave
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Call;
