import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AccountComponent } from './components/account/account.component'
import { LocalWorkspaceComponent } from './components/local-workspace/local-workspace.component'
import { TeamViewComponent } from './components/team/team-view/team-view.component'
import { WorkspaceComponent } from './components/workspace/workspace.component'
import { SimpleCardComponent } from './components/task/simple-card/simple-card.component'
import { TaskViewComponent } from './components/task/task-view/task-view.component'

const routes: Routes = [
  { path: 'team/:teamId',
    component: TeamViewComponent },
  { path: 'task/:taskId',
    component: SimpleCardComponent }, // TaskViewComponent
  { path: 'team/:teamId/:view',
    component: TeamViewComponent }, // Tasks & Members
  { path: 'workspace',
    component: WorkspaceComponent },
  { path: 'account',
    component: AccountComponent },
  { path: 'local',
    component: LocalWorkspaceComponent },
  // Will add main page later
  { path: '',   redirectTo: 'workspace', pathMatch: 'full' },
  // Will add error page later
  { path: '**', redirectTo: 'workspace' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
