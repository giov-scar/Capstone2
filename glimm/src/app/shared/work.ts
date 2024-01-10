export interface IWork {
  id:string;
  title: string;
  description: string;
  photo: string[];
  category: string[];
  author: string;
  createdAt: Date;
  profilePicture?: string;
  artistName?: string;
  artistSurname?: string;
  intro?: string;
}
