import { ExamResponse } from "../exam/examResponse.interface";
import { FieldResponse } from "../field/fieldResponse.interface";

export interface FieldExamsResponse {
    id: number;
    fieldId: number;
    field: FieldResponse;
    examId: number;
    exam: ExamResponse;
}