import { FieldExamsResponse } from "../fieldExams/fieldExamsResponse.interface";
import { QuestionResponse } from "../question/questionResponse.interface";

export interface ExamResponse {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    duration: number;
    createdAt: Date;
    fieldExams: FieldExamsResponse[];
    questions: QuestionResponse[];
}