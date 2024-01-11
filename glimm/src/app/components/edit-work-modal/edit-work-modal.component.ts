import { Component, Input, SimpleChanges } from '@angular/core';
import { IWork } from 'src/app/shared/work';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-work-modal',
  templateUrl: './edit-work-modal.component.html',
  styleUrls: ['./edit-work-modal.component.scss']
})
export class EditWorkModalComponent {

  selectedCategories: string[] = [];

  constructor(private modalService:NgbModal){}

  @Input()
  work!: IWork;

  closeModal() {
    this.modalService.dismissAll();
  }

  removePhoto(index: number) {
    this.work.photo.splice(index, 1);
  }

  categories = ['Photography', 'Painting', 'Sculpture', 'Installation'];
  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called", changes);
    if (changes['work']) {
      this.updateSelectedCategories();
    }
  }


  private updateSelectedCategories() {
    this.selectedCategories = this.work ? this.work.category.slice() : [];
    console.log("Updating selected categories:", this.selectedCategories);
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


}
