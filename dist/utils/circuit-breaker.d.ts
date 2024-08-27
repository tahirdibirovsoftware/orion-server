export declare class CircuitBreaker {
    private readonly pool;
    private readonly options;
    private state;
    private failureCount;
    private successCount;
    private nextAttempt;
    constructor(pool: any, options: {
        failureThreshold: number;
        successThreshold: number;
        timeout: number;
    });
    execute<T>(action: () => Promise<T>): Promise<T>;
    private onSuccess;
    private onFailure;
}
