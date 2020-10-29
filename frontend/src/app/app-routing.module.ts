import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AccountComponent } from './components/account/account.component'
import { LocalComponent } from './components/local/local.component'
import { TeamComponent } from './components/team/team.component'
import { WorkspaceComponent } from './components/workspace/workspace.component'

const routes: Routes = [
  { path: 'team',      component: TeamComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'account',   component: AccountComponent },
  { path: 'local',     component: LocalComponent },
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
