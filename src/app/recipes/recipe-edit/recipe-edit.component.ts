import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeFound : Recipe;
  id : number;
  editMode = false;
  error = null;
  recipeForm : FormGroup;
  constructor(private route : ActivatedRoute,
    private recipeService : RecipeService, 
    private router : Router,
    private slService : ShoppingListService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params)=>{
        this.id = +params['id'] ; 
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )

  }

  private initForm(){
    let recipeName = '';
    let recipeDescription ='';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      this.recipeFound = this.recipeService.getRecipeById(this.id);
      recipeName = this.recipeFound.name;
      recipeDescription = this.recipeFound.description;
      recipeImagePath = this.recipeFound.imagePath;

      if(this.recipeFound['ingredients'])
        for(let ingredient of this.recipeFound.ingredients)
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount, [Validators.required,
              Validators.min(0)]),  
            })
          )
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'imagePath' : new FormControl(recipeImagePath),
      'ingredients' : recipeIngredients
    })

 
  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onSubmit(){
    const newRec = new Recipe(this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients)

    if( !this.editMode)
    {
      this.recipeService.addRecipe(newRec);
      this.recipeForm.reset(); 
    } else { 
      this.recipeService.updateRecipe(this.id, newRec);
    }
  
  }

  onAddIngredient(){
    const control = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, [Validators.required,
      Validators.min(0)])
    },[ 
      Validators.required
    ]);
    (<FormArray>this.recipeForm.get('ingredients')).push(control)
  }

  removeIngredient(idIngredient:number){
    this.recipeService.removeIngredient(this.id,idIngredient);
    this.initForm();
  }

  onCancel(){
    this.recipeForm.reset(); 
    this.router.navigate(['/recipe']);
  }

  addToShoppingList(){
    this.slService.addIngredientFromRecipe(this.recipeFound.ingredients);
  }

  deleteRecipe(){
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['/recipe']);
  }
}
