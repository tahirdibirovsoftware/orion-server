"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
if (cluster_1.default.isMaster) {
    const numCPUs = os_1.default.cpus().length;
    console.log(`Master cluster setting up ${numCPUs} workers...`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster_1.default.fork();
    });
}
else {
    bootstrap();
}
//# sourceMappingURL=main.js.map