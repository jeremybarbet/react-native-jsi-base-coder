import 'react-native';

export enum Algorithm {
  'base64Rfc4648' = 'base64Rfc4648',
  'base64Url' = 'base64Url',
  'base64UrlUnpadded' = 'base64UrlUnpadded',
  'base32Rfc4648' = 'base32Rfc4648',
  'base32Crockford' = 'base32Crockford',
  'base32Hex' = 'base32Hex',
  'base16Upper' = 'base16Upper',
  'base16Lower' = 'base16Lower',
}

export interface Config {
  /**
   * The algorithm to use to encode and decoded the data.
   * @default base64Rfc4648
   */
  algorithm?: Algorithm;
}

export interface BaseCoderProps {
  install(): boolean;
  encode(stringToEncode: string, config?: Config): string;
  decode(bytesToDecode: string, config?: Config): string;
}

declare global {
  // eslint-disable-next-line no-var
  var __BaseCoderProxy: BaseCoderProps | undefined;
  function nativeCallSyncHook(): unknown;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    BaseCoder: BaseCoderProps;
  }
}
