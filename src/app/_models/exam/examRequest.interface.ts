import { FieldExamsResponse } from "../fieldExams/fieldExamsResponse.interface";

export interface ExamRequest {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    duration: number;
    fieldExams: FieldExamsResponse[];
}