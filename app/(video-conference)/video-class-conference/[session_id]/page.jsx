
"use client"
import Call from "@/app/components/Call";
import jsCookie from 'js-cookie';
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [isLoading, setIsLoading] = useState(true);
    const [authSession, setAuthSession] = useState(null);

    useEffect(() => {
        const session = JSON.parse(jsCookie.get('session') ?? null);
        setAuthSession(session);
        setIsLoading(false);
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!authSession) {
        return notFound();
    }


    return (
        <main className="flex w-full flex-col">
            <Call appId={"68d22aca928e415c904ae277cf3040ee"} channelName={params.session_id} studentId={authSession.user.student_id}></Call>
        </main>
    );
}

