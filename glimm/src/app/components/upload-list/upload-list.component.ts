import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { map } from 'rxjs';
import { FileUpload } from 'src/app/models/file-upload.model';
import { DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {
  fileUploads!: DocumentData[]

  constructor(private uploadService: FileUploadService){ }

  ngOnInit() {
   this.uploadService.getFiles().subscribe(fileUploads => {
    this.fileUploads = fileUploads;
  })
    // .pipe(
    //   map(changes =>
    //     // store the key
    //     changes.map(c => ({ key: c.snapshot.key, ...c.snapshot.val() }))
    //   )
    // ).subscribe(fileUploads => {
    //   this.fileUploads = fileUploads;
    // });
  }

}
