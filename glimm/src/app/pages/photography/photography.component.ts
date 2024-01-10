import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { IWork } from 'src/app/shared/work';

@Component({
  selector: 'app-photography',
  templateUrl: './photography.component.html',
  styleUrls: ['./photography.component.scss']
})
export class PhotographyComponent implements OnInit {

  categoryWorks:IWork[] = []

  constructor(private fileService:FileUploadService){};

  ngOnInit(){
    const category = 'Photography';
    this.fileService.getWorksByCategory(category).subscribe(
      works => this.categoryWorks = works,
      error => console.log('Errore durante il recupero dei lavori',error)
    )

  }

}
