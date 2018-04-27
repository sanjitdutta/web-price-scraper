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
    {
      title: 'Watch 1 Title',
      url: 'Watch 1 URL',
      websiteName: 'Allen Edmonds',
      websiteId: 0,
      watchers: [{
        email: 'Watch 1 Email',
        targetPrice: 'Watch 1 Price'
      }]
    },
    {
      title: 'Watch 2 Title',
      url: 'Watch 2 URL',
      websiteName: 'Allen Edmonds',
      websiteId: 0,
      watchers: [{
        email: 'Watch 2 Email',
        targetPrice: 'Watch 2 Price'
      }]
    }
  ];
  private watchService: WatchService;
  
  addWatch(transformedWatch: any) {
    this.watchService.get().subscribe((watches: any) => {
      this.watches = watches;
    });
  }
  
  deleteWatch() {
    this.watchService.get().subscribe((watches: any) => {
      this.watches = watches;
    });
  }
  
  constructor(private _watchService: WatchService) {
    this.watchService = _watchService;
    this.watchService.get().subscribe((watches: any) => {
      this.watches = watches;
    });
  }
}
