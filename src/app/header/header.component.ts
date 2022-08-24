import { Component } from '@angular/core';
import { DataService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {

  constructor (private dataService : DataService, 
  private recipeService : RecipeService) { }

  onSave(){
    const recipes = this.recipeService.getRecipes();
    this.dataService.saveRecipes(recipes);
  }

  onFetch(){
    this.dataService.fetchRecipes().subscribe() ;      
  }
}
