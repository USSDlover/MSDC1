import { Module } from '@nestjs/common';
import { DatabaseModule, ExamModule } from './v1/modules';

const V1_Modules = [DatabaseModule, ExamModule];

@Module({
  imports: [...V1_Modules],
})
export class AppModule {}
