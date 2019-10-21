import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
      { path: 'inicio', loadChildren: '../inicio/inicio.module#InicioPageModule'},
      { path: 'cosas-lindas', loadChildren: '../cosas-lindas/cosas-lindas.module#CosasLindasPageModule' },
      { path: 'cosas-feas', loadChildren: '../cosas-feas/cosas-feas.module#CosasFeasPageModule' },
    ],
    
  },
  {
    path:'',
    redirectTo: 'tabs/inicio',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}