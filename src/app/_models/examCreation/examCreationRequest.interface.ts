export interface ExamCreationRequest {
    examName: string;
    examShortDescription: string;
    examDescription: string;
    examDuration: number;
    fieldExams: examCreationFieldExams[];
    questions: examCreationQuestions[];
}

export interface examCreationFieldExams {
    fieldId: number;
    examId: number;
}


export interface examCreationQuestions {
    questionName: string;
    questionDegree: number;
    options: examCreationQuestionsOptions[];
}

export interface examCreationQuestionsOptions {
    optionName: string;
    optionIsCorrect: boolean;
}