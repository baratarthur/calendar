import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiREsources } from '../shared/enums/api-resources';
import { CalendarResponse } from '../shared/models/calendar';

@Injectable({
  providedIn: 'root'
})
export class GridServiceService {

  constructor(private _http: HttpClient) {}

  getCalendar(): Observable<CalendarResponse> {
    const url = `${environment.api.baseUrl}/${apiREsources.getCalendar}`;
    const body = {
      url: "https://calendar.time.ly/6a37fb6n"
    };

    return this._http.post<CalendarResponse>(url, body);
  }

  getEvents(calendarId: number): Observable<any> {
    const url = `${environment.api.baseUrl}/${apiREsources.getEvents.replace('{id}', calendarId.toString())}`;

    return this._http.get(url);
  }
}
