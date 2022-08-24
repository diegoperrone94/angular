import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'node_modules/rxjs';


export class RecipeService {

    recipeAdded = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
    /*  new Recipe(
       'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
       '',
       [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
     ),
     new Recipe(
       'Big Fat Burger',
       'What else you need to say?',
       '',
       [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
     ) */
   ];


  getRecipes() {
    return this.recipes.slice();
  }
  
  setRecipes(recipes : Recipe []){
    this.recipes = recipes;
    this.recipeAdded.next(this.recipes.slice());
    }

  getRecipeById(id:number){
      return this.recipes[id];
  }

  addRecipe(recipe : Recipe){
    const newRecipe = new Recipe(recipe.name, recipe.description, 
    recipe.imagePath, recipe.ingredients);
    this.recipes.push(newRecipe);
    this.recipeAdded.next(this.getRecipes());
  }

  removeIngredient(idRecipe:number, idIngredient:number){
    (this.recipes[idRecipe].ingredients).splice(idIngredient,1);
  }

  updateRecipe(idRecipe:number, recipe : Recipe){
    this.recipes[idRecipe].name = recipe.name;
    this.recipes[idRecipe].description = recipe.description;
    this.recipes[idRecipe].imagePath = recipe.imagePath;
    this.recipes[idRecipe].ingredients = recipe.ingredients;
  }

  removeRecipe(id : number){
    this.recipes.splice(id,1);
    this.recipeAdded.next(this.recipes.slice());
  }

}