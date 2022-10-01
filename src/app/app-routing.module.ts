import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/authentication/login/login.component';
import { RegisterComponent } from './views/authentication/register/register.component';
import { NotFoundComponent } from './views/errors/not-found/not-found.component';
import { ServerErrorComponent } from './views/errors/server-error/server-error.component';
import { ExamCreationComponent } from './views/exam-creation/exam-creation.component';
import { ExamBeginComponent } from './views/exams-content/exam-begin/exam-begin.component';
import { ExamContentDetailsComponent } from './views/exams-content/exam-content-details/exam-content-details.component';
import { ExamResultComponent } from './views/exams-content/exam-result/exam-result.component';
import { ExamsContentComponent } from './views/exams-content/exams-content.component';
import { HomeComponent } from './views/home/home.component';
import { ExamDetailsComponent } from './views/manage/exams/exam-details/exam-details.component';
import { ExamsComponent } from './views/manage/exams/exams.component';
import { ModifyExamComponent } from './views/manage/exams/modify-exam/modify-exam.component';
import { FieldDetailsComponent } from './views/manage/fields/field-details/field-details.component';
import { FieldsComponent } from './views/manage/fields/fields.component';
import { ModifyFieldComponent } from './views/manage/fields/modify-field/modify-field.component';
import { ModifyOptionComponent } from './views/manage/options/modify-option/modify-option.component';
import { OptionDetailsComponent } from './views/manage/options/option-details/option-details.component';
import { OptionsComponent } from './views/manage/options/options.component';
import { ModifyQuestionComponent } from './views/manage/questions/modify-question/modify-question.component';
import { QuestionDetailsComponent } from './views/manage/questions/question-details/question-details.component';
import { QuestionsComponent } from './views/manage/questions/questions.component';
import { UserExamsComponent } from './views/manage/user-exams/user-exams.component';
import { ModifyUserComponent } from './views/manage/users/modify-user/modify-user.component';
import { UserDetailsComponent } from './views/manage/users/user-details/user-details.component';
import { UsersComponent } from './views/manage/users/users.component';
import { MyExamDetailsComponent } from './views/profile/my-exams/my-exam-details/my-exam-details.component';
import { ProfileComponent } from './views/profile/profile.component';
import { AdminRoutesGuard } from './_guards/admin-routes.guard';
import { AuthActivateRouteGuard } from './_guards/auth-activate-route.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { UnAuthActivateRouteGuard } from './_guards/un-auth-activate-route.guard';

const routes: Routes = [

  { path:"", component:HomeComponent },
  { path:"login", component:LoginComponent, canActivate: [UnAuthActivateRouteGuard] },
  { path:"register", component:RegisterComponent, canActivate: [UnAuthActivateRouteGuard] },
  
  { path: "manage", runGuardsAndResolvers: "always", canActivate: [AuthActivateRouteGuard, AdminRoutesGuard], children: [
    { path: "fields", runGuardsAndResolvers: "always", children: [
      { path:"", component:FieldsComponent },
      { path:"modify-field", component:ModifyFieldComponent },
      { path:":fieldId", component:FieldDetailsComponent },
    ]},
    { path: "exams", runGuardsAndResolvers: "always", children: [
      { path:"", component:ExamsComponent },
      { path:"modify-exam", component:ModifyExamComponent },
      { path:":examId", component:ExamDetailsComponent },
    ]},
    { path: "questions", runGuardsAndResolvers: "always", children: [
      { path:"", component:QuestionsComponent },
      { path:"modify-question", component:ModifyQuestionComponent },
      { path:":questionId", component:QuestionDetailsComponent },
    ]},
    { path: "options", runGuardsAndResolvers: "always", children: [
      { path:"", component:OptionsComponent },
      { path:"modify-option", component:ModifyOptionComponent },
      { path:":optionId", component:OptionDetailsComponent },
    ]},
    { path: "users", runGuardsAndResolvers: "always", children: [
      { path:"", component:UsersComponent },
      { path:"modify-user", component:ModifyUserComponent },
      { path:":userId", component:UserDetailsComponent },
    ]},
    { path: "user-exams", runGuardsAndResolvers: "always", children: [
      { path:"", component:UserExamsComponent }
    ]},
  ]},
  
  { path:"exam-creation", component:ExamCreationComponent, canActivate: [AuthActivateRouteGuard, AdminRoutesGuard] },
  
  { path: "exams-content", runGuardsAndResolvers: "always", canActivate: [AuthActivateRouteGuard], children: [
    { path:"", component:ExamsContentComponent },
    { path:"exam-details/:id", component:ExamContentDetailsComponent },
    { path:"exam-begin", component:ExamBeginComponent },
    { path:"exam-result", component:ExamResultComponent},
  ]},

  { path: "profile", runGuardsAndResolvers: "always", canActivate: [AuthActivateRouteGuard], children: [
    { path:"", component:ProfileComponent },
    { path:"my-exams/:id", component:MyExamDetailsComponent },
  ]},

  { path:"not-found", component:NotFoundComponent, canActivate: [AuthActivateRouteGuard, AdminRoutesGuard] },
  { path:"server-error", component:ServerErrorComponent, canActivate: [AuthActivateRouteGuard, AdminRoutesGuard] },

  { path: "**", component: HomeComponent, pathMatch: "full" }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }