import { AppUserResponse } from "../appUser/appUserResponse.interface";
import { ExamResponse } from "../exam/examResponse.interface";

export interface UserExamsResponse{
    id: number;
    userId: number;
    examId: number;
    exam: ExamResponse;
    appUser: AppUserResponse;
    createdAt: string;
}