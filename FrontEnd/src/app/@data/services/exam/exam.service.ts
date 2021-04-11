import {Injectable} from '@angular/core';
import {ApiService} from '@core/services';
import {ExamInterface, QuestionInterface} from '../../interfaces';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {ExamCreateDto, ExamUpdateDto, QuestionCreateDto} from '../../dtos';

@Injectable()
export class ExamService {
  constructor(private api: ApiService) {
  }

  getAll(): Observable<ExamInterface[]> {
    return this.api.makeGetApiCall<ExamInterface[]>('exam');
  }

  createExam(createdExam: ExamCreateDto): Observable<ExamInterface> {
    return this.api.makePostApiCall<ExamInterface>('exam', createdExam);
  }

  updateExam(updatedExam: ExamUpdateDto): Observable<ExamInterface> {
    return this.api.makePutApiCall<ExamInterface>('exam', updatedExam);
  }

  getExamQuestions(examId: string): Observable<QuestionInterface[]> {
    const params = new HttpParams()
      .append('id', examId);

    return this.api
      .makeGetApiCall<QuestionInterface[]>('exam/question', params);
  }

  createQuestion(createdQuestion: QuestionCreateDto): Observable<QuestionInterface> {
    return this.api
      .makePostApiCall<QuestionInterface>('exam/question', createdQuestion);
  }
}
