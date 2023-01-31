import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error: any): void {
    const err = error.originalError || error;
    Sentry.captureException(err);
    console.error(err);
    // Sentry.showReportDialog({ eventId });
  }
}
