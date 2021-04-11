import {Injectable} from '@angular/core';
import {ApiService} from '@core/services';
import {ExamInterface, QuestionInterface} from '@data/interfaces';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class ExamService {
  constructor(private api: ApiService) {
  }

  getAll(): Observable<ExamInterface[]> {
    return this.api.makeGetApiCall<ExamInterface[]>('exam');
  }

  getExamQuestions(examId: string): Observable<QuestionInterface[]> {
    const params = new HttpParams()
      .append('id', examId);

    return this.api
      .makeGetApiCall<QuestionInterface[]>('exam/question', params);
  }
}
