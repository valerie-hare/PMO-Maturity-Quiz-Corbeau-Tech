import React, { useState, useCallback, useMemo } from 'react';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { QUIZ_QUESTIONS, CATEGORIES } from './constants';
import { type Scores, type Recommendations, type AnswerSelection, Category } from './types';
import { generateRecommendations } from './services/geminiService';

type AppState = 'start' | 'quiz' | 'results';

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>('start');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswerSelection>({});
    const [scores, setScores] = useState<Scores | null>(null);
    const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleStartQuiz = () => {
        setAppState('quiz');
    };

    const handleAnswerSelect = (questionId: number, answerIndex: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    };

    const handleNext = () => {
        if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            handleFinishQuiz();
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const maxScores = useMemo(() => {
        const calculatedMaxScores: Scores = {
            [Category.Governance]: 0,
            [Category.ResourceManagement]: 0,
            [Category.PerformanceReporting]: 0,
            [Category.StrategicAlignment]: 0,
            [Category.RiskManagement]: 0,
        };

        QUIZ_QUESTIONS.forEach(question => {
            const maxScoreInQuestion = Math.max(...question.answers.map(a => a.score));
            calculatedMaxScores[question.category] += maxScoreInQuestion;
        });
        return calculatedMaxScores;
    }, []);

    const handleFinishQuiz = useCallback(async () => {
        setAppState('results');
        setIsLoading(true);
        setError(null);

        const calculatedScores: Scores = {
            [Category.Governance]: 0,
            [Category.ResourceManagement]: 0,
            [Category.PerformanceReporting]: 0,
            [Category.StrategicAlignment]: 0,
            [Category.RiskManagement]: 0,
        };

        QUIZ_QUESTIONS.forEach(question => {
            const answerIndex = answers[question.id];
            if (answerIndex !== undefined) {
                calculatedScores[question.category] += question.answers[answerIndex].score;
            }
        });

        setScores(calculatedScores);

        try {
            const result = await generateRecommendations(calculatedScores, maxScores);
            setRecommendations(result);
        } catch (e) {
            console.error("Failed to generate recommendations:", e);
            setError("Sorry, we couldn't generate your personalized recommendations. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, [answers, maxScores]);

    const handleRetakeQuiz = () => {
        setAppState('start');
        setCurrentQuestionIndex(0);
        setAnswers({});
        setScores(null);
        setRecommendations(null);
        setIsLoading(false);
        setError(null);
    };

    const renderContent = () => {
        switch (appState) {
            case 'quiz':
                return (
                    <QuizScreen
                        currentQuestionIndex={currentQuestionIndex}
                        onAnswer={handleAnswerSelect}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        selectedAnswer={answers[QUIZ_QUESTIONS[currentQuestionIndex].id]}
                    />
                );
            case 'results':
                return (
                    <ResultsScreen
                        scores={scores}
                        maxScores={maxScores}
                        recommendations={recommendations}
                        isLoading={isLoading}
                        error={error}
                        onRetake={handleRetakeQuiz}
                    />
                );
            case 'start':
            default:
                return <StartScreen onStart={handleStartQuiz} />;
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 font-sans flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl mx-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default App;