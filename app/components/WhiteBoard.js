"use client";

import React, { useEffect } from 'react';
import { useFastboard, Fastboard } from "@netless/fastboard-react";

const Whiteboard = (props) => {
    const { roomUUID, roomToken } = props;

    // Initialize fastboard directly with `useFastboard`
    const fastboard = useFastboard(() => ({
        sdkConfig: {
            appIdentifier: "i0mjMJ14Ee-2vE-Usdhn3A/RQXcJGIMcyUHLg",
            region: "sg",
        },
        joinRoom: {
            uid: String(Math.floor(Math.random() * 100000)),
            uuid: roomUUID,
            roomToken: roomToken,
        },
    }));

    return (
        <div className='w-full '>
            <div className='flex justify-center items-center flex-col gap-7'>
                <div
                    style={{
                        width: "100%",
                        height: "80vh",
                        border: "1px solid",
                        background: "#f1f2f3",
                    }}
                >
                    {/* Render Fastboard once initialized */}
                    {fastboard && <Fastboard app={fastboard} />}
                </div>
            </div>
        </div>
    );
};

export default Whiteboard;
