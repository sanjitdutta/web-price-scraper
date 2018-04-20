import { Component } from '@angular/core';
import { WatchService } from './watch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'app';
  
  public watches: Array<Object> = [
    {text: 'Watch 1'},
    {text: 'Watch 2'},
    {text: 'Watch 3'},
    {text: 'Watch 4'},
    {text: 'Watch 5'},
    {text: 'Watch 6'},
    {text: 'Watch 7'},
    {text: 'Watch 8'},
    {text: 'Watch 9'},
    {text: 'Watch 10'}
  ];
  
  addWatch(watchText: string) {
    this.watches.push({text: watchText});
  }
  
  constructor(private watchService: WatchService) {
    watchService.get().subscribe((watches: any) => this.watches = watches); // TODO: fix to parse watches
  }
}
