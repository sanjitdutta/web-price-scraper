import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { Observable } from 'rxjs';

import { WebsiteService } from '../website.service';

@Component({
  selector: 'app-new-watch-input',
  templateUrl: './new-watch-input.component.html',
  styles: []
})
export class NewWatchInputComponent implements OnInit {

  newWatchForm: FormGroup;
  
  constructor(fb: FormBuilder, private websiteService: WebsiteService) {
    this.newWatchForm = fb.group({
      'title': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'url': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'website': ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });
    
    this.websites = websiteService.get();
  }

  @Output() onWatchAdd = new EventEmitter<string>();
  public newWatch: any = {text: ''};
  private websites : Observable<Object>;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === "Enter" && this.newWatchForm.valid) {
      this.addWatch(this.newWatchForm.controls['text'].value);
    }
  }
  
  addWatch(text) {
    this.onWatchAdd.emit(text);
    this.newWatchForm.controls['text'].setValue('');
  }

  ngOnInit() {}

}
