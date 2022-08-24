import { Component, OnInit, Output, OnDestroy, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription, Subject } from '../../../../node_modules/rxjs';
import Swal from 'sweetalert2'
import { DataService } from '../../shared/data-storage.service';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  error = null;
  recipes: Recipe[] = [];
  recipeSub = new Subscription;
  recipeSub1 = new Subscription;

  constructor(
    private recipeService: RecipeService,
    private dataService: DataService) { }

  ngOnInit() {
    this.recipeSub = this.recipeService.recipeAdded.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );

    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    this.recipeSub.unsubscribe();
    this.recipeSub1.unsubscribe();
  }



}
