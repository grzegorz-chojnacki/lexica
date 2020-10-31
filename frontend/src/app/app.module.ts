import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSliderModule } from '@angular/material/slider'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatCardModule } from '@angular/material/card'

import { WorkspaceComponent } from './components/workspace/workspace.component'
import { AccountComponent } from './components/account/account.component'
import { LocalWorkspaceComponent } from './components/local-workspace/local-workspace.component'
import { TeamComponent } from './components/team/team.component'
import { TeamCardComponent } from './components/team-card/team-card.component'
import { TeamContainerComponent } from './components/team-container/team-container.component';
import { SidebarComponent } from './sidebar/sidebar.component'

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    AccountComponent,
    LocalWorkspaceComponent,
    TeamComponent,
    TeamCardComponent,
    TeamContainerComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
