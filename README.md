# react-native-jsi-base-coder

Base64/32/16 encoding/decoding for React Native written in C/C++ and JSI.

## Installation

```bash
yarn add react-native-jsi-base-coder
```

## Usage

Default behavior is using the `base64Rfc4648` algorithm to encode/decode the data.

```ts
import { encode, decode } from 'react-native-jsi-base-coder';

// With the default algorithm in `base64Rfc4648`.
encode('Hello World!'); // SGVsbG8gV29ybGQh
decode('SGVsbG8gV29ybGQh'); // Hello World!

// With the Base32 algorithm with the `base32Rfc4648`.
encode('Hello World!', { algorithm: Algorithm.base32Rfc4648 }); // JBSWY3DPEBLW64TMMQQQ====
decode('JBSWY3DPEBLW64TMMQQQ====', { algorithm: Algorithm.base32Rfc4648 }); // Hello World!
```

## API

### `encode`

```ts
function (stringToEncode: string, config?: Config): string
```

Takes a string and returns an encoded string.

### `decode`

Takes an encoded string and returns a decoded string.

```ts
function (bytesToDecode: string, config?: Config): string
```

### `config`

The config object only take one property `algorithm` to define how you want to encode/decode your data. The default algorithm used is `base64Rfc4648`.

```ts
enum Algorithm {
  'base64Rfc4648' = 'base64Rfc4648',
  'base64Url' = 'base64Url',
  'base64UrlUnpadded' = 'base64UrlUnpadded',
  'base32Rfc4648' = 'base32Rfc4648',
  'base32Crockford' = 'base32Crockford',
  'base32Hex' = 'base32Hex',
  'base16Upper' = 'base16Upper',
  'base16Lower' = 'base16Lower',
}

encode('string to encode', { algorithm: Algorithm.base32Crockford });
```

## Example

To run the development example you can use the following command:

```bash
cd example
yarn
```

## Acknowledgements

- Thanks to Marc for his JSI template [react-native-jsi-library-template](https://github.com/mrousavy/react-native-jsi-library-template).
- Thanks to [cppcodec](https://github.com/tplgy/cppcodec) for the C implementation.

## License

MIT
