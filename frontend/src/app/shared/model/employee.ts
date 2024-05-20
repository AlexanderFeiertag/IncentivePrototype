export class Employee {

  public email: string;
  public address: string;
  public administrator: boolean | undefined;
  public manager: string | undefined;
  public balance: number | undefined;
  public clean: boolean | undefined;

  constructor(email: string, address: string) {
    this.email = email;
    this.address = address;
  }
}
