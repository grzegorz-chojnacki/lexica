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
import { MatRadioModule } from '@angular/material/radio'
import { MatCheckboxModule } from '@angular/material/checkbox'

// Team
import { TeamViewComponent } from './components/team/team-view/team-view.component'
import { TeamCardComponent } from './components/team/team-card/team-card.component'
import { TeamContainerComponent } from './components/team/team-container/team-container.component'
import { NewTeamComponent } from './components/team/new-team-dialog/new-team.component'
import { TeamSearchPipe } from './pipes/team-search.pipe'

// Task
import { TaskListComponent } from './components/task/task-list/task-list.component'
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
import { HttpClientModule } from '@angular/common/http'
import { TeamProgressComponent } from './components/team/team-progress/team-progress.component'
import { TeamSettingsComponent } from './components/team/team-settings/team-settings.component'
import { StartViewComponent } from './components/start-view/start-view.component'
import { FullNameDialogComponent } from './components/account/full-name-dialog/full-name-dialog.component'
import { UsernameDialogComponent } from './components/account/username-dialog/username-dialog.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { PasswordDialogComponent } from './components/account/password-dialog/password-dialog.component'
import { SortMembersPipe } from './pipes/sort-members.pipe'
import { AvatarComponent } from './components/account/avatar/avatar.component'
import { ColorDialogComponent } from './components/account/color-dialog/color-dialog.component'
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component'
import { SimpleCardViewComponent } from './components/task/task-view/simple-card-view/simple-card-view.component'
import { SimpleCardEditorComponent } from './components/task/task-editor/simple-card-editor/simple-card-editor.component'
import { TaskEditorDispatchComponent } from './components/task/task-editor/task-editor-dispatch/task-editor-dispatch.component'
import { SimpleCardDialogComponent } from './components/task/task-editor/simple-card-dialog/simple-card-dialog.component'
import { TaskDirective, TaskViewDispatchComponent } from './components/task/task-view/task-view-dispatch/task-view-dispatch.component'
import { ChoiceTestDialogComponent } from './components/task/task-editor/choice-test-dialog/choice-test-dialog.component'
import { ChoiceTestEditorComponent } from './components/task/task-editor/choice-test-editor/choice-test-editor.component'
import { ChoiceTestViewComponent } from './components/task/task-view/choice-test-view/choice-test-view.component'
import { TeamFormComponent } from './components/team/team-form/team-form.component'
import { MultiTestViewComponent } from './components/task/task-view/multi-test-view/multi-test-view.component'
import { MultiTestEditorComponent } from './components/task/task-editor/multi-test-editor/multi-test-editor.component'
import { MultiTestDialogComponent } from './components/task/task-editor/multi-test-dialog/multi-test-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    WorkspaceComponent,
    AccountViewComponent,
    TeamViewComponent,
    TeamCardComponent,
    TeamContainerComponent,
    SidebarComponent,
    FullNamePipe,
    SimpleCardEditorComponent,
    TaskListComponent,
    MemberListComponent,
    TeamSearchPipe,
    NewTeamComponent,
    TaskSummaryComponent,
    TaskDialogComponent,
    TaskMenuComponent,
    TaskDetailsComponent,
    TaskViewDispatchComponent,
    TeamSettingsComponent,
    TeamProgressComponent,
    LoginComponent,
    RegisterComponent,
    StartViewComponent,
    FullNameDialogComponent,
    UsernameDialogComponent,
    PasswordDialogComponent,
    SortMembersPipe,
    AvatarComponent,
    ColorDialogComponent,
    ConfirmationDialogComponent,
    SimpleCardViewComponent,
    TaskDirective,
    TaskEditorDispatchComponent,
    SimpleCardDialogComponent,
    ChoiceTestDialogComponent,
    ChoiceTestEditorComponent,
    ChoiceTestViewComponent,
    TeamFormComponent,
    MultiTestViewComponent,
    MultiTestEditorComponent,
    MultiTestDialogComponent
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
    MatSlideToggleModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
