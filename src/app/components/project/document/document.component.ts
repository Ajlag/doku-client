import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Document } from 'src/app/models/Document';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})
export class DocumentComponent implements OnInit {
  docId: string;
  document: Document;

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.docId = params.get('document');
    });

    this.fetchDocument();
  }

  fetchDocument() {
    this.documentService.getByUUID(this.docId).subscribe(
      (res: Document) => {
        this.document = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
