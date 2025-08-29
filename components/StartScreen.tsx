import React from 'react';

interface StartScreenProps {
    onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-violet-600 mb-4">PMO Maturity Assessment</h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                How effective is your Project Management Office? This quick quiz will help you assess your PMO's maturity across five key areas.
                You'll receive a visual score and AI-powered recommendations to help you identify strengths and opportunities for growth.
            </p>
            <button
                onClick={onStart}
                className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition-transform transform hover:scale-105 shadow-lg"
            >
                Start Quiz
            </button>
        </div>
    );
};