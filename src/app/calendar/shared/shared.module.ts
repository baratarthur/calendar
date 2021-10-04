import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventListComponent } from './components/event-list/event-list.component';



@NgModule({
  declarations: [EventCardComponent, EventListComponent],
  exports: [EventCardComponent, EventListComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
