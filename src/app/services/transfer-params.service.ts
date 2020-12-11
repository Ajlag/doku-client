import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransferParamsService {
  constructor() {}

  setProjectId(value: number) {
    localStorage.setItem('projectId', value.toString());
  }

  getProjectId() {
    return localStorage.getItem('projectId');
  }
}
