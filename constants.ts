
import { type Question, Category } from './types';

export const CATEGORIES: { id: Category; name: string }[] = [
    { id: Category.Governance, name: "Governance & Standards" },
    { id: Category.ResourceManagement, name: "Resource Management" },
    { id: Category.PerformanceReporting, name: "Performance & Reporting" },
    { id: Category.StrategicAlignment, name: "Strategic Alignment" },
    { id: Category.RiskManagement, name: "Risk & Issue Management" },
];

export const QUIZ_QUESTIONS: Question[] = [
    {
        id: 1,
        category: Category.Governance,
        text: "How would you describe your project management methodology?",
        answers: [
            { text: "We don't have a formal methodology; teams do what they think is best.", score: 1 },
            { text: "A basic, standardized methodology is documented but not consistently followed.", score: 2 },
            { text: "A tailored, standardized methodology is consistently applied across most projects.", score: 3 },
            { text: "Our methodology is continuously improved with feedback and integrated across the organization.", score: 4 }
        ]
    },
    {
        id: 2,
        category: Category.Governance,
        text: "How are project roles and responsibilities defined?",
        answers: [
            { text: "They are informally discussed at the start of each project.", score: 1 },
            { text: "Generic roles are defined but often unclear in practice.", score: 2 },
            { text: "Clear, documented roles (like a RACI chart) are used for all major projects.", score: 3 },
            { text: "Roles are clearly defined, understood, and linked to competency frameworks and training.", score: 4 }
        ]
    },
    {
        id: 3,
        category: Category.ResourceManagement,
        text: "How do you handle resource allocation for projects?",
        answers: [
            { text: "It's a reactive process; whoever is available gets assigned.", score: 1 },
            { text: "We have a central list of resources, but allocation is largely manual and ad-hoc.", score: 2 },
            { text: "We use a resource management tool to track availability and forecast demand.", score: 3 },
            { text: "A fully integrated system aligns resource capacity, demand, and strategic priorities in real-time.", score: 4 }
        ]
    },
     {
        id: 4,
        category: Category.ResourceManagement,
        text: "How is resource capacity planning conducted?",
        answers: [
            { text: "We don't do formal capacity planning.", score: 1 },
            { text: "Capacity is considered, but only for key individuals or highly specialized roles.", score: 2 },
            { text: "We conduct regular capacity planning by role or team, but it's disconnected from financial planning.", score: 3 },
            { text: "Capacity planning is an ongoing, strategic function, aligning workforce skills and availability with long-term business goals.", score: 4 }
        ]
    },
    {
        id: 5,
        category: Category.PerformanceReporting,
        text: "How is project status reported to stakeholders?",
        answers: [
            { text: "Status updates are informal and provided only when requested.", score: 1 },
            { text: "Basic status reports (e.g., email updates) are sent out occasionally.", score: 2 },
            { text: "Standardized dashboards with key metrics (scope, schedule, budget) are regularly updated and shared.", score: 3 },
            { text: "Automated, real-time dashboards provide tailored views for different stakeholders, from team members to executives.", score: 4 }
        ]
    },
    {
        id: 6,
        category: Category.PerformanceReporting,
        text: "How are project benefits and ROI measured?",
        answers: [
            { text: "Benefits are discussed but not formally tracked post-project.", score: 1 },
            { text: "Benefits are estimated in the business case but not verified after completion.", score: 2 },
            { text: "A process is in place to track and report on the realization of project benefits after delivery.", score: 3 },
            { text: "Benefits realization is actively managed and tied back to strategic objectives, influencing future portfolio decisions.", score: 4 }
        ]
    },
    {
        id: 7,
        category: Category.StrategicAlignment,
        text: "How are new projects selected and prioritized?",
        answers: [
            { text: "Based on who shouts the loudest or has the most authority.", score: 1 },
            { text: "Projects are selected based on individual business cases, but there's no portfolio-level view.", score: 2 },
            { text: "A formal scoring model is used to prioritize projects based on strategic criteria.", score: 3 },
            { text: "Portfolio is dynamically managed, continuously re-evaluating and re-prioritizing projects against shifting strategic goals.", score: 4 }
        ]
    },
    {
        id: 8,
        category: Category.StrategicAlignment,
        text: "How well is the PMO's value communicated to the organization?",
        answers: [
            { text: "The PMO's value is not well understood and is often seen as administrative overhead.", score: 1 },
            { text: "The PMO communicates its activities, but the link to business value isn't always clear.", score: 2 },
            { text: "The PMO regularly reports on its contribution to project success and business objectives.", score: 3 },
            { text: "The PMO is recognized as a strategic partner, and its value is demonstrated through clear, data-driven evidence of improved business outcomes.", score: 4 }
        ]
    },
    {
        id: 9,
        category: Category.RiskManagement,
        text: "How are project risks identified and managed?",
        answers: [
            { text: "Risks are discussed only when they become issues.", score: 1 },
            { text: "A risk log is maintained for some projects, but it's not consistently reviewed.", score: 2 },
            { text: "A formal risk management process (identify, assess, mitigate, monitor) is applied to all projects.", score: 3 },
            { text: "Proactive, quantitative risk analysis is performed, and risk management is integrated into the organizational culture.", score: 4 }
        ]
    },
    {
        id: 10,
        category: Category.RiskManagement,
        text: "How are lessons learned from projects captured and utilized?",
        answers: [
            { text: "Lessons learned are rarely discussed or documented.", score: 1 },
            { text: "A post-project review is held, but the findings are not stored centrally or shared.", score: 2 },
            { text: "Lessons learned are documented in a central repository, and project managers are encouraged to review them.", score: 3 },
            { text: "There is an active process to analyze lessons learned, identify trends, and systematically update processes and standards.", score: 4 }
        ]
    }
];
