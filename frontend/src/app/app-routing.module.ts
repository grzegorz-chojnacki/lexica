import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AccountViewComponent } from './components/account/account-view/account-view.component'
import { TeamViewComponent } from './components/team/team-view/team-view.component'
import { WorkspaceComponent } from './components/workspace/workspace.component'
import { TaskViewComponent } from './components/task/task-view/task-view.component'
import { SimpleCardsAddingComponent } from './components/task/simple-cards-adding/simple-cards-adding.component'
import { StartViewComponent } from './components/start-view/start-view.component'
import { LoginComponent } from './components/login/login.component'
import { AuthorizationGuard } from './guards/authorization.guard'

const routes: Routes = [
  {
    path: 'team/:teamId',
    canActivate: [AuthorizationGuard],
    component: TeamViewComponent
  },
  {
    path: 'team/:teamId/task/new',
    canActivate: [AuthorizationGuard],
    component: SimpleCardsAddingComponent
  },
  {
    path: 'team/:teamId/task/:taskId/edit',
    canActivate: [AuthorizationGuard],
    component: SimpleCardsAddingComponent
  },
  {
    path: 'team/:teamId/task/:taskId',
    canActivate: [AuthorizationGuard],
    component: TaskViewComponent
  },
  {
    path: 'workspace',
    canActivate: [AuthorizationGuard],
    component: WorkspaceComponent
  },
  {
    path: 'account',
    canActivate: [AuthorizationGuard],
    component: AccountViewComponent
  },
  {
    path: 'start',
    component: StartViewComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  // Will add error page later
  { path: '**', redirectTo: 'start' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
