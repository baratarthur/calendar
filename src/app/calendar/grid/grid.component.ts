import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { constants } from '../shared/enums/constants';
import { Event } from '../shared/models/event';
import { GridServiceService } from './grid-service.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  public week: Array<Date>;
  public years: Array<number>;
  public currentDay: Date;
  private startDay: Date = new Date();

  public calendar = this.service.getCalendar();
  public events: Array<any>;

  public pickDate = new FormControl('');

  constructor(private service: GridServiceService) {}

  ngOnInit() {
    this.currentDay = new Date();
    this.week = this.getWeekDays();

    // the get events search need to be made after getting calendar Id
    this.calendar.subscribe(calendar => {
      this.service.getEvents(calendar.data.id).subscribe(events => {        
        this.events = events.data.items.map(
          (item) => {
            const event = new Event();
            Object.assign(event, {
              ...item,
              start_datetime: new Date(item.start_datetime),
              end_datetime: new Date(item.end_datetime)
            });
            return event
          }
        );
      });
    });


    this.pickDate.valueChanges.subscribe(value => {
      // the formControl starts to return a value when the month and day are completed
      // but not when de year is completed, so it is needed to filter when year is not completed
      if(value && value[0]!== '0') {
        const dateChosen = new Date(value);
        // for some reason I don't know yet, this transformation reaturns a day before the day chosen
        // to make things right, it's added a day at the value
        this.currentDay = new Date(dateChosen.getTime() + constants.dayInMilli);
        this.startDay = new Date(this.currentDay.getTime());
        this.week = this.getWeekDays();
      }
    });
  }
  
  onGetNextWeek(): void {
    const nextWeekDay = this.currentDay.getTime() + (7*constants.dayInMilli);
    this.currentDay = new Date(nextWeekDay);
    this.startDay = new Date(this.currentDay.getTime());
    this.week = this.getWeekDays();
    this.clearDatePicker();
  }

  onGetPreviousWeek(): void {
    const previousWeekDay = this.currentDay.getTime() - (7*constants.dayInMilli);
    this.currentDay = new Date(previousWeekDay);
    this.startDay = new Date(this.currentDay.getTime());
    this.week = this.getWeekDays();
    this.clearDatePicker();
  }

  // here we found the first day of the week and them we advance using miliseconds
  // due to avoid mismatch using dates only
  getWeekDays(): Array<Date> {
    this.years = [];
    const weekStartDay = this.currentDay.getDate() - this.currentDay.getDay();
    const startDayInMili = this.startDay.setDate(weekStartDay);
    const week = [];
    
    for (let i=0;i<7;i++) {
      const day = new Date(startDayInMili+(i*constants.dayInMilli));
      week.push(day);
      // in case the week is between 2 years, we add both yaers into year array to display both
      if (!this.years.includes(day.getFullYear())) this.years.push(day.getFullYear());
    }
    
    return week;
  }

  // here the current day is based on the actual date without an hour
  isCurrentDay(day: Date): boolean {
    // the only days that's gonna get marked are today and the day at the date picker
    return (
      day.getDate() === new Date().getDate()
      && day.getMonth() === new Date().getMonth()
      && day.getFullYear() === new Date().getFullYear()
    ) || (
      this.pickDate.value && (
        day.getDate() === this.currentDay.getDate()
        && day.getMonth() === this.currentDay.getMonth()
        && day.getFullYear() === this.currentDay.getFullYear()
      )
    );
  }

  clearDatePicker(): void {
    this.pickDate.reset();
  }
}
