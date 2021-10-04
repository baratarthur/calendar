import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../models/event';

const MONTHS_STRING = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_STRING = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() day: Date;
  @Input() events: Array<Event>;

  @Input() selected: boolean = false;

  constructor() {}

  ngOnInit() {}

  getMonthString(monthNumber: number): string {
    return MONTHS_STRING[monthNumber];
  }

  getDayString(dayNumber: number): string {
    return DAY_STRING[dayNumber];
  }

  // here is verified if the day contains the event
  is(event: Event, day: Date): boolean {
    return (day >= event.start_datetime && day <= event.end_datetime)
    || (
      // due to the fact that the days in the week data structure all days are set to 0 hours
      // in the last day of event every end_datetime hour is >= 0 so it does fit in the last day
      // so if we need the last day of event to fit in the calendar
      // we need to compare only the Date without the hour
      day.getFullYear() === event.end_datetime.getFullYear()
      && day.getMonth() === event.end_datetime.getMonth()
      && day.getDate() === event.end_datetime.getDate()
    );
  }

  getNumberOfEvents(day: Date): number {
    return this.events.filter(event => this.is(event, day)).length
  }

  onToggleSelected() {
    this.selected = !this.selected;
  }
}
