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
    {url: 'Watch 1'},
    {url: 'Watch 2'},
    {url: 'Watch 3'},
    {url: 'Watch 4'}
  ];
  
  addWatch(watchText: string) {
    this.watches.push({url: watchText});
  }
  
  constructor(private watchService: WatchService) {
    watchService.get().subscribe((watches: any) => {
      this.watches = watches;
    });
  }
}
