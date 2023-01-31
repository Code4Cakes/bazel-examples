import { Injectable } from '@angular/core';
import * as Sentry from '@sentry/browser';
import { Environment } from '@intf/environments/src/environment';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  pid: string;
  tenant: string;

  constructor(private environment: Environment) {}

  setupSystemAnalytics(): void {
    const { environment, pid, tenant } = this;
    const { SENTRY_DSN } = environment.config;

    Sentry.init({
      dsn: SENTRY_DSN,
      ignoreErrors: ['Non-Error exception captured'],
    });
    Sentry.configureScope(scope => {
      scope.setTag('user_tenant', tenant);
      scope.setUser({ id: pid });
    });
  }

  setupAppAnalytics(user: any): void {
    const { pid, tenantId } = user;
    this.pid = pid.toString();
    this.tenant = tenantId;

    this.setupSystemAnalytics();
  }

  /**
   * injects Segment analytics script into index.html
   * utilizes environment variables for Segment Write Key so needs to be run from here
   */
  loadScript(): void {
    const { environment } = this;
    // @ts-ignore
    const analytics = (window.analytics = window.analytics || []);

    if (
      environment.config.hasOwnProperty('SEGMENT_API_KEY') &&
      environment.config.SEGMENT_API_KEY
    ) {
      if (!analytics.initialize) {
        if (analytics.invoked) {
          if (window.console && console.error) {
            console.error('Segment snippet included twice.');
          }
        } else {
          analytics.invoked = !0;
          analytics.methods = [
            'trackSubmit',
            'trackClick',
            'trackLink',
            'trackForm',
            'pageview',
            'identify',
            'reset',
            'group',
            'track',
            'ready',
            'alias',
            'debug',
            'page',
            'once',
            'off',
            'on',
          ];
          analytics.factory = function(t) {
            return function() {
              const e = Array.prototype.slice.call(arguments);
              e.unshift(t);
              analytics.push(e);
              return analytics;
            };
          };
          for (let t = 0; t < analytics.methods.length; t++) {
            const e = analytics.methods[t];
            analytics[e] = analytics.factory(e);
          }
          analytics.load = function(t, e) {
            const n = document.createElement('script');
            n.type = 'text/javascript';
            n.async = !0;
            n.src =
              'https://cdn.segment.com/analytics.js/v1/' +
              t +
              '/analytics.min.js';
            const a = document.getElementsByTagName('script')[0];
            a.parentNode.insertBefore(n, a);
            analytics._loadOptions = e;
          };
          analytics.SNIPPET_VERSION = '4.1.0';
          analytics.load(environment.config.SEGMENT_API_KEY);
          analytics.page();
        }
      }
    }
  }
}
