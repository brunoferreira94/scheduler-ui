import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Client } from '../interfaces/client';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = environment.apiUrl + 'Clients/';

  constructor(private http: HttpClient) {}

  get(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  create(appointment: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, appointment);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + id);
  }

  update(appointment: Client): Observable<Client> {
    return this.http.put<Client>(this.apiUrl + appointment.id, appointment);
  }
}
