"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import smartPeopleIllustration from "../../../../public/smart-people-illustration.png";
import jsCookie from "js-cookie";

export default function GuardianDashboard() {
    const [authSession, setAuthSession] = useState(null);
    useEffect(() => {
        let session = JSON.parse(jsCookie.get("session"));
        setAuthSession(session);
    }, []);

    if (!authSession) return;

    return (
        <div className="w-full">
            <div className="w-full xl:h-[350px] overflow-hidden bg-white border border-black py-8 px-5 hover-shadow rounded">
                <div className="flex justify-between items-start">
                    <Image src={smartPeopleIllustration} className="w-[50%]" />
                    <div className="w-[40%]">
                        <h5 className="font-medium">Good Day,</h5>
                        <h2 className="text-3xl font-bold">
                            {authSession?.user?.firstname} {authSession?.user?.lastname}
                        </h2>
                        <p className="my-2">Welcome, Guardian! Your dashboard is ready to view your children grades.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
