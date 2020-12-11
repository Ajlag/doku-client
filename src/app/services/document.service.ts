import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Document } from '../models/Document';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  baseUrl = 'http://localhost:8080/api/v1/projects';
  sharedDocUrl = 'http://localhost:8080/api/v1/documents';

  document: Document;
  documents: Document[];

  constructor(private http: HttpClient) {}

  createDocument(projectId, document: Document) {
    return this.http
      .post(`${this.baseUrl}/${projectId}/documents`, {
        title: document.title,
        content: document.content,
        orderNumber: document.orderNumber,
        status: document.status,
      })
      .pipe(
        map((res) => {
          return this.document;
        })
      );
  }

  updateDocument(projectId, document: Document) {
    return this.http
      .patch(`${this.baseUrl}/${projectId}/documents/${document.id}`, {
        title: document.title,
        content: document.content,
        uuid: document.uuid,
        orderNumber: document.orderNumber,
        status: document.status,
      })
      .pipe(
        map((res) => {
          console.log(res);
          return this.document;
        })
      );
  }

  modifyOrder(projectId, documentId, updatedOrder) {
    return this.http
      .patch(
        `${this.baseUrl}/${projectId}/documents/${documentId}/modifyOrder`,
        {
          orderNumber: updatedOrder,
        }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  modifyStatus(projectId, documentId, updatedStatus) {
    return this.http
      .patch(
        `${this.baseUrl}/${projectId}/documents/${documentId}/modifyStatus`,
        {
          status: updatedStatus,
        }
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  deleteDocument(projectId, document: Document) {
    return this.http
      .delete(`${this.baseUrl}/${projectId}/documents/${document.id}`)
      .pipe(
        map((res) => {
          return this.document;
        })
      );
  }

  getAll(projectId): Observable<Document[]> {
    return this.http.get(`${this.baseUrl}/${projectId}/documents`).pipe(
      map((res) => {
        this.documents = Object.values(res);
        return this.documents;
      })
    );
  }

  getByUUID(docId: string): Observable<Document> {
    return this.http.get(`${this.sharedDocUrl}/${docId}`).pipe(
      map((res) => {
        console.log(res);
        this.document = Object.assign(new Document(), res);
        return this.document;
      })
    );
  }
}
