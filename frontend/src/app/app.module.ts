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
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

// Team
import { TeamViewComponent } from './components/team/team-view/team-view.component'
import { TeamCardComponent } from './components/team/team-card/team-card.component'
import { TeamContainerComponent } from './components/team/team-container/team-container.component'
import { NewTeamComponent } from './components/team/new-team-dialog/new-team.component'
import { TeamSearchPipe } from './pipes/team-search.pipe'

// Task
import { TaskViewComponent } from './components/task/task-view/task-view.component'
import { TaskListComponent } from './components/task/task-list/task-list.component'
import { TaskAddingComponent } from './components/task/task-adding/task-adding.component'
import { TaskSummaryComponent } from './components/task/task-summary/task-summary.component'
import { TaskDialogComponent } from './components/task/task-dialog/task-dialog.component'
import { TaskMenuComponent } from './components/task/task-menu/task-menu.component'
import { TaskDetailsComponent } from './components/task/task-details/task-details.component'
// Other
import { MemberListComponent } from './components/member-list/member-list.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { FullNamePipe } from './pipes/full-name.pipe'
import { WorkspaceComponent } from './components/workspace/workspace.component'
import { AccountViewComponent } from './components/account/account-view/account-view.component'
import { LocalWorkspaceComponent } from './components/local-workspace/local-workspace.component'
import { HttpClientModule } from '@angular/common/http'
import { SimpleCardsAddingComponent } from './components/task/simple-cards-adding/simple-cards-adding.component'
import { TeamProgressComponent } from './components/team/team-progress/team-progress.component'
import { SimpleCardAddingComponent } from './components/task/simple-card-adding/simple-card-adding.component'
import { TeamSettingsComponent } from './components/team/team-settings/team-settings.component'
import { LoginComponent } from './login/login.component'
import { StartViewComponent } from './components/start-view/start-view.component'
import { FullNameDialogComponent } from './components/account/full-name-dialog/full-name-dialog.component'
import { EmailDialogComponent } from './components/account/email-dialog/email-dialog.component'
import { PasswordDialogComponent } from './components/account/password-dialog/password-dialog.component';
import { SortMembersPipe } from './pipes/sort-members.pipe'

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    AccountViewComponent,
    LocalWorkspaceComponent,
    TeamViewComponent,
    TeamCardComponent,
    TeamContainerComponent,
    SidebarComponent,
    FullNamePipe,
    SimpleCardsAddingComponent,
    SimpleCardAddingComponent,
    TaskListComponent,
    MemberListComponent,
    TaskAddingComponent,
    TeamSearchPipe,
    NewTeamComponent,
    TaskSummaryComponent,
    TaskDialogComponent,
    TaskMenuComponent,
    TaskDetailsComponent,
    TaskViewComponent,
    TeamSettingsComponent,
    TeamProgressComponent,
    LoginComponent,
    StartViewComponent,
    FullNameDialogComponent,
    EmailDialogComponent,
    PasswordDialogComponent,
    SortMembersPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
