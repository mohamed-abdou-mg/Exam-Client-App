import { ExamResponse } from "../exam/examResponse.interface";
import { OptionResponse } from "../option/optionResponse.interface";
import { QuestionResponse } from "../question/questionResponse.interface";

export interface ExamImplementation{
    examDetails: ExamResponse;
    question: QuestionResponse;
    options: OptionResponse[];
    optionSelected: OptionResponse;
}