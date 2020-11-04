import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AccountComponent } from './components/account/account.component'
import { LocalWorkspaceComponent } from './components/local-workspace/local-workspace.component'
import { TeamComponent } from './components/team/team.component'
import { WorkspaceComponent } from './components/workspace/workspace.component'
import { SimpleCardComponent } from './components/simple-card/simple-card.component'

const routes: Routes = [
  { path: 'team',      component: TeamComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'account',   component: AccountComponent },
  { path: 'local',     component: LocalWorkspaceComponent },
  { path: 'simpleCard', component: SimpleCardComponent },
  // Will add main page later
  { path: '',          redirectTo: 'workspace', pathMatch: 'full' },
  // Will add error page later
  { path: '**',        redirectTo: 'workspace' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
