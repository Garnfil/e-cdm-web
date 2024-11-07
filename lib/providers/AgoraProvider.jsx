// lib/AgoraProvider.js
import React from 'react';
import { createClient, createMicrophoneAndCameraTracks, AgoraRTCProvider } from 'agora-rtc-react';

const config = { mode: 'rtc', codec: 'vp8' }; // Use desired mode and codec
const client = createClient(config);
const { ready: micReady, track: micTrack } = createMicrophoneAndCameraTracks();

const AgoraProvider = ({ children }) => (
    <AgoraRTCProvider client={client}>
        {children}
    </AgoraRTCProvider>
);

export { client, micTrack, micReady, AgoraProvider };
