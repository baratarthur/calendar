import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarRoutingModule } from './calendar-routing.module';
import { GridComponent } from './grid/grid.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [GridComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CalendarModule { }
