import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Algorithm, decode, encode } from 'react-native-jsi-base-coder';

import { Copy } from './components/Copy';
import { Group } from './components/Group';
import { Heading } from './components/Heading';
import { SubHeading } from './components/SubHeading';
import { useTheme } from './hooks/use-theme';

const rawString = 'Hello World!';
const encodeValue = (value: string) => `Encode "${value}" →`;
const decodeValue = (value: string) => `Decode "${value}" →`;

export default () => {
  const isDark = useTheme();

  const base64 = {
    encodedRfc4648: encode(rawString),
    encodedUrl: encode(rawString, { algorithm: Algorithm.base64Url }),
    encodedUrlUnpadded: encode(rawString, { algorithm: Algorithm.base64UrlUnpadded }),
  };

  const base32 = {
    encodedRfc4648: encode(rawString, { algorithm: Algorithm.base32Rfc4648 }),
    encodedCrockford: encode(rawString, { algorithm: Algorithm.base32Crockford }),
    encodedHex: encode(rawString, { algorithm: Algorithm.base32Hex }),
  };

  const base16 = {
    encodedUpper: encode(rawString, { algorithm: Algorithm.base16Upper }),
    encodedLower: encode(rawString, { algorithm: Algorithm.base16Lower }),
  };

  const Base64Examples = () => (
    <>
      <SubHeading>Base64</SubHeading>
      <Copy style={{ marginTop: 20 }}>RFC 4648</Copy>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{encodeValue(rawString)}</Copy>
        <Copy>{base64.encodedRfc4648}</Copy>
      </Group>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{decodeValue(base64.encodedRfc4648)}</Copy>
        <Copy>{decode(base64.encodedRfc4648)}</Copy>
      </Group>

      <Copy style={{ marginTop: 20 }}>Url</Copy>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{encodeValue(rawString)}</Copy>
        <Copy>{base64.encodedUrl}</Copy>
      </Group>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{decodeValue(base64.encodedUrl)}</Copy>
        <Copy>{decode(base64.encodedUrl, { algorithm: Algorithm.base64Url })}</Copy>
      </Group>

      <Copy style={{ marginTop: 20 }}>Url Unpadded</Copy>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{encodeValue(rawString)}</Copy>
        <Copy>{base64.encodedUrlUnpadded}</Copy>
      </Group>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{decodeValue(base64.encodedUrlUnpadded)}</Copy>
        <Copy>{decode(base64.encodedUrlUnpadded, { algorithm: Algorithm.base64UrlUnpadded })}</Copy>
      </Group>
    </>
  );

  const Base32Examples = () => (
    <>
      <SubHeading>Base32</SubHeading>
      <Copy style={{ marginTop: 20 }}>RFC 4648</Copy>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{encodeValue(rawString)}</Copy>
        <Copy>{base32.encodedRfc4648}</Copy>
      </Group>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{decodeValue(base32.encodedRfc4648)}</Copy>
        <Copy>{decode(base32.encodedRfc4648, { algorithm: Algorithm.base32Rfc4648 })}</Copy>
      </Group>

      <Copy style={{ marginTop: 20 }}>Crockford</Copy>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{encodeValue(rawString)}</Copy>
        <Copy>{base32.encodedCrockford}</Copy>
      </Group>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{decodeValue(base32.encodedCrockford)}</Copy>
        <Copy>{decode(base32.encodedCrockford, { algorithm: Algorithm.base32Crockford })}</Copy>
      </Group>

      <Copy style={{ marginTop: 20 }}>Hex</Copy>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{encodeValue(rawString)}</Copy>
        <Copy>{base32.encodedHex}</Copy>
      </Group>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{decodeValue(base32.encodedHex)}</Copy>
        <Copy>{decode(base32.encodedHex, { algorithm: Algorithm.base32Hex })}</Copy>
      </Group>
    </>
  );

  const Base16Examples = () => (
    <>
      <SubHeading>Base16</SubHeading>
      <Copy style={{ marginTop: 20 }}>Upper</Copy>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{encodeValue(rawString)}</Copy>
        <Copy>{base16.encodedUpper}</Copy>
      </Group>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{decodeValue(base16.encodedUpper)}</Copy>
        <Copy>{decode(base16.encodedUpper, { algorithm: Algorithm.base16Upper })}</Copy>
      </Group>

      <Copy style={{ marginTop: 20 }}>Lower</Copy>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{encodeValue(rawString)}</Copy>
        <Copy>{base16.encodedLower}</Copy>
      </Group>

      <Group>
        <Copy style={{ marginBottom: 8 }}>{decodeValue(base16.encodedLower)}</Copy>
        <Copy>{decode(base16.encodedLower, { algorithm: Algorithm.base16Lower })}</Copy>
      </Group>
    </>
  );

  return (
    <ScrollView>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />

      <View style={styles.container}>
        <Heading>react-native-jsi-base-coder</Heading>

        <View style={styles.group}>
          <Base64Examples />
          <Base32Examples />
          <Base16Examples />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,
  },

  group: {
    marginBottom: 40,
  },
});
