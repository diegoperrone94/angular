import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { Subject } from '../../../node_modules/rxjs';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  public subj = new Subject<boolean>();

  selectedRecipe: Recipe;
  constructor() { }


  ngOnInit() {
  }
  
  onSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }

}
