"use client"
// components/QuizForm.js
import { useState } from 'react';

export default function QuizForm({ quizId }) {
    const [questions, setQuestions] = useState([
        { questionText: '', type: 'choice', choices: [{ text: '', isCorrect: false }] }
    ]);

    // Function to add a new question
    const addQuestion = () => {
        setQuestions([
            ...questions,
            { questionText: '', type: 'choice', choices: [{ text: '', isCorrect: false }] }
        ]);
    };

    // Function to handle changes in the question input fields
    const handleQuestionChange = (index, key, value) => {
        const newQuestions = [...questions];
        newQuestions[index][key] = value;
        setQuestions(newQuestions);
    };

    // Function to handle changes in the choice input fields
    const handleChoiceChange = (questionIndex, choiceIndex, key, value) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices[choiceIndex][key] = value;
        setQuestions(newQuestions);
    };

    // Function to add a new choice for a specific question
    const addChoice = (index) => {
        const newQuestions = [...questions];
        newQuestions[index].choices.push({ text: '', isCorrect: false });
        setQuestions(newQuestions);
    };

    // Function to remove a specific choice
    const removeChoice = (questionIndex, choiceIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].choices.splice(choiceIndex, 1);
        setQuestions(newQuestions);
    };

    // Function to remove a specific question
    const removeQuestion = (questionIndex) => {
        const newQuestions = questions.filter((_, index) => index !== questionIndex);
        setQuestions(newQuestions);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/save-quiz', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quizId, questions }),
        });

        if (response.ok) {
            console.log('Quiz saved successfully');
        } else {
            console.log('Error saving quiz');
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded border-2 border-black hover-shadow">
            <h1 className="text-xl font-bold mb-4">Create Quiz</h1>
            <form onSubmit={handleSubmit}>
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-6">
                        <div className="flex justify-between items-center">
                            <label className="block text-gray-700 mb-2">
                                Question {questionIndex + 1}
                            </label>
                            <button
                                type="button"
                                onClick={() => removeQuestion(questionIndex)}
                                className="text-red-500 text-sm"
                            >
                                Remove Question
                            </button>
                        </div>

                        <input
                            type="text"
                            value={question.questionText}
                            onChange={(e) => handleQuestionChange(questionIndex, 'questionText', e.target.value)}
                            className="w-full p-2 border border-black hover-shadow rounded mb-4"
                            placeholder="Enter the question"
                        />

                        <select
                            value={question.type}
                            onChange={(e) => handleQuestionChange(questionIndex, 'type', e.target.value)}
                            className="w-full p-2 border border-black hover-shadow rounded mb-4"
                        >
                            <option value="choice">Multiple Choice</option>
                            <option value="paragraph">Long Answer</option>
                        </select>

                        {question.type === 'choice' && (
                            <div>
                                {question.choices.map((choice, choiceIndex) => (
                                    <div key={choiceIndex} className="flex items-center mb-2">
                                        <input
                                            type="text"
                                            value={choice.text}
                                            onChange={(e) =>
                                                handleChoiceChange(questionIndex, choiceIndex, 'text', e.target.value)
                                            }
                                            className="w-full p-2 border border-black hover-shadow rounded mr-4"
                                            placeholder={`Choice ${choiceIndex + 1}`}
                                        />
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={choice.isCorrect}
                                                onChange={(e) =>
                                                    handleChoiceChange(questionIndex, choiceIndex, 'isCorrect', e.target.checked)
                                                }
                                                className="mr-2"
                                            />
                                            Correct
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => removeChoice(questionIndex, choiceIndex)}
                                            className="text-red-500 ml-4"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => addChoice(questionIndex)}
                                    className="text-primary mb-4"
                                >
                                    Add Choice
                                </button>
                            </div>
                        )}

                        {question.type === 'paragraph' && (
                            <textarea
                                className="w-full p-2 border border-black hover-shadow rounded"
                                placeholder="Long answer text"
                                disabled
                            />
                        )}
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full p-2 btn bg-secondary text-black hover-shadow rounded mb-4"
                >
                    Add Another Question
                </button>

                <button type="submit" className="w-full p-2 btn btn-primary hover-shadow text-white rounded">
                    Submit Quiz
                </button>
            </form>
        </div>
    );
}
