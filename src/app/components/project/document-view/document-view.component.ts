import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  faEdit,
  faShareAlt,
  faFileAlt,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/models/Project';
import { Document } from '../../../models/Document';

@Component({
  selector: 'app-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css'],
})
export class DocumentViewComponent implements OnInit {
  @Input() document: Document;

  constructor() {}

  ngOnInit(): void {}
}
