import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { IWork } from 'src/app/shared/work';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit{
  categoryWorks:IWork[] = []

  constructor(private fileService:FileUploadService){};

  ngOnInit(){
    const category = 'Installation';
    this.fileService.getWorksByCategory(category).subscribe(
      works => this.categoryWorks = works,
      error => console.log('Errore durante il recupero dei lavori',error)
    )

  }

}
