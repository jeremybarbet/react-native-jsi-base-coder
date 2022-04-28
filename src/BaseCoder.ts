import { NativeModules } from 'react-native';

import { Algorithm, Config } from './types/global.d';
import { isAndroid, isIOS, isMacOS } from './utils/platform';

if (global.__BaseCoderProxy == null) {
  const BaseCoderModule = NativeModules.BaseCoder;

  if (BaseCoderModule == null) {
    let message =
      '[react-native-jsi-base-coder] Failed to install: The native `BaseCoder` Module could not be found.\n* Make sure react-native-jsi-base-coder is correctly autolinked (run `npx react-native config` to verify)';

    if (isIOS || isMacOS) {
      message += '\n* Make sure you ran `pod install` in the ios/ directory.';
    }

    if (isAndroid) {
      message += '\n* Make sure gradle is synced.';
    }

    const ExpoConstants = NativeModules.NativeUnimoduleProxy?.modulesConstants?.ExponentConstants;

    if (ExpoConstants !== null) {
      if (ExpoConstants.appOwnership === 'expo') {
        throw new Error(
          '[react-native-jsi-base-coder] Not supported in Expo Go! Use EAS (`expo prebuild`) or eject to a bare workflow instead.',
        );
      }

      // We're running Expo bare / standalone
      message += '\n* Make sure you ran `expo prebuild`.';
    }

    message += '\n* Make sure you rebuilt the app.';

    throw new Error(message);
  }

  // Check if we are running on-device (JSI)
  if (global.nativeCallSyncHook == null || BaseCoderModule.install == null) {
    throw new Error(
      '[react-native-jsi-base-coder] Failed to install: React Native is not running on-device. BaseCoder can only be used when synchronous method invocations (JSI) are possible. If you are using a remote debugger (e.g. Chrome), switch to an on-device debugger (e.g. Flipper) instead.',
    );
  }

  const result = BaseCoderModule.install();

  if (result !== true) {
    throw new Error(
      `[react-native-jsi-base-coder] Failed to install: The native BaseCoder Module could not be installed! Looks like something went wrong when installing JSI bindings: ${result}`,
    );
  }

  if (global.__BaseCoderProxy == null) {
    throw new Error(
      '[react-native-jsi-base-coder] Failed to install, the native initializer function does not exist. Are you trying to use BaseCoder from different JS Runtimes?',
    );
  }
}

const BaseCoder = global.__BaseCoderProxy;

export const encode = (
  stringToEncode: string,
  config: Config = { algorithm: Algorithm.base64Rfc4648 },
) => BaseCoder.encode(stringToEncode, config);

export const decode = (
  bytesToDecode: string,
  config: Config = { algorithm: Algorithm.base64Rfc4648 },
) => BaseCoder.decode(bytesToDecode, config);
