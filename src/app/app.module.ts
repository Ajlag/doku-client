import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { QuillModule } from 'ngx-quill';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ProjectCardComponent } from './components/project/project-card/project-card.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { ProjectEditorComponent } from './components/project/project-editor/project-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentViewComponent } from './components/project/document-view/document-view.component';
import { FormsModule } from '@angular/forms';
import { ProjectCreateComponent } from './components/project/project-create/project-create.component';
import { ClipboardModule } from 'ngx-clipboard';
import { DocumentComponent } from './components/project/document/document.component';
import { ProjectEditComponent } from './components/project/project-edit/project-edit.component';
import { ProjectUsersComponent } from './components/project/project-users/project-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProjectListComponent,
    ProjectCardComponent,
    ProjectDetailsComponent,
    ProjectEditorComponent,
    DocumentViewComponent,
    ProjectCreateComponent,
    DocumentComponent,
    ProjectEditComponent,
    ProjectUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    FormsModule,
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
