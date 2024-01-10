import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { IWork } from 'src/app/shared/work';

@Component({
  selector: 'app-sculpture',
  templateUrl: './sculpture.component.html',
  styleUrls: ['./sculpture.component.scss']
})
export class SculptureComponent implements OnInit{

  categoryWorks:IWork[] = []

  constructor(private fileService:FileUploadService){};

  ngOnInit(){
    const category = 'Sculpture';
    this.fileService.getWorksByCategory(category).subscribe(
      works => this.categoryWorks = works,
      error => console.log('Errore durante il recupero dei lavori',error)
    )

  }

}
