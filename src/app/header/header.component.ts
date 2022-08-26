import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  user_navigate = false;
  private auth_subs = new Subscription;


  constructor(private dataService: DataService,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  ngOnInit() {
    this.auth_subs = this.authService.user.subscribe((resUser) => { 
      this.user_navigate = !resUser ? false: true;
    });
  }

  logOut(){
    this.authService.logOut();
  }

  onSave() {
    const recipes = this.recipeService.getRecipes();
    this.dataService.saveRecipes(recipes);
  }

  onFetch() {
    this.dataService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.auth_subs.unsubscribe();
  }
}
