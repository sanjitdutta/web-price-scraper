import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watcher',
  templateUrl: './watcher.component.html',
  styles: []
})
export class WatcherComponent implements OnInit {

  @Input() watcher: Object;
  @Input() i: Number;

  constructor() { }

  ngOnInit() {
  }

}
