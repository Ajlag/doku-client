import { Identifiers } from '@angular/compiler';

export class Document {
  title: string;
  content: string;
  uuid: string;
  orderNumber: number;
  id?: number;
  status: string;

  constructor(
    title?: string,
    content?: string,
    orderNumber?: number,
    uuid?: string,
    id?: number,
    status?: string
  ) {
    this.title = title;
    this.content = content;
    this.orderNumber = orderNumber;
    this.uuid = uuid;
    this.id = id;
    this.status = status;
  }
}
