import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { Subscription } from '../../../../node_modules/rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editMode = false;
  edit_item : Ingredient;
  edit_id : number;
  sub :  Subscription;
  shoppingListForm : FormGroup


  constructor(private shoppingService : ShoppingListService) { }

/*   onAdd(){
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value ,  this.amountInputRef.nativeElement.value);
    this.shoppingService.newIngredientAdded(newIngredient);
  } */

  ngOnInit(): void {
    this.shoppingListForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, [Validators.required, Validators.min(1)])
    })

    this.sub = this.shoppingService.ingredientSelected.subscribe((id : number)=>{
      this.edit_id = id;
      this.editMode = true;
      this.edit_item = this.shoppingService.getIngredient(id);
      this.shoppingListForm.setValue({
        'name' : this.edit_item.name,
        'amount' : this.edit_item.amount
      })
    })

  }

  onEdit(){
    const newIng = new Ingredient(this.shoppingListForm.value.name ,  
      this.shoppingListForm.value.amount);
    this.shoppingService.updateIngredient(this.edit_id,newIng);
    this.onClear();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  
  onAdd(){
    if(!this.editMode){
    const newIngredient = new Ingredient(this.shoppingListForm.value.name ,  
      this.shoppingListForm.value.amount);
      this.shoppingService.newIngredientAdded(newIngredient);
    } else this.onEdit();
  }

  onDelete(){
    this.shoppingService.deleteIngredient(this.edit_id);
    this.onClear();
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
