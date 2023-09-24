import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
import { map } from 'rxjs';
import { FileUpload } from 'src/app/models/file-upload.model';
import { DocumentData } from '@angular/fire/firestore';
import { Artist } from 'src/app/classes/artist';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {
  fileUploads!: DocumentData[]

  User!:Artist

  constructor(private uploadService: FileUploadService, private auth:AuthService){ }

  ngOnInit() {

   this.auth.getUser().subscribe(user => {
        this.User = user
        this.uploadService.getFiles(this.User).subscribe(fileUploads => {
          this.fileUploads = fileUploads;
      })

      console.log(this.fileUploads);

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
