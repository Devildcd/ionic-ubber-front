import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

   private get userId(): string {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u)._id : '';
  }

  getProfile(): Observable<{ data: any }> {
    return this.http.get<{ data: any }>(
      `${this.baseUrl}/users/${this.userId}`
    );
  }

  updateProfile(payload: { name: string; email?: string }): Observable<{ data: any }> {
    return this.http.put<{ data: any }>(
      `${this.baseUrl}/users/${this.userId}`,
      payload
    );
  }
}
