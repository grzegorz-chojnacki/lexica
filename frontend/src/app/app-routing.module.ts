import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AccountViewComponent } from './components/account/account-view/account-view.component'
import { LocalWorkspaceComponent } from './components/local-workspace/local-workspace.component'
import { TeamViewComponent } from './components/team/team-view/team-view.component'
import { WorkspaceComponent } from './components/workspace/workspace.component'
import { TaskViewComponent } from './components/task/task-view/task-view.component'
import { SimpleCardsAddingComponent } from './components/task/simple-cards-adding/simple-cards-adding.component'
import { LoginComponent } from './login/login.component'
import { StartPageComponent } from './components/startPage/startPage.component'

const routes: Routes = [
  { path: 'team/:teamId',
    component: TeamViewComponent },
  { path: 'team/:teamId/new',
    component: SimpleCardsAddingComponent },
  { path: 'task/:taskId',
    component: TaskViewComponent },
  { path: 'team/:teamId/:view',
    component: TeamViewComponent }, // Tasks & Members
  { path: 'workspace',
    component: WorkspaceComponent },
    { path: 'startpage',
    component: StartPageComponent },
  { path: 'account',
    component: AccountViewComponent },
  { path: 'login',
    component: LoginComponent },
  { path: 'local',
    component: LocalWorkspaceComponent },
  // Will add main page later
  { path: '',   redirectTo: 'startpage', pathMatch: 'full' },
  // Will add error page later
  { path: '**', redirectTo: 'workspace' },
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
