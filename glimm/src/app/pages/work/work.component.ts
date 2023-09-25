import { Component } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent {

  work!: object

  ngOnInit(){
  const storedWorkData = localStorage.getItem('workData');
  if (storedWorkData) {
    this.work = JSON.parse(storedWorkData);
  } else {
    // Gestisci il caso in cui 'workData' sia null, ad esempio assegnando un valore predefinito o effettuando altre azioni necessarie.
  }
}

  }

