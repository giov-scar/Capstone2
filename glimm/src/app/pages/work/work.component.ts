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
      const workId = params.get('id');
      if (workId) {
        this.uploadService.getWorkById(workId).subscribe(work => {
          this.work = work;
        });
      }
    });
  }



  }

