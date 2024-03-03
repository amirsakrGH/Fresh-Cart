import { Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank-layout.component.html',
  styleUrls: ['./blank-layout.component.scss']
})
export class BlankLayoutComponent {
  constructor() {}

  goToUP(): void {
    window.scrollTo(0, 0);
  }

  flag:boolean = false

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
  const scrollHeight = window.scrollY;
  if (scrollHeight > 300) {
    this.flag = true ;
  } else {
    this.flag = false;
  }
}
}
