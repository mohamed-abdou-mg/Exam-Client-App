import { OptionResponse } from "../option/optionResponse.interface";
import { QuestionResponse } from "../question/questionResponse.interface";

export interface ExamImplementationView{
    examId: number;
    question: QuestionResponse;
    options: OptionResponse[];
    optionSelected: OptionResponse;
}