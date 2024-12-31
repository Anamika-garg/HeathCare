// Error handling utilities
export class APIError extends Error {
    constructor(message: string, public statusCode?: number) {
      super(message);
      this.name = 'APIError';
    }
  }
  
  export const handleError = (error: unknown): string => {
    if (error instanceof APIError) {
      return error.message;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred';
  };