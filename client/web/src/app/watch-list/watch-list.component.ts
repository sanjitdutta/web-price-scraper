import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styles: []
})
export class WatchListComponent implements OnInit {
  
  @Input() watches : Array<Object>;
  @Output() onWatchDelete = new EventEmitter<any>();

  deleteWatch() {
    this.onWatchDelete.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
