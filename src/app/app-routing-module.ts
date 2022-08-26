import { Routes, RouterModule } from "@angular/router";
import { NgModule, Component } from "@angular/core";
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes : Routes = [
    { path : '', redirectTo: '/recipe', pathMatch:'full' },
    { path : 'recipe', canActivate : [AuthGuard],  component : RecipesComponent, children : [
        {path : 'new', component : RecipeEditComponent},
        {path : ':id/edit', component : RecipeEditComponent, resolve : [RecipesResolverService]}
    ] },
    { path : 'shopping-list', component : ShoppingListComponent},
    { path : 'auth', component : AuthComponent},
    { path : 'not-found', component : PageNotFoundComponent } ,
    { path : '**', redirectTo : '/not-found' } 

]

@NgModule({
    imports : [ RouterModule.forRoot(appRoutes)],
    exports : [RouterModule]
})
export class AppRoutingModule{
}