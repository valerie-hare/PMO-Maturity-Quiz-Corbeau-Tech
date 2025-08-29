
export enum Category {
    Governance = "Governance & Standards",
    ResourceManagement = "Resource Management",
    PerformanceReporting = "Performance & Reporting",
    StrategicAlignment = "Strategic Alignment",
    RiskManagement = "Risk & Issue Management",
}

export interface Answer {
    text: string;
    score: number;
}

export interface Question {
    id: number;
    text: string;
    category: Category;
    answers: Answer[];
}

export type Scores = Record<Category, number>;

export type Recommendations = Record<Category, string>;

export type AnswerSelection = Record<number, number>; // questionId: answerIndex
