// pages/create-quiz.js
import QuizForm from '../../../components/QuizForm';

export default function CreateQuizPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <QuizForm quizId={1} />
        </div>
    );
}