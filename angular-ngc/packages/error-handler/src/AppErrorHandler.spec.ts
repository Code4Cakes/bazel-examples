import * as Sentry from '@sentry/browser';
import { AppErrorHandler } from './AppErrorHandler';

describe('AppErrorHandler', () => {
  let spy;

  beforeEach(() => {
    spy = spyOn(Sentry, 'captureException');
  });

  afterEach(() => {
    spy.calls.reset();
  });

  describe('logs errors', () => {
    let sentryHandler;

    beforeEach(() => {
      sentryHandler = new AppErrorHandler();
    });

    it('captures app exceptions', () => {
      sentryHandler.handleError('fake error');
      expect(spy).toHaveBeenCalled();
    });
  });
});
