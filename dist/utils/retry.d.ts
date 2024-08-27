export declare const retry: (fn: () => Promise<any>, { retries, minTimeout, factor }?: {
    retries?: number;
    minTimeout?: number;
    factor?: number;
}) => Promise<any>;
