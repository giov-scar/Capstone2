import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Artist } from 'src/app/classes/artist';

@Component({
  selector: 'app-edit-cover-image-modal',
  templateUrl: './edit-cover-image-modal.component.html',
  styleUrls: ['./edit-cover-image-modal.component.scss']
})
export class EditCoverImageModalComponent {
  @Input() artistData!: Artist
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor (public activeModal: NgbActiveModal) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      // Crea un URL di anteprima per il file selezionato
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  upload(): void {
    // Questo metodo ora si limita a mostrare l'anteprima dell'immagine selezionata
    // L'upload effettivo verrà gestito dopo la conferma nel secondo modale
  }

  confirmUpdate():void{
    if (this.selectedFile){
      this.activeModal.close(this.selectedFile)
    } else {
      this.activeModal.dismiss('file not selected')
    }
  }
}
