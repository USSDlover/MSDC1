import { Injectable } from '@angular/core';
import {AppConfig} from '../../config/app.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  protected apiServer = AppConfig.settings.apiServer.base + AppConfig.settings.apiServer.meta;

  constructor(private http: HttpClient, private router: Router) {
  }

  makeGetApiCall<T>(endPoint: string, queryParams?: HttpParams): Observable<T> {
    return this.http
      .get<T>(`${this.apiServer}/${endPoint}`, {params: queryParams})
      .pipe(catchError((err => this.handleError(err))));
  }

  makePostApiCall<T>(endPoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.apiServer}/${endPoint}`, body)
      .pipe(catchError((err => this.handleError(err))));
  }

  makePutApiCall<T>(endPoint: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.apiServer}/${endPoint}`, body)
      .pipe(catchError((err => this.handleError(err))));
  }

  makeDeleteApiCall<T>(endPoint: string, queryParams?: HttpParams): Observable<T> {
    return this.http
      .delete<T>(`${this.apiServer}/${endPoint}`, {params: queryParams})
      .pipe(catchError((err => this.handleError(err))));
  }

  private handleError(err): Observable<any> {
    // TODO: Implement refresh token logic here, maybe !
    console.log('Error occur while tried to make http request', err);
    if (err.status === 401) {
      localStorage.clear();
      this.router.navigateByUrl('/auth/login');
    }
    return of({ status: false, message: err.message });
  }
}
