"use client";

import AgoraRTC, {
    AgoraRTCProvider,
    LocalVideoTrack,
    RemoteUser,
    useJoin,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRTCClient,
    useRemoteAudioTracks,
    useRemoteUsers,
} from "agora-rtc-react";


function Call(props) {
    const client = useRTCClient(
        AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
    );

    return (
        <AgoraRTCProvider client={client}>
            <Videos channelName={props.channelName} AppID={props.appId} />
            <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center pb-4">
                <a
                    className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
                    href="/"
                >
                    End Call
                </a>
            </div>
        </AgoraRTCProvider>
    );
}

function Videos(props) {
    const { AppID, channelName } = props;
    const { isLoading: isLoadingMic, localMicrophoneTrack } =
        useLocalMicrophoneTrack();
    const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
    const remoteUsers = useRemoteUsers();
    const { audioTracks } = useRemoteAudioTracks(remoteUsers);

    usePublish([localMicrophoneTrack, localCameraTrack]);
    useJoin({
        appid: AppID,
        channel: channelName,
        token: null,
    });

    audioTracks.forEach((track) => track.play());
    const deviceLoading = isLoadingMic || isLoadingCam;
    if (deviceLoading)
        return (
            <div className="flex flex-col items-center pt-40">Loading devices...</div>
        );
    const unit = "minmax(0, 1fr) ";

    return (
        <main class="container">

            <div id="room__container">
                <section id="members__container">

                    <div id="members__header">
                        <p>Participants</p>
                        <strong id="members__count">27</strong>
                    </div>

                    <div id="member__list">
                        <div class="member__wrapper" id="member__1__wrapper">
                            <span class="green__icon"></span>
                            <p class="member_name">Sulammita</p>
                        </div>

                        <div class="member__wrapper" id="member__2__wrapper">
                            <span class="green__icon"></span>
                            <p class="member_name">Dennis Ivy</p>
                        </div>

                    </div>

                </section>

                <section id="stream__container">
                    <div id="streams__container">
                        <LocalVideoTrack
                            track={localCameraTrack}
                            play={true}
                            className="video__container"
                        />
                        {remoteUsers.map((user) => (
                            <RemoteUser user={user} className="video__container" />
                        ))}

                    </div>

                    <div class="stream__actions">
                        <button id="camera-btn">
                            <i class="bi bi-camera-video"></i>
                        </button>
                        <button id="mic-btn" class="active">
                            <i class="bi bi-mic"></i>
                        </button>
                        <button id="leave-btn">
                            <i class="bi bi-box-arrow-right"></i>
                        </button>
                    </div>
                </section>

                {/* <section id="messages__container">

                    <div id="messages">
                        <div class="message__wrapper">
                            <div class="message__body__bot">
                                <strong class="message__author__bot">🤖 E-CDM Bot</strong>
                                <p class="message__text__bot">Welcome to the room, Don't be shy, say hello!</p>
                            </div>
                        </div>
                    </div>

                    <form id="message__form">
                        <input type="text" name="message" placeholder="Send a message...." />
                    </form>

                </section> */}
            </div>
        </main>
    );
}

export default Call;

