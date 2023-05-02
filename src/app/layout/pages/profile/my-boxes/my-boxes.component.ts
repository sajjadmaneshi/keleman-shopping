import { Component } from '@angular/core';


@Component({
  selector: 'keleman-my-boxes',
  templateUrl: './my-boxes.component.html',
  styleUrls: ['./my-boxes.component.scss']
})
export class MyBoxesComponent {

  boxes:any[]=[
    {
      id:1,
      text:'باکس 1',
      color:'success',
      totalPrice:2500000,
      products:[
        {id:1,
          name:'',
          thumbNail:'assets/media/temp/5.jpg'},
        {id:2,
          name:'',
          thumbNail:'assets/media/temp/6.jpg'},
        {id:3,
          name:'',
          thumbNail:'assets/media/temp/7.jpg'},
      ]
    },
    {
      id:2,
      text:'باکس 2',
      color:'warning',
      totalPrice:2500000,
      products:[
        {id:1,
          name:'',
          thumbNail:'assets/media/temp/5.jpg'},
        {id:2,
          name:'',
          thumbNail:'assets/media/temp/6.jpg'},
        {id:3,
          name:'',
          thumbNail:'assets/media/temp/7.jpg'},
      ]
    },
    {
      id:3,
      text:'باکس 3',
      color:'danger',
      totalPrice:3500000,
      products:[
        {id:1,
          name:'',
          thumbNail:'assets/media/temp/5.jpg'},
        {id:2,
          name:'',
          thumbNail:'assets/media/temp/6.jpg'},
        {id:3,
          name:'',
          thumbNail:'assets/media/temp/7.jpg'},
      ]
    },
  ]






}
