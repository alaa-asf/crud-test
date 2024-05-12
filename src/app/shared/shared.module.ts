import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatButtonModule} from '@angular/material/button';

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatButtonModule
   ],
   providers: [],
   exports: [
      FormsModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatButtonModule
   ],
})
export class SharedModule { }
