"use client"
import React, { useEffect, useState } from 'react';
import jsCookie from 'js-cookie';

const StudentGuardianPage = () => {
    const [guardian, setGuardian] = useState({});
    const [authSession, setAuthSession] = useState(null);

    useEffect(() => {
        const session = JSON.parse(jsCookie.get('session') ?? null);
        setAuthSession(session);
        setIsLoading(false);
    }, []);


    return (
        <div className='container-fluid'>

        </div>
    );
}

export default StudentGuardianPage;
