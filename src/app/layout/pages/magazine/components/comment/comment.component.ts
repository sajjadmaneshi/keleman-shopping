import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  commentForm!: FormGroup;
  formIsSubmitted=false;


  get text():FormControl{
    return this.commentForm.get('text') as FormControl
  }

  get name():FormControl{
    return this.commentForm.get('name') as FormControl
  }

  get email():FormControl{
    return this.commentForm.get('email') as FormControl
  }

  constructor() {
    this._initForm();
  }

  private _initForm(){
    this.commentForm=new FormGroup({
      text:new FormControl('',Validators.required),
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email])
    })
  }

  submit() {
    this.formIsSubmitted=true;
    if(this.commentForm.valid){

    }
  }
}
