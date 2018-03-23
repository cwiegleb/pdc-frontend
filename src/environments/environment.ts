// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serviceEndpointCashbox: 'http://192.168.178.40:9002',
  serviceEndpointDealerUpload: 'http://192.168.178.40:9005',
  serviceEndpointCashboxUpload: 'http://192.168.178.40:9005',
  serviceEndpointDealer: 'http://192.168.178.40:9003',
  serviceEndpointArticle: 'http://192.168.178.40:9001',
  serviceEndpointOrder: 'http://192.168.178.40:9004',
};
