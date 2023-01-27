import { Directive, ElementRef, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpgradeComponent } from '@angular/upgrade/static';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './home.component';

@Directive({ selector: 'pages-home' })
export class PagesHomeDirective extends UpgradeComponent {
  constructor(ref: ElementRef, inj: Injector) {
    super('pagesHome', ref, inj);
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [HomeComponent, PagesHomeDirective],
  exports: [HomeComponent, PagesHomeDirective],
})
export class HomeModule {}
