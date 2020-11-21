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
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatCardModule } from '@angular/material/card'
import { MatMenuModule } from '@angular/material/menu'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTabsModule } from '@angular/material/tabs'
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
// import { MatFileUploadModule } from 'angular-material-fileupload'


import { WorkspaceComponent } from './components/workspace/workspace.component'
import { AccountComponent } from './components/account/account.component'
import { LocalWorkspaceComponent } from './components/local-workspace/local-workspace.component'

import { TeamComponent } from './components/team/team.component'
import { TeamCardComponent } from './components/team/team-card/team-card.component'
import { TeamContainerComponent } from './components/team/team-container/team-container.component'
import { TeamSummaryComponent } from './components/team/team-summary/team-summary.component'
import { NewTeamComponent } from './components/team/new-team-dialog/new-team.component'
import { TeamSearchPipe } from './pipes/team-search.pipe'

import { SidebarComponent } from './components/sidebar/sidebar.component'
import { FullNamePipe } from './pipes/full-name.pipe'
import { SimpleCardComponent } from './components/simple-card/simple-card.component'
import { TaskListItemComponent } from './components/task-list-item/task-list-item.component'
import { MemberListItemComponent } from './components/member-list-item/member-list-item.component'
import { TaskAddingComponent } from './components/task-adding/task-adding.component'
import { TaskSummaryComponent } from './components/task-summary/task-summary.component'
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component'

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
    FullNamePipe,
    SimpleCardComponent,
    TaskListItemComponent,
    MemberListItemComponent,
    TaskAddingComponent,
    TeamSearchPipe,
    NewTeamComponent,
    TaskSummaryComponent,
    TeamSummaryComponent,
    TaskDialogComponent,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
