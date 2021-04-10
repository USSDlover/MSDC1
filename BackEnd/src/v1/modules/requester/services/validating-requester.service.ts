import { Injectable } from '@nestjs/common';
import { Requester } from '../schemas/requester.schema';

@Injectable()
export class ValidatingRequesterService {
  alreadyTested(requester: Requester): boolean {
    return requester.score === 0 || requester.score > 0 || requester.startedAt;
  }
}
