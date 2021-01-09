import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AccountComponent } from './components/account/account.component'
import { LocalWorkspaceComponent } from './components/local-workspace/local-workspace.component'
import { TeamViewComponent } from './components/team/team-view/team-view.component'
import { WorkspaceComponent } from './components/workspace/workspace.component'
import { TaskViewComponent } from './components/task/task-view/task-view.component'
import { SimpleCardsAddingComponent } from './components/task/simple-cards-adding/simple-cards-adding.component'

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
