import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  standalone: false
})
export class PageLayoutComponent  implements OnInit {
  @Input() title = '';

  constructor() { }

  ngOnInit() {}

}
