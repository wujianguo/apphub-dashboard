import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './user/components/not-found/not-found.component';
import { UserComponent } from './user/components/user/user.component';

const routes: Routes = [
  {
    path: 'docs',
    loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule)
  }, {
    path: '**',
    pathMatch: 'full', 
    component: UserComponent,
    children: [
      {
        path: '',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
