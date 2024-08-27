export class CircuitBreaker {
    private state: 'CLOSED' | 'OPEN' | 'HALF-OPEN' = 'CLOSED';
    private failureCount = 0;
    private successCount = 0;
    private nextAttempt = Date.now();
  
    constructor(
      private readonly pool: any,
      private readonly options: {
        failureThreshold: number;
        successThreshold: number;
        timeout: number;
      }
    ) {}
  
    async execute<T>(action: () => Promise<T>): Promise<T> {
      if (this.state === 'OPEN') {
        if (this.nextAttempt <= Date.now()) {
          this.state = 'HALF-OPEN';
        } else {
          throw new Error('Circuit is OPEN');
        }
      }
  
      try {
        const result = await action();
        this.onSuccess();
        return result;
      } catch (error) {
        this.onFailure();
        throw error;
      }
    }
  
    private onSuccess() {
      this.failureCount = 0;
      if (this.state === 'HALF-OPEN') {
        this.successCount++;
        if (this.successCount >= this.options.successThreshold) {
          this.state = 'CLOSED';
          this.successCount = 0;
        }
      }
    }
  
    private onFailure() {
      this.failureCount++;
      if (this.failureCount >= this.options.failureThreshold) {
        this.state = 'OPEN';
        this.nextAttempt = Date.now() + this.options.timeout;
      }
    }
  }