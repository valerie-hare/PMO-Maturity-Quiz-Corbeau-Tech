import React, { useState } from 'react';
import { type Scores, type Recommendations, Category } from '../types';
import { RadarChartComponent } from './RadarChart';
import { Spinner } from './Spinner';

interface ResultsScreenProps {
    scores: Scores | null;
    maxScores: Scores;
    recommendations: Recommendations | null;
    isLoading: boolean;
    error: string | null;
    onRetake: () => void;
}

const CategoryResult: React.FC<{
    category: Category;
    score: number;
    maxScore: number;
    recommendation?: string;
    isLoading: boolean;
}> = ({ category, score, maxScore, recommendation, isLoading }) => {
    
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    const formatRecommendation = (text: string) => {
        // Use regex to find the content for each labeled section.
        // The /s flag allows . to match newlines if they exist.
        const insightMatch = text.match(/\*\*Insight:\*\*\s*(.*?)(?=\*\*|$)/s);
        const followUpMatch = text.match(/\*\*Follow-up Questions:\*\*\s*(.*?)(?=\*\*|$)/s);
        const nextStepMatch = text.match(/\*\*Next Step:\*\*\s*(.*?)(?=\*\*|$)/s);

        const insight = insightMatch ? insightMatch[1].trim() : '';
        const followUpQuestions = followUpMatch ? followUpMatch[1].trim() : '';
        const nextStep = nextStepMatch ? nextStepMatch[1].trim() : '';

        // If parsing fails, just display the raw text.
        if (!insight && !followUpQuestions && !nextStep) {
            return <p>{text}</p>;
        }

        return (
            <div className="space-y-3">
                {insight && (
                    <div>
                        <strong className="block text-slate-800 font-semibold">Insight</strong>
                        <p className="text-slate-600 italic">{insight}</p>
                    </div>
                )}
                {followUpQuestions && (
                     <div className="pt-3 border-t border-slate-200">
                        <strong className="block text-slate-800 font-semibold">Follow-up Questions</strong>
                        <p className="text-slate-600">{followUpQuestions}</p>
                    </div>
                )}
                {nextStep && (
                    <div className="pt-3 border-t border-slate-200">
                        <strong className="block text-slate-800 font-semibold">Next Step</strong>
                        <p className="text-slate-600">{nextStep}</p>
                    </div>
                )}
            </div>
        )
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col border border-slate-200">
            <h3 className="text-xl font-bold text-violet-600 mb-3">{category}</h3>
            
            <div className="mb-4">
                 <div className="flex justify-between items-baseline mb-1">
                    <span className="text-lg font-semibold text-slate-900">Score: {score} / {maxScore}</span>
                    <span className="text-sm font-medium text-violet-600">{percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-violet-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
            
            <div className="text-slate-600 min-h-[100px] flex-grow text-sm">
                {isLoading ? <Spinner /> : recommendation ? formatRecommendation(recommendation) : 'No recommendation available.'}
            </div>
        </div>
    );
};


export const ResultsScreen: React.FC<ResultsScreenProps> = ({ scores, maxScores, recommendations, isLoading, error, onRetake }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadPdf = async () => {
        const { jsPDF } = (window as any).jspdf;
        const html2canvas = (window as any).html2canvas;

        if (!jsPDF || !html2canvas) {
            console.error("PDF generation libraries not loaded.");
            alert("Sorry, the PDF report feature is currently unavailable.");
            return;
        }

        const reportElement = document.getElementById('report-content');
        if (!reportElement) {
            console.error("Report content element not found");
            return;
        }

        setIsDownloading(true);
        try {
            const canvas = await html2canvas(reportElement, { 
                scale: 2, // Higher resolution for better quality
                backgroundColor: '#ffffff' // Set a solid white background for the capture
            });
            const imgData = canvas.toDataURL('image/png');
            
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            // Using A4 width (210mm) as a standard reference for the PDF width.
            const pdfWidth = 210; 
            // Calculate the required height of the PDF page to maintain the aspect ratio of the captured image.
            const pdfHeight = (canvasHeight * pdfWidth) / canvasWidth;

            // Create a new PDF with custom dimensions to fit the entire content on one page.
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: [pdfWidth, pdfHeight]
            });
            
            // Add the captured image to the single, long page of the PDF.
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            pdf.save('pmo-maturity-report.pdf');
        } catch (err) {
            console.error("Error generating PDF", err);
            alert("An error occurred while creating the PDF report.");
        } finally {
            setIsDownloading(false);
        }
    };
    
    if (!scores) {
        return (
            <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Calculating Results...</h2>
                <Spinner />
            </div>
        );
    }
    
    const chartData = Object.values(Category).map(category => ({
        subject: category.split(' ')[0], // Short name for chart
        score: scores[category],
        maxScore: maxScores[category],
    }));

    return (
        <div className="p-4 md:p-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl animate-fade-in">
            <div id="report-content">
                <h2 className="text-4xl font-bold text-center text-slate-900 mb-2">Your PMO Maturity Profile</h2>
                <p className="text-center text-slate-600 mb-8">Here's a breakdown of your results and personalized recommendations.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                    <div className="w-full h-80 md:h-96">
                        <RadarChartComponent data={chartData} />
                    </div>
                    <div className="text-slate-600 bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <h3 className="text-xl font-bold text-violet-600 mb-3">Understanding Your Chart</h3>
                        <p className="mb-2">The pentagonal graph visualizes your PMO's maturity across five core competencies. A balanced shape closer to the outer edge indicates a higher, more consistent level of maturity.</p>
                        <p>Use this chart to quickly identify your PMO's strongest areas and where the most significant opportunities for improvement lie.</p>
                    </div>
                </div>

                {error && <div className="text-center bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg mb-8">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
                    {Object.values(Category).map((cat, index) => {
                        const classNames = index < 2 ? "lg:col-span-3" : "lg:col-span-2";
                        return (
                            <div key={cat} className={classNames}>
                                <CategoryResult
                                    category={cat}
                                    score={scores[cat]}
                                    maxScore={maxScores[cat]}
                                    recommendation={recommendations?.[cat]}
                                    isLoading={isLoading}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="text-center mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isDownloading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Generating...</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Download Report</span>
                        </>
                    )}
                </button>
                <button
                    onClick={onRetake}
                    className="bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105 shadow-lg"
                >
                    Retake Quiz
                </button>
            </div>
        </div>
    );
};