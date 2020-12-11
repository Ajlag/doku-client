import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../../../models/Project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent implements OnInit {
  @Output() projectCreated: EventEmitter<Project> = new EventEmitter();
  modalForm: FormGroup;
  faSave = faSave;
  faCancel = faTimes;
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.modalForm = this.fb.group({
      name: [''],
      description: [''],
    });
  }

  get name() {
    return this.modalForm.get('name');
  }

  get description() {
    return this.modalForm.get('description');
  }

  createProject() {
    const newProj = new Project(this.name.value, this.description.value);
    this.projectService.createProject(newProj).subscribe(
      () => {
        this.projectCreated.emit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
