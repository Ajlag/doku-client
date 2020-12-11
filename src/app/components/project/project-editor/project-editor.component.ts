import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  faEye,
  faSave,
  faShareAlt,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { DocumentService } from 'src/app/services/document.service';
import { TransferParamsService } from 'src/app/services/transfer-params.service';
import { Document } from '../../../models/Document';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.css'],
})
export class ProjectEditorComponent implements OnInit {
  faTrash = faTrashAlt;
  faCancel = faTimes;
  faSave = faSave;

  editorForm: FormGroup;

  editorStyle = {
    height: '650px',
    backgroundColor: '#fff',
  };

  config = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      [{ align: ['', 'center', 'right', 'justify'] }],
    ],
  };

  @Input() projectId: number;
  @Input() document: Document;
  @Input() orderNumber: number;
  @Input() editActive: boolean;
  @Output() documentCreated: EventEmitter<Document> = new EventEmitter();
  @Output() documentClosed: EventEmitter<string> = new EventEmitter();
  @Output() documentDeleted: EventEmitter<string> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private transferService: TransferParamsService
  ) {}

  ngOnInit(): void {
    this.editorForm = this.fb.group({
      title: [''],
      editor: [''],
    });

    if (this.editActive) {
      this.title.setValue(this.document.title);
      this.editor.setValue(this.document.content);
    }
  }

  get title() {
    return this.editorForm.get('title');
  }

  get editor() {
    return this.editorForm.get('editor');
  }

  closeDocument() {
    this.documentClosed.emit();
  }

  saveEventHandler() {
    if (this.editActive) {
      this.editDocument();
    } else {
      this.createDocument();
    }
  }

  createDocument() {
    const newDoc = new Document(
      this.title.value,
      this.editor.value,
      this.orderNumber,
      null,
      null,
      'draft'
    );

    this.documentService.createDocument(this.projectId, newDoc).subscribe(
      () => {
        this.documentCreated.emit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editDocument() {
    const editedDoc = new Document(
      this.title.value,
      this.editor.value,
      this.document.orderNumber,
      this.document.uuid,
      this.document.id
    );

    this.documentService.updateDocument(this.projectId, editedDoc).subscribe(
      () => {},
      () => {}
    );
  }

  deleteDocument() {
    this.documentService
      .deleteDocument(this.projectId, this.document)
      .subscribe(
        () => {
          this.documentDeleted.emit();
        },
        () => {}
      );
  }
}
