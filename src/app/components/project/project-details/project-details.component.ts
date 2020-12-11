import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faCaretDown,
  faFilter,
  faPlus,
  faRedoAlt,
  faEdit,
  faShareAlt,
  faFileAlt,
  faUserEdit,
  faEye,
  faCaretUp,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Document } from 'src/app/models/Document';
import { Project } from 'src/app/models/Project';
import { DocumentService } from 'src/app/services/document.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
})
export class ProjectDetailsComponent implements OnInit {
  faFilter = faFilter;
  faCaretDown = faCaretDown;
  faPlus = faPlus;
  faRefresh = faRedoAlt;
  faShare = faShareAlt;
  faView = faEye;
  faEdit = faEdit;
  faFileAlt = faFileAlt;
  faUserEdit = faUserEdit;
  faUp = faCaretUp;
  faDown = faCaretDown;
  faTrash = faTrashAlt;

  @Output() projectDeleteds: EventEmitter<string> = new EventEmitter();

  successMsgVisible: boolean = false;
  sharedLink: string = 'http://localhost:4200/document/';

  projectId: number;
  project: Project;
  document: Document;
  documents: Document[];
  filteredDocuments: Document[];

  searchCriteria: string;

  editorShow: boolean = false;
  editActive: boolean = false;
  deleteActive: boolean = false;

  shownDocument: Document;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.projectId = parseInt(params.get('project'));
    });

    this.fetchProject();
  }

  refresh() {
    this.fetchDocuments();
  }

  documentSearch() {
    if (this.searchCriteria != '') {
      this.filteredDocuments = this.filteredDocuments.filter((res) => {
        return res.title
          .toLocaleLowerCase()
          .match(this.searchCriteria.toLocaleLowerCase());
      });
    } else if (this.searchCriteria == '') {
      this.filteredDocuments = this.documents;
    }
  }

  loadDocument(doc: Document) {
    this.shownDocument = doc;

    if (this.editorShow) {
      this.editorShow = false;
      this.editActive = false;
    }
  }

  createDocument() {
    this.editActive = false;
    this.editorShow = true;
  }

  editDocument() {
    this.editActive = true;
    this.editorShow = true;
  }

  documentCreatedHandler() {
    this.fetchDocuments();
    this.editActive = false;
    this.editorShow = false;
  }

  documentDeletedHandler() {
    this.shownDocument = null;
    this.fetchDocuments();
    this.editActive = false;
    this.editorShow = false;
  }

  documentClosedHandler() {
    this.fetchDocuments();
    this.editActive = false;
    this.editorShow = false;
  }

  fetchProject() {
    this.projectService.getProject(this.projectId).subscribe(
      (res: Project) => {
        this.project = res;
        this.fetchDocuments();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  fetchDocuments() {
    this.documentService.getAll(this.project.id).subscribe(
      (res: Document[]) => {
        if (res.length == 0) {
          this.documents = [];
        } else {
          this.documents = res.sort((a, b) => a.orderNumber - b.orderNumber);
        }
        this.filteredDocuments = res;

        if (this.shownDocument == null) {
          this.loadDocument(this.documents[0]);
        } else {
          var documents = this.documents;
          this.loadDocument(
            documents.filter((doc) => doc.id == this.shownDocument.id)[0]
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modifyOrder(document: Document, updatedOrder) {
    this.documentService
      .modifyOrder(this.projectId, document.id, updatedOrder)
      .subscribe(
        (res) => {
          this.fetchDocuments();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  changeStatus(event) {
    this.documentService
      .modifyStatus(this.projectId, this.shownDocument.id, event.target.value)
      .subscribe(
        (res) => {},
        (err) => {
          console.log(err);
        }
      );
  }

  deleteProject() {
    this.projectService.deleteProject(this.project).subscribe(
      (ress) => {
        this.router.navigateByUrl('');
      },
      (err) => {}
    );
  }

  showAlert(): void {
    if (this.successMsgVisible) {
      return;
    }

    this.successMsgVisible = true;
    setTimeout(() => (this.successMsgVisible = false), 2000);
  }

  closeAlert() {
    this.successMsgVisible = false;
  }
}
