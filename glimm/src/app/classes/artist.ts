import { IWork } from '../shared/work';

export class Artist {
  public uid!: string;
  public favorites: string[] = [];
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
      id:'',
      title:'',
      description:'',
      photo: [''],
      category: [''],
      author:'',
      createdAt: new Date
    }],
    public emailVerified: boolean = false,
  ) {}
}
