import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ProjectDetailsComponent } from './components/project/project-details/project-details.component';
import { DocumentComponent } from './components/project/document/document.component';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { path: ':project/details', component: ProjectDetailsComponent },
  { path: 'document/:document', component: DocumentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
