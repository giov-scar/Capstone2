import { IWork } from '../shared/work';

export class Artist {
  public uid!: string;
  constructor(
    public artistname: string,
    public artistsurname: string,
    public email: string,
    public password: string,
    public profile_picture: string,
    public coverImg: string,
    public baCourse: string,
    public maCourse: string = '',
    public intro: string = '',
    public uploadedWork: IWork[] = [{
      title:'',
      description:'',
      photo: [''],
      category: [''],

    }],
    public emailVerified: boolean = false,
  ) {}
}
