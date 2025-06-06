import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterPayload, User } from '../interfaces/user.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  register(payload: RegisterPayload): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}auth/register`, payload).pipe(
      catchError(this.handleError)
    );
  }

  login(payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}auth/login`, payload).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // Aquí podrías mapear distintos códigos de error a mensajes amigables
    let message = 'Ocurrió un error inesperado';
    if (err.error instanceof ErrorEvent) {
      // Error del cliente o de red
      message = `Error de red: ${err.error.message}`;
    } else {
      // Error devuelto por el servidor
      if (err.status === 400 && err.error?.message) {
        message = err.error.message;
      } else if (err.status === 409) {
        message = err.error?.message || 'Ya existe un usuario con esos datos';
      } else {
        message = err.error?.message || `Código de error: ${err.status}`;
      }
    }
    return throwError(() => new Error(message));
  }
}
