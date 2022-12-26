import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MagazineComponent} from "./magazine.component";
import {ListComponent} from "./components/list/list.component";
import {ArticleComponent} from "./components/article/article.component";


export const routes:Routes=[
  {path:'',component:MagazineComponent,
  children:[
    {path:'',component:ListComponent},
    {path:':id',component:ArticleComponent},

  ]}
]
@NgModule({

  imports: [
RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class MagazineRoutingModule { }
