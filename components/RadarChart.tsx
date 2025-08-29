import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
    subject: string;
    score: number;
    maxScore: number;
}

interface RadarChartComponentProps {
    data: ChartData[];
}

export const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                <PolarGrid stroke="#cbd5e1" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 14 }} />
                <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={{ fill: 'none' }} axisLine={{ stroke: 'none' }} />
                <Radar 
                    name="Your Score" 
                    dataKey="score" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.6} 
                />
                <Legend wrapperStyle={{ color: '#475569' }} />
            </RadarChart>
        </ResponsiveContainer>
    );
};