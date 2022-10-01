import { ExamResponse } from "../exam/examResponse.interface";
import { OptionResponse } from "../option/optionResponse.interface";

export interface QuestionResponse {
    id: number;
    questionName: string;
    degree: number;
    examId: number;
    exam: ExamResponse;
    options: OptionResponse[];
    createdAt: string;
}