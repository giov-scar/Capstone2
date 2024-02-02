import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Artist } from 'src/app/classes/artist';

@Component({
  selector: 'app-edit-intro-modal',
  templateUrl: './edit-intro-modal.component.html',
  styleUrls: ['./edit-intro-modal.component.scss']
})
export class EditIntroModalComponent {
  @Input() artistData!: Artist
  introText: string = '';
  constructor (public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.artistData && this.artistData.intro){
      this.introText = this.artistData.intro
    }
  }

  confirmUpdate(): void {
    this.activeModal.close(this.introText);
  }

}
