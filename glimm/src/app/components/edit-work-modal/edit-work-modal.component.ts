import { Component, Input, OnInit } from '@angular/core';
import { IWork } from 'src/app/shared/work';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-work-modal',
  templateUrl: './edit-work-modal.component.html',
  styleUrls: ['./edit-work-modal.component.scss']
})
export class EditWorkModalComponent implements OnInit {

  selectedCategories: string[] = [];

  constructor(private modalService:NgbModal, private userService: UserService){}

  @Input()
  work!: IWork;

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
