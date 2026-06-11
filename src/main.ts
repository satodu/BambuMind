import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // Redirect console methods to a file to prevent stdout pollution,
  // which would corrupt JSON-RPC messages used by the MCP protocol.
  const logFilePath = path.join(process.cwd(), 'debug.log');
  const logFile = fs.createWriteStream(logFilePath, { flags: 'a' });

  const formatArgs = (args: any[]) => {
    return args
      .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : arg))
      .join(' ');
  };

  console.log = (...args) => {
    logFile.write(`[LOG] [${new Date().toISOString()}] ${formatArgs(args)}\n`);
  };
  console.info = (...args) => {
    logFile.write(`[INFO] [${new Date().toISOString()}] ${formatArgs(args)}\n`);
  };
  console.warn = (...args) => {
    logFile.write(`[WARN] [${new Date().toISOString()}] ${formatArgs(args)}\n`);
  };
  console.error = (...args) => {
    logFile.write(`[ERROR] [${new Date().toISOString()}] ${formatArgs(args)}\n`);
  };

  // Initialize the application with our redirected logger
  const app = await NestFactory.create(AppModule, {
    logger: {
      log(message: any) {
        console.log(message);
      },
      error(message: any, trace?: string) {
        console.error(message, trace);
      },
      warn(message: any) {
        console.warn(message);
      },
      debug(message: any) {
        console.info(message);
      },
      verbose(message: any) {
        console.info(message);
      },
    },
  });

  // We only run app.init() because the MCP server communicates over standard I/O (stdin/stdout).
  // Calling app.listen() is unnecessary and starts a redundant HTTP server.
  await app.init();
}
bootstrap();

