import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements AfterViewInit {
  @ViewChild('progressContainer') progressContainer!: ElementRef;
  @ViewChild('step01') step01!: ElementRef;
  @ViewChild('step02') step02!: ElementRef;
  @ViewChild('step03') step03!: ElementRef;
  @ViewChild('lineProgress') lineProgress!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    // Aggiungi i gestori di eventi qui
    this.step01.nativeElement.addEventListener('click', () => this.stepClick(8, 'step1'));
    this.step02.nativeElement.addEventListener('click', () => this.stepClick(50, 'step2'));
    this.step03.nativeElement.addEventListener('click', () => this.stepClick(100, 'step3'));
  }

  stepClick(progress: number, stepClass: string) {
    // Imposta la larghezza della barra di avanzamento
    this.lineProgress.nativeElement.style.width = progress + '%';

    // Rimuovi la classe 'active' da tutti gli elementi 'step'
    const stepElements: NodeListOf<HTMLElement> = this.progressContainer.nativeElement.querySelectorAll('.step');
    stepElements.forEach((step: HTMLElement) => {
      step.classList.remove('active');
    });

    // Aggiungi la classe 'active' all'elemento corrente
    const currentStep: HTMLElement | null = this.progressContainer.nativeElement.querySelector('.' + stepClass);
    if (currentStep) {
      currentStep.classList.add('active');
    }
  }
}
