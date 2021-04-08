import { Module } from '@nestjs/common';
import { DatabaseModule } from './v1/modules';

const V1_Modules = [DatabaseModule];

@Module({
  imports: [...V1_Modules],
})
export class AppModule {}
