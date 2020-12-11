export class User {
  firstName: string;
  lastName: string;
  id?: number;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
