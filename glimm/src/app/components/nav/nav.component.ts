import { Component } from '@angular/core';
import { NgbCollapseModule,NgbDropdownModule, NgbNavModule, } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
	imports: [NgbCollapseModule, RouterLink, NgbDropdownModule, NgbNavModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isMenuCollapsed = true;

}
