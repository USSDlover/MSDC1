import {Injectable} from '@angular/core';
import {ApiService} from '@core/services';
import {ExamInterface} from '@data/interfaces';
import {Observable} from 'rxjs';

@Injectable()
export class ExamService {
  constructor(private api: ApiService) {
  }

  getAll(): Observable<ExamInterface[]> {
    return this.api.makeGetApiCall<ExamInterface[]>('exam');
  }
}
