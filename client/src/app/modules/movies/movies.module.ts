import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { MoviesComponent } from './movies.component';

@NgModule({
  declarations: [
    FormComponent,
    ListComponent,
    MoviesComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MoviesComponent
  ]
})
export class MoviesModule { }
