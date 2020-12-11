import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { Document } from '../../../models/Document';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/Project';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.css'],
})
export class ProjectUsersComponent implements OnInit {
  @Input() project: Project;

  faPlus = faUserPlus;
  faUserMinus = faUserMinus;
  users: User[];

  constructor(
    private userService: UserService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
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

  fetchProject() {
    this.projectService.getProject(this.project.id).subscribe(
      (res: Project) => {
        this.project = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  userOnProject(user: User) {
    return this.project.users.some((element) => {
      return element.id == user.id;
    });
  }

  addUserToProject(userId) {
    this.projectService.addUser(this.project.id, userId).subscribe(
      (res) => {
        this.fetchProject();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  removeUserFromProject(userId) {
    this.projectService.removeUser(this.project.id, userId).subscribe(
      (res) => {
        this.fetchProject();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
