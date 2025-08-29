import React from 'react';
import { QUIZ_QUESTIONS } from '../constants';
import { type Question } from '../types';

interface QuizScreenProps {
    currentQuestionIndex: number;
    onAnswer: (questionId: number, answerIndex: number) => void;
    onNext: () => void;
    onPrev: () => void;
    selectedAnswer?: number;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ currentQuestionIndex, onAnswer, onNext, onPrev, selectedAnswer }) => {
    const question: Question = QUIZ_QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;
    const isLastQuestion = currentQuestionIndex === QUIZ_QUESTIONS.length - 1;

    return (
        <div className="p-6 md:p-8 bg-white rounded-2xl shadow-xl w-full">
            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between mb-1">
                    <span className="text-base font-medium text-violet-600">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                    <span className="text-sm font-medium text-violet-600">{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-violet-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            {/* Question */}
            <div className="mb-8">
                <p className="text-sm font-semibold text-slate-500 mb-2">{question.category}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{question.text}</h2>
            </div>
            
            {/* Answers */}
            <div className="space-y-4 mb-8">
                {question.answers.map((answer, index) => (
                    <label
                        key={index}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedAnswer === index
                                ? 'border-violet-500 bg-violet-100'
                                : 'border-slate-300 hover:bg-violet-50'
                        }`}
                    >
                        <input
                            type="radio"
                            name={`question-${question.id}`}
                            className="hidden"
                            checked={selectedAnswer === index}
                            onChange={() => onAnswer(question.id, index)}
                        />
                        <span className={`w-5 h-5 mr-4 rounded-full border-2 flex-shrink-0 transition-colors ${
                            selectedAnswer === index ? 'border-violet-600 bg-violet-600' : 'border-slate-400'
                        }`}></span>
                        <span className="text-slate-700">{answer.text}</span>
                    </label>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <button
                    onClick={onPrev}
                    disabled={currentQuestionIndex === 0}
                    className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={onNext}
                    disabled={selectedAnswer === undefined}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-2 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLastQuestion ? 'See Results' : 'Next'}
                </button>
            </div>
        </div>
    );
};