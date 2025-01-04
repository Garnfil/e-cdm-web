// pages/create-quiz.js
"use client"
import { useParams } from 'next/navigation';
import QuizForm from '../../../../../../../components/QuizForm';
import { useEffect, useState } from 'react';

export default function CreateQuizPage() {
    const params = useParams();
    const { quiz_id } = params;
    const [authSession, setAuthSession] = useState({});
    const [quizDetails, setQuizDetails] = useState({});

    const fetchQuizDetails = async (session) => {
        const response = await axios.get(`http://192.168.56.1:8000/api/school-works/${quiz_id}`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${session.token}`
            }
        });
    }

    useEffect(() => {
        const session = JSON.parse(jsCookie.get('session'));
        setAuthSession(session);
        fetchQuizDetails(session);
    }, [])

    return (
        <div className="min-h-screen bg-gray-100">
            <QuizForm quizId={quiz_id} />
        </div>
    );
}