import {Injectable} from "@angular/core";


@Injectable({providedIn:"root"})
export class SharedVariablesService{

  counter(count:number){
    return new Array(count);
  }

}
