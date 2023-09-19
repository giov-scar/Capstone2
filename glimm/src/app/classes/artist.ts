export class Artist {
  public uid!: string;
  constructor(
    public name: string,
    public surname: string,
    public email: string,
    public password: string,
    public photoURL: string,
    public coverImg: string,
    public baCourse: string,
    public maCourse: string = '',
    public intro: string = '',
    public emailVerified: boolean = false,
  ) {}
}
