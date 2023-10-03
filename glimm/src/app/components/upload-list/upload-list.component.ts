import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';
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

  }

}
