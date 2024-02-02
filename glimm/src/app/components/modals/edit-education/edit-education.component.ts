import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Artist } from 'src/app/classes/artist';

@Component({
  selector: 'app-edit-education',
  templateUrl: './edit-education.component.html',
  styleUrls: ['./edit-education.component.scss']
})
export class EditEducationComponent {
  @Input() artistData!: Artist
  baText:string = ''
  maText:string = ''
  constructor(public activeModal: NgbActiveModal){}

  ngOnInit(): void{
    if(this.artistData && this.artistData.baCourse && this.artistData.maCourse){
      this.baText = this.artistData.baCourse
      this.maText = this.artistData.maCourse
    }
  }

  confirmUpdate(): void {
    const result = {
      newBACourse: this.baText,
      newMACourse: this.maText
    }
    this.activeModal.close(result);
  }

}
