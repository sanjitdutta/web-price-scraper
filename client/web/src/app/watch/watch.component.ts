import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styles: []
})
export class WatchComponent implements OnInit {

  @Input() watch: Object;

  constructor() { }

  ngOnInit() {
  }

}
