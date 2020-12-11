import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSave, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit {
  faSave = faSave;
  faCancel = faTimes;
  faTrash = faTrashAlt;

  @Input() project: Project;
  @Output() projectEdited: EventEmitter<Project> = new EventEmitter();
  @Output() projectDeleted: EventEmitter<string> = new EventEmitter();

  modalForm: FormGroup;
  deleteActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      name: [this.project.name],
      description: [this.project.description],
    });
  }

  get name() {
    return this.modalForm.get('name');
  }

  get description() {
    return this.modalForm.get('description');
  }

  deleteActiveHandler(active: boolean) {
    this.deleteActive = active;
  }

  editProject() {
    const editedProj = new Project(
      this.name.value,
      this.description.value,
      this.project.id
    );

    this.projectService.updateProject(editedProj).subscribe(
      () => {},
      () => {}
    );
  }

  deleteProject() {
    this.projectService.deleteProject(this.project).subscribe(
      () => {
        this.deleteActiveHandler(false);
        this.projectDeleted.emit();
      },
      () => {}
    );
  }
}
