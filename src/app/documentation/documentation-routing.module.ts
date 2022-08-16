import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwaggerComponent } from './swagger/swagger.component';

const routes: Routes = [
  {
    path: 'api',
    component: SwaggerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }


export const routedComponents = [
  SwaggerComponent,
]
