import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Project } from '../models/Project';
import { Document } from '../models/Document';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  baseUrl = 'http://localhost:8080/api/v1/projects';

  project: Project;
  projects: Project[];

  constructor(private http: HttpClient) {}

  createProject(project: Project) {
    return this.http
      .post(`${this.baseUrl}`, {
        name: project.name,
        description: project.description,
      })
      .pipe(
        map((res) => {
          return this.project;
        })
      );
  }

  updateProject(project: Project) {
    return this.http
      .put(`${this.baseUrl}/${project.id}`, {
        name: project.name,
        description: project.description,
      })
      .pipe(
        map((res) => {
          return this.project;
        })
      );
  }

  getAll(): Observable<Project[]> {
    return this.http.get(`${this.baseUrl}`).pipe(
      map((res) => {
        this.projects = Object.values(res);
        return this.projects;
      })
    );
  }

  getProject(projectId: number): Observable<Project> {
    return this.http.get(`${this.baseUrl}/${projectId}`).pipe(
      map((res) => {
        this.project = Object.assign(new Project(), res);
        return this.project;
      })
    );
  }

  deleteProject(project: Project) {
    return this.http.delete(`${this.baseUrl}/${project.id}`).pipe(
      map((res) => {
        return this.project;
      })
    );
  }

  addUser(projectId, userId) {
    return this.http
      .put(`${this.baseUrl}/${projectId}/users/${userId}`, {})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  removeUser(projectId, userId) {
    return this.http
      .delete(`${this.baseUrl}/${projectId}/users/${userId}`, {})
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
