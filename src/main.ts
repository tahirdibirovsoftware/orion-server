import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cluster from 'cluster';
import os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');

  const server = await app.listen(3000);

  process.on('SIGINT', async () => {
    await app.close();
    console.log('Application gracefully shutdown');
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    console.log('Application gracefully shutdown');
    process.exit(0);
  });

  return server;
}

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master cluster setting up ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  bootstrap();
}
