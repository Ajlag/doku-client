import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {
  @Input() project: Project;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToDocuments() {
    this.router.navigate([this.project.id, 'details']);
  }
}
