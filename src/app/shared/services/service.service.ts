import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { Service } from '../interfaces/service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private apiUrl = environment.apiUrl + 'Services/';

  constructor(private http: HttpClient) {}

  get(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl);
  }

  create(appointment: Service): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, appointment);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + id);
  }

  update(appointment: Service): Observable<Service> {
    return this.http.put<Service>(this.apiUrl + appointment.id, appointment);
  }
}
