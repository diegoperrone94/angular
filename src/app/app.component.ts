import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private slService : ShoppingListService){}

  ngOnInit(){
/*     this.slService.changeView.subscribe(
      (view :string) => {
        this.loadedFeature = view;
      } )*/
    
  }
}

