import {Component, EventEmitter, HostListener, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-watch-input',
  templateUrl: './new-watch-input.component.html',
  styles: []
})
export class NewWatchInputComponent implements OnInit {

  newWatchForm: FormGroup;
  
  constructor(fb: FormBuilder) {
    this.newWatchForm = fb.group({
      'text': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
    });
  }

  @Output() onWatchAdd = new EventEmitter<string>();
  public newWatch: any = {text: ''};

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

  ngOnInit() {
  }

}
