export const retry = async (
    fn: () => Promise<any>,
    { retries = 3, minTimeout = 1000, factor = 2 } = {}
  ) => {
    let lastError;
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        await new Promise(resolve => setTimeout(resolve, minTimeout * Math.pow(factor, attempt)));
      }
    }
    throw lastError;
  };