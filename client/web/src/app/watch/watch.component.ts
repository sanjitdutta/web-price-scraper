import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { WatchService } from '../watch.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styles: []
})
export class WatchComponent implements OnInit {

  @Input() watch: any;
  @Output() onWatchDelete = new EventEmitter<any>();
  private watchService : WatchService;

  constructor(private _watchService : WatchService) {
    this.watchService = _watchService;
  }

  onDelete() {
    this.watchService.delete(this.watch._id).subscribe(
      
      () => {
        this.onWatchDelete.emit();
      },
      
      (error : any) => {
        console.log('error: ' + JSON.stringify(error));
      }
      
    );
  }

  ngOnInit() {
  }

}
