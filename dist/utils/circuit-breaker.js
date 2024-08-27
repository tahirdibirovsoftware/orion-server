"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = void 0;
class CircuitBreaker {
    constructor(pool, options) {
        this.pool = pool;
        this.options = options;
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.successCount = 0;
        this.nextAttempt = Date.now();
    }
    async execute(action) {
        if (this.state === 'OPEN') {
            if (this.nextAttempt <= Date.now()) {
                this.state = 'HALF-OPEN';
            }
            else {
                throw new Error('Circuit is OPEN');
            }
        }
        try {
            const result = await action();
            this.onSuccess();
            return result;
        }
        catch (error) {
            this.onFailure();
            throw error;
        }
    }
    onSuccess() {
        this.failureCount = 0;
        if (this.state === 'HALF-OPEN') {
            this.successCount++;
            if (this.successCount >= this.options.successThreshold) {
                this.state = 'CLOSED';
                this.successCount = 0;
            }
        }
    }
    onFailure() {
        this.failureCount++;
        if (this.failureCount >= this.options.failureThreshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.options.timeout;
        }
    }
}
exports.CircuitBreaker = CircuitBreaker;
//# sourceMappingURL=circuit-breaker.js.map