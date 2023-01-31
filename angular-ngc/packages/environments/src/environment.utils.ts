export function getMetaTagConfig(): Config {
  const configElement = document.querySelector(
    'meta[name="config/environment"]'
  );

  if (!configElement) {
    console.warn(
      'Configuration meta tag (e.g. <meta name="config/environment" content="..." /> not found'
    );
    return;
  }

  const encodedConfig = configElement.getAttribute('content');

  if (!encodedConfig) {
    throw new Error(
      'Configuration meta tag found, but does not contain any content'
    );
  }

  try {
    return JSON.parse(decodeURIComponent(encodedConfig)) as any;
  } catch (e) {
    throw new Error(
      'Unable to parse configuration from the configuration meta tag'
    );
  }
}

/**
 * @deprecated 03/25/2020. Will be deleted on 05/25/2020. Use EnvironmentModule instead.
 */
export function initializeEnvironment(config: Config): void {
  console.warn('InitializeEnvironment is deprecated. use EnvironmentModule');
  window.client = {
    env: {
      ...config,
      ...getMetaTagConfig(),
    },
  };
}
