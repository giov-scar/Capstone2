import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  @ViewChild('progressContainer') progressContainer!: ElementRef;
  @ViewChild('step01') step01!: ElementRef;
  @ViewChild('step02') step02!: ElementRef;
  @ViewChild('step03') step03!: ElementRef;
  @ViewChild('lineProgress') lineProgress!: ElementRef;
  activeStep: string = 'step1';

  constructor() {}

  stepClick(stepClass: string) {
    this.activeStep = stepClass; // Aggiorna lo step attivo
    let progressWidth = '0%';
    switch (stepClass) {
      case 'step1':
        progressWidth = '10%';
        break;
      case 'step2':
        progressWidth = '50%';
        break;
      case 'step3':
        progressWidth = '100%';
        break;
    }
    this.lineProgress.nativeElement.style.width = progressWidth;
  }
}
