globalThis.CKEDITOR = {
  plugins: { basePath: 'mock_path' },
  // @ts-ignore
  on: () => {},
};

const gonObject = window.gon || {};

window.gon = {
  appName: '',
  tenantId: '1',
  environment: 'test',
  iamServer: 'https://iam-api-test.interfolio.com',
  server_logic: 'https://logic-test.interfolio.com',
  loginUrl: 'https://account-test.interfolio.com/login',
  logoutUrl: 'https://account-test.interfolio.com/logout',
  serverSuffix: '-test',
  segmentWriteKeys: '',
  segmentWriteKey: '',
  // DEPRECATED - underscored to support legacy code based in Sinatra and MC
  iam_server: 'https://iam-api-test.interfolio.com',
  server_suffix: '-test',
  user_pid: '',
  signupUrl: '',
  server_environment_bucket_suffix: '',
  enterprise_dossier_tenant_ids: '',
  enterprise_dossier_institutions: '',
  currentPacket: '',
  currentTemplate: '',
  user: '',
  ...gonObject,
};
