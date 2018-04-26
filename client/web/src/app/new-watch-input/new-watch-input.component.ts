import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { Observable } from 'rxjs';

import { WebsiteService } from '../website.service';
import { WatchService } from '../watch.service';

@Component({
  selector: 'app-new-watch-input',
  templateUrl: './new-watch-input.component.html',
  styles: []
})
export class NewWatchInputComponent implements OnInit {

  newWatchForm: FormGroup;
  
  constructor(
    fb: FormBuilder,
    private websiteService: WebsiteService,
    private _watchService: WatchService
  ) {
    this.watchService = _watchService;
    this.newWatchForm = fb.group({
      'title': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'url': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'website': ['', Validators.required],

      'email': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'price': ['', Validators.required]
    });
    
    this.websites = websiteService.get();
  }

  @Output() onWatchAdd = new EventEmitter<any>();
  public newWatch: any = {text: ''};
  private websites : Observable<Object>;
  private watchService : WatchService;

  onSubmit() {
    this.addWatch(this.newWatchForm.value);
  }
  
  addWatch(watch) {
    
    const transformedWatch = {
      title: watch.title,
      url: watch.url,
      website: watch.website,
      watchers: [{
        email: watch.email,
        targetPrice: watch.price
      }]
    };
    
    this.newWatchForm.disable();
    
    this.watchService.post(transformedWatch).subscribe(
      
      (watches: any) => {
        this.newWatchForm.enable();
        this.onWatchAdd.emit(transformedWatch);
        this.newWatchForm.reset();
      },
      
      (error: any) => {
        this.newWatchForm.enable();
        console.log('error: ' + JSON.stringify(error));
      }
      
    );
  }

  ngOnInit() {}

}
