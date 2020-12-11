import { Component, OnInit } from '@angular/core';
import {
  faCaretDown,
  faFilter,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import { User } from '../../../models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  faFilter = faFilter;
  faCaretDown = faCaretDown;
  faPlus = faPlus;

  searchCriteria: string = '';
  createModalActive: boolean = false;

  project: Project;
  projects: Project[];
  filteredProjects: Project[];

  users: User[];
  selectedUsers: User[] = [];

  constructor(
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.fetchProjects();
    this.fetchUsers();
  }

  contains(users: User[]): boolean {
    if (users.length == 0) {
      return false;
    }

    if (
      this.selectedUsers.filter((element) => {
        return users.some((e) => e.id == element.id);
      }).length == 0
    ) {
      return false;
    }

    return true;
  }

  findByNameAndDescription(projects: Project[]): Project[] {
    if (this.selectedUsers.length > 0)
      projects = projects.filter((project) => {
        return this.contains(project.users);
      });

    projects = projects.filter((project) => {
      return (
        project.name
          .toLocaleLowerCase()
          .match(this.searchCriteria.toLocaleLowerCase()) ||
        project.description
          .toLocaleLowerCase()
          .match(this.searchCriteria.toLocaleLowerCase())
      );
    });

    return projects;
  }

  projectSearch() {
    this.filteredProjects = this.findByNameAndDescription(this.projects);
  }

  filterByUsers(user: User) {
    if (this.selectedUsers.includes(user)) {
      this.selectedUsers = this.selectedUsers.filter((us) => us.id != user.id);
    } else {
      this.selectedUsers.push(user);
    }

    this.filteredProjects = this.findByNameAndDescription(this.projects);
  }

  createModalActiveHandler(active: boolean) {
    if (!active) {
      this.fetchProjects();
    }

    this.createModalActive = active;
  }

  fetchProjects() {
    this.projectService.getAll().subscribe(
      (res: Project[]) => {
        this.projects = res;
        this.filteredProjects = this.projects;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fetchUsers() {
    this.userService.getAll().subscribe(
      (res: User[]) => {
        this.users = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
