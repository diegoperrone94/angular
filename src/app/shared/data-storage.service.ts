import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';



@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private http: HttpClient,
    private recipesService: RecipeService,
    private authService: AuthService) { }

  saveRecipes(recipes) {
    console.log(recipes);
    this.http
      .put('https://db-recipes-f3f7e-default-rtdb.firebaseio.com/recipes.json'
        , recipes).subscribe((data) => {
          console.log(data);
        })
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
         'https://db-recipes-f3f7e-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipesService.setRecipes(recipes);
        })
      );
  }

}
