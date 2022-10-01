import { QuestionResponse } from "../question/questionResponse.interface";

export interface OptionResponse {
    id: number;
    optionName: string;
    isCorrect: boolean;
    questionId: number;
    question: QuestionResponse;
    createdAt: string;
}