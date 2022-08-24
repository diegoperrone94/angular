import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  
  @Input() ingredients : Ingredient[];
  private subscription : Subscription;

  constructor(private shoppingService : ShoppingListService) { }
  
  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.elementAdded.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  } 
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSelect(id : number){
    this.shoppingService.onSelectIngredient(id);
  }
  
}
