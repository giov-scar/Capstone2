import { Component, Input, OnInit } from '@angular/core';
import { IWork } from 'src/app/shared/work';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/services/user.service';
import { Artist } from 'src/app/classes/artist';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-edit-work-modal',
  templateUrl: './edit-work-modal.component.html',
  styleUrls: ['./edit-work-modal.component.scss']
})
export class EditWorkModalComponent implements OnInit {

  selectedCategories: string[] = [];

  constructor(private modalService:NgbModal, private userService: UserService, private fileUploadService: FileUploadService){}

  @Input() work!: IWork;
  @Input() currentArtist!: Artist

  pendingFiles: File[] = [];

  closeModal() {
    this.modalService.dismissAll();
  }

  removePhoto(index: number) {
    this.work.photo.splice(index, 1);
  }

  categories = ['Photography', 'Painting', 'Sculpture', 'Installation'];

  ngOnInit() {
    this.updateSelectedCategories()
  }


  private updateSelectedCategories() {
    if (this.work && this.work.category) {
      this.selectedCategories = [...this.work.category];
      console.log("Selected categories:", this.selectedCategories);
    } else {
      this.selectedCategories = [];
      console.log("No categories set for the work.");
    }
  }

  toggleCategory(category: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      if (!this.selectedCategories.includes(category)) {
        this.selectedCategories.push(category);
      }
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
    console.log("Selected categories after toggle:", this.selectedCategories);
  }

  onNewFilesSelected(event:any){
    const files = event.target.files as FileList

    if(files && files.length > 0){
      this.pendingFiles = Array.from(files)
    }
  }

  uploadFiles(){
    this.pendingFiles.forEach((file:File) => {
      this.fileUploadService.pushFileToStorage({file}, this.currentArtist)
      .then((downloadUrl) => {
        this.work.photo.push(downloadUrl)
        console.log('Nuova immagine aggiunta:', downloadUrl);
      })
      .catch((error) => {console.error("Errore nel caricamento del file:", error);
      })
      this.pendingFiles = []
    })
  }

  updateWork(){
    if(!this.work) return

    this.work.category = [...this.selectedCategories]

    this.userService.updateWork(this.work.id, this.work).subscribe(response =>{
      this.closeModal()
    }, error => {
      console.error('Errore durante l\'aggiornamento del lavoro',error);
    })
  }


}
