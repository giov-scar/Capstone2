import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { IWork } from 'src/app/shared/work';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  work: IWork | undefined

  constructor( private route: ActivatedRoute, private uploadService: FileUploadService){}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const workIndex = params.get('index');
      if (workIndex !== null) {
        this.work = this.uploadService.getWorkByIndex(parseInt(workIndex, 10));
      } else {
        // Prova a recuperare il lavoro dal localStorage
        this.work = this.uploadService.getCurrentWorkFromStorage();
      }

      if (!this.work) {
        console.log("Nessun lavoro trovato");
        // Gestire il caso in cui non ci sono lavori
      }
    });
  }


  }

