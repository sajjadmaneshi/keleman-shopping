import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {Routing} from "../routing";
import {LayoutComponent} from "./layout.component";
import {MainComponent} from "./pages/main/main.component";


const routes:Routes=[
  {path:'',component:LayoutComponent,
  children:[
    {path:'',component:MainComponent},
    {path:Routing.basket,loadChildren:()=>import('./pages/basket/basket.module').then(m=>m.BasketModule)},
    {path:Routing.magazine,loadChildren:()=>import('./pages/magazine/magazine.module').then(m=>m.MagazineModule)},

  ]
  },

]
@NgModule({
imports:[RouterModule.forChild(routes)],

exports:[RouterModule]
})
export class LayoutRoutingModule { }
