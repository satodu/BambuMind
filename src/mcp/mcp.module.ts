import { Module } from '@nestjs/common';
import { McpService } from './mcp.service';
import { QuizModule } from '../quiz/quiz.module';

@Module({
  imports: [QuizModule],
  providers: [McpService],
  exports: [McpService],
})
export class McpModule {}
