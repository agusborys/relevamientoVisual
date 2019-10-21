import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './paginas/login/login.module#LoginPageModule' },
  // { path: 'inicio', loadChildren: './paginas/inicio/inicio.module#InicioPageModule'},
  // { path: 'cosas-lindas', loadChildren: './paginas/cosas-lindas/cosas-lindas.module#CosasLindasPageModule' },
  // { path: 'cosas-feas', loadChildren: './paginas/cosas-feas/cosas-feas.module#CosasFeasPageModule' },
  { path: 'tabs', loadChildren: './paginas/tabs/tabs.module#TabsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
