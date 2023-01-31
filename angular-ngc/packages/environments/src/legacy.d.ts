interface Client {
  env: { [key: string]: any };
}

interface Config {
  [key: string]: any;
}

interface Window {
  client: Client;
}

declare const client: Client;
