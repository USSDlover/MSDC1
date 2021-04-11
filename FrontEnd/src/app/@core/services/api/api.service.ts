import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

import {StorageService} from '../storage/storage.service';
import {AppConfig} from '../../config/app.config';

@Injectable()
export class ApiService {
  protected apiServer = AppConfig.settings.apiServer.base + AppConfig.settings.apiServer.meta;

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: StorageService
  ) {
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

  private handleError(err): Observable<any> {
    console.log('Error occur while tried to make http request', err);
    if (err.status === 401) {
      // TODO: Implement refresh token logic here, maybe !
      this.storage.clear();
      this.router.navigateByUrl('/auth/login')
        .then();
    } else {
      throw new HttpErrorResponse(err);
    }

    return of({status: false, message: err.message});
  }
}
