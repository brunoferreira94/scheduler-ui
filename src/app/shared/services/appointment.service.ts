import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../interfaces/appointment';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = environment.apiUrl + 'Appointments/';

  constructor(private http: HttpClient) {}

  get(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  create(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(this.apiUrl, appointment);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + id);
  }

  update(appointment: Appointment): Observable<Appointment> {
    return this.http.put<Appointment>(
      this.apiUrl + appointment.id,
      appointment
    );
  }
}
