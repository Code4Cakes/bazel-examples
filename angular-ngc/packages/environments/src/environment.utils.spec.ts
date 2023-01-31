import * as environments from '@intf/environments';

describe('environments library', () => {
  describe('setGlobalEnvironmentConfig', () => {
    const metaTagName = 'config/environment';

    beforeAll(() => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', metaTagName);
      meta.setAttribute('content', encodeURIComponent(JSON.stringify({})));
      document.head.appendChild(meta);
    });

    afterAll(() => {
      const meta = document.querySelector(`meta[name="${metaTagName}"]`);
      meta.remove();
    });

    it('should set config if metaTagConfig is not set', () => {
      document.createElement('meta');
      const config = { NODE_ENV: 'config node_env' };
      environments.initializeEnvironment(config);
      expect(client.env.NODE_ENV).toEqual(config.NODE_ENV);
    });

    it('should set metaTagConfig if config is not set', () => {
      const metaTagConfig = { NODE_ENV: 'metaTagConfig node_env' };
      environments.initializeEnvironment(metaTagConfig);

      expect(client.env.NODE_ENV).toEqual(metaTagConfig.NODE_ENV);
    });
  });
});
