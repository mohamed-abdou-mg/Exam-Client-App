import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { LoginComponent } from './views/authentication/login/login.component';
import { RegisterComponent } from './views/authentication/register/register.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { NavbarComponent } from './views/layout/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtAuthTokenInterceptor } from './_interceptors/jwt-auth-token.interceptor';
import { FieldsComponent } from './views/manage/fields/fields.component';
import { FieldDetailsComponent } from './views/manage/fields/field-details/field-details.component';
import { ModifyFieldComponent } from './views/manage/fields/modify-field/modify-field.component';
import { ExamsComponent } from './views/manage/exams/exams.component';
import { ExamDetailsComponent } from './views/manage/exams/exam-details/exam-details.component';
import { ModifyExamComponent } from './views/manage/exams/modify-exam/modify-exam.component';
import { QuestionsComponent } from './views/manage/questions/questions.component';
import { QuestionDetailsComponent } from './views/manage/questions/question-details/question-details.component';
import { ModifyQuestionComponent } from './views/manage/questions/modify-question/modify-question.component';
import { OptionsComponent } from './views/manage/options/options.component';
import { OptionDetailsComponent } from './views/manage/options/option-details/option-details.component';
import { ModifyOptionComponent } from './views/manage/options/modify-option/modify-option.component';
import { NoContentComponent } from './views/layout/no-content/no-content.component';
import { ExamCreationComponent } from './views/exam-creation/exam-creation.component';
import { SpinnerLoaderInterceptor } from './_interceptors/spinner-loader.interceptor';
import { MyExamsComponent } from './views/profile/my-exams/my-exams.component';
import { ExamsContentComponent } from './views/exams-content/exams-content.component';
import { ExamBeginComponent } from './views/exams-content/exam-begin/exam-begin.component';
import { ExamResultComponent } from './views/exams-content/exam-result/exam-result.component';
import { ExamContentDetailsComponent } from './views/exams-content/exam-content-details/exam-content-details.component';
import { MyExamDetailsComponent } from './views/profile/my-exams/my-exam-details/my-exam-details.component';
import { HomeComponent } from './views/home/home.component';
import { ProfileComponent } from './views/profile/profile.component';
import { SharedModule } from './_modules/shared/shared.module';
import { JwtModule } from "@auth0/angular-jwt";
import { ErrorHandlerInterceptor } from './_interceptors/error-handler.interceptor';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { ServerErrorComponent } from './views/errors/server-error/server-error.component';
import { ExportExcelComponent } from './views/layout/excel-sheets/export-excel/export-excel.component';
import { ImportExcelComponent } from './views/layout/excel-sheets/import-excel/import-excel.component';
import { InfoDetailsComponent } from './views/profile/info-details/info-details.component';
import { UsersComponent } from './views/manage/users/users.component';
import { UserDetailsComponent } from './views/manage/users/user-details/user-details.component';
import { ModifyUserComponent } from './views/manage/users/modify-user/modify-user.component';
import { UserExamsComponent } from './views/manage/user-exams/user-exams.component';

export function tokenGetter() {
  return localStorage.getItem("authUser");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    FieldsComponent,
    FieldDetailsComponent,
    ModifyFieldComponent,
    ExamsComponent,
    ExamDetailsComponent,
    ModifyExamComponent,
    QuestionsComponent,
    QuestionDetailsComponent,
    ModifyQuestionComponent,
    OptionsComponent,
    OptionDetailsComponent,
    ModifyOptionComponent,
    NoContentComponent,
    ExamCreationComponent,
    ExamsContentComponent,
    ExamBeginComponent,
    ExamResultComponent,
    ExamContentDetailsComponent,
    MyExamsComponent,
    MyExamDetailsComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ExportExcelComponent,
    ImportExcelComponent,
    InfoDetailsComponent,
    UsersComponent,
    UserDetailsComponent,
    ModifyUserComponent,
    UserExamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200"],
        disallowedRoutes: [],
      },
    }),
    DataTablesModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtAuthTokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerLoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
