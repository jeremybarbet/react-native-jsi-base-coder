import { Algorithm, Config } from './types/global';

const isBrowser = typeof window !== `undefined`;

export const encode = (
  stringToEncode: string,
  config: Config = { algorithm: Algorithm.base64Rfc4648 },
) => {
  if (!isBrowser) {
    throw new Error(`Can only use BaseCoder in the browser.`);
  }

  if (config.algorithm !== Algorithm.base64Rfc4648) {
    throw new Error(`Other algorithms than base64Rfc4648 are not supported yet.`);
  }

  return btoa(stringToEncode);
};

export const decode = (
  bytesToEncode: string,
  config: Config = { algorithm: Algorithm.base64Rfc4648 },
) => {
  if (!isBrowser) {
    throw new Error(`Can only use BaseCoder in the browser.`);
  }

  if (config.algorithm !== Algorithm.base64Rfc4648) {
    throw new Error(`Other algorithms than base64Rfc4648 are not supported yet.`);
  }

  return atob(bytesToEncode);
};
