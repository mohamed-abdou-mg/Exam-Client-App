import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { OptionList } from '../optionList.interface';
import { QuestionList } from '../questionList.interface';

@Component({
  selector: 'app-export-excel',
  templateUrl: './export-excel.component.html'
})

export class ExportExcelComponent implements OnInit {

  @Input() exportList: any[];
  @Input() btnValue: string;

  questionList: QuestionList[] = [];
  optionList: OptionList[] = [];

  constructor() {}

  ngOnInit(): void {
  }
  
  exportExcel() {
    console.log(this.exportList);
    this.exportList.some(element => {
      if(element.exam){
        this.questionList.push( { id: element.id ,questionName: element.questionName, questionDegree: element.degree,createdAt: element.createdAt, examId: element.examId, examName: element.exam.name, examShortDescription: element.exam.shortDescription, examDescription: element.exam.description});
      }
      if(element.question){
        this.optionList.push( { id: element.id ,optionName: element.optionName, isCorrect: element.isCorrect, createdAt: element.createdAt, questionId: element.questionId, questionName: element.question.questionName, questionDegree: element.question.degree, examId: element.question.examId, examName: element.question.exam.name, examShortDescription: element.question.exam.shortDescription, examDescription: element.question.exam.description});
      }
    });
    if(this.questionList.length > 0){
      this.excelConfig(this.questionList);
    }else if(this.optionList.length > 0){
      this.excelConfig(this.optionList)
    }else{
      this.excelConfig(this.exportList);
    }
  }

  excelConfig(list: any[]){
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(list);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "ExportExcel");
    });
  }
  
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}