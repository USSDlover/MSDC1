import { Module } from '@nestjs/common';
import { DatabaseModule, ExamModule, RequesterModule } from './v1/modules';

const V1_Modules = [DatabaseModule, ExamModule, RequesterModule];

@Module({
  imports: [...V1_Modules],
})
export class AppModule {}
