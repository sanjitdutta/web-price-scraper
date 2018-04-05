import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styles: []
})
export class WatchListComponent implements OnInit {
  
  @Input() watches: Array<Object>;

  constructor() { }

  ngOnInit() {
  }

}
