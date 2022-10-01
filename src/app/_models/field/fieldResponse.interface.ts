import { FieldExamsResponse } from "../fieldExams/fieldExamsResponse.interface";

export interface FieldResponse {
    id: number;
    name: string;
    shortDescription: string;
    description: string;
    createdAt: Date;
    fieldExams: FieldExamsResponse[];
}