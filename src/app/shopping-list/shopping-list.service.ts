import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {

    added_ing : Ingredient;
    elementAdded = new Subject<Ingredient[]>();
    ingredientSelected = new Subject<number>();

    //changeView = new EventEmitter<string>();

    ingredients :Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Tomato', 3),
      ];

    constructor(private router : Router){ }

    newIngredientAdded(element){
        const newEl = new Ingredient(element.name, element.amount);
        this.ingredients.push(newEl);
        this.elementAdded.next(this.ingredients);
    }

    addIngredientFromRecipe(_ingredients : Ingredient[] ){
        _ingredients.forEach(element => {
            this.ingredients.push(element);
        });
        this.elementAdded.next(this.ingredients);
       // this.changeView.emit('shopping-list');
       this.router.navigate(['/shopping-list']);
    }

    deleteIngredient(id:number){
        console.log(id);
        this.ingredients.splice(id,1);
        this.elementAdded.next(this.ingredients.slice());
    }

    updateIngredient(id:number, ingredient:Ingredient){
        this.ingredients[id].name = ingredient.name;
        this.ingredients[id].amount = ingredient.amount;
    }

    getIngredient(id : number){
        return this.ingredients[id];
    }

    getIngredients(){
        return this.ingredients.slice();
    }

    onSelectIngredient(id : number){
        this.ingredientSelected.next(id);
    }
    
}