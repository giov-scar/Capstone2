export class Artist {
  public uid!: string;
  constructor(
    public displayName: string,
    public surname: string,
    public email: string,
    public password: string,
    public photoURL: string,
    public coverImg: string,
    public baCourse: string,
    public intro: string = '',
    public maCourse: string = '',
    public emailVerified: boolean = false,
  ) {}
}
