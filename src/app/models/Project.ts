import { User } from './User';
import { Document } from './Document';

export class Project {
  id?: number;
  name: string;
  description: string;
  users: User[];
  documents: Document[];

  constructor(name?: string, description?: string, id?: number) {
    this.name = name;
    this.description = description;
    this.id = id;
  }
}
