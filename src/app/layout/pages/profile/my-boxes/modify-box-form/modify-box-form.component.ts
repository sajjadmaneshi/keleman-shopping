import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'keleman-modify-box-form',
  templateUrl: './modify-box-form.component.html',
  styleUrls: ['./modify-box-form.component.scss']
})
export class ModifyBoxFormComponent {
  myBoxForm!: FormGroup;
  selectedProducts:any[]=[];
  selectedColor = 'success';
  colors:any[]=['danger','success','warning','info','gray-400','black','white'];

  products=[
    {
    id:1,
    title:'product1',
    thumbNail:'assets/media/temp/5.jpg',
      price:250000
  },
    {
      id:2,
      title:'product2',
      thumbNail:'assets/media/temp/6.jpg',
      price:250000
    },
    {
      id:3,
      title:'product1',
      thumbNail:'assets/media/temp/7.jpg',
      price:250000
    },
    {
      id:4,
      title:'product1',
      thumbNail:'assets/media/temp/5.jpg',
      price:250000
    },
    {
      id:5,
      title:'product1',
      thumbNail:'assets/media/temp/5.jpg',
      price:250000
    },

  ]


  public get title(): FormControl {
    return this.myBoxForm.get('title') as FormControl;
  }

  public get color(): FormControl {
    return this.myBoxForm.get('color') as FormControl;
  }

  constructor() {
    this._initForm()
  }

  private _initForm():void{
    this.myBoxForm=new FormGroup({
      title:new FormControl('',Validators.required),
      color: new FormControl('', Validators.required)
    })
  }

  moveToSelectedList(product:any){
    if(!this._isInList(product))
      this.selectedProducts.push({...product,count:1})

  }

  private _isInList(product:any):boolean{
    const index=this.selectedProducts.findIndex(selectedProducts=>selectedProducts.id===product.id);
    return index!==-1;
  }

  selectColor(
    color:
      'danger'
      | 'success'
      | 'warning'
      | 'info'
      | 'gray-400'
      | 'black'
      | 'white'
  ) {
    this.color.patchValue(color);
    this.selectedColor = color;
  }

  removeFromSelected($event: number) {
    const index=this.selectedProducts.findIndex(product=>product.id===$event);
    if(index!==-1){
      this.selectedProducts.splice(index,1);
    }
  }
}
