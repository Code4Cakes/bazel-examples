import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TreeSelectorComponent } from './tree-selector.component';

@NgModule({
  declarations: [TreeSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [TreeSelectorComponent],
})
export class TreeSelectorModule {}
