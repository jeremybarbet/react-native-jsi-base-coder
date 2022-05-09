#include "BaseCoderHostObject.h"

#include "../cppcodec/cppcodec/base64_rfc4648.hpp"
#include "../cppcodec/cppcodec/base64_url.hpp"
#include "../cppcodec/cppcodec/base64_url_unpadded.hpp"

#include "../cppcodec/cppcodec/base32_rfc4648.hpp"
#include "../cppcodec/cppcodec/base32_crockford.hpp"
#include "../cppcodec/cppcodec/base32_hex.hpp"

#include "../cppcodec/cppcodec/hex_upper.hpp"
#include "../cppcodec/cppcodec/hex_lower.hpp"

#include <jsi/jsi.h>
#include <string>
#include <iostream>

using namespace facebook::jsi;
using namespace std;

vector<PropNameID> BaseCoderHostObject::getPropertyNames(Runtime& rt) {
  vector<PropNameID> result;

  result.push_back(PropNameID::forUtf8(rt, string("encode")));
  result.push_back(PropNameID::forUtf8(rt, string("decode")));

  return result;
}

Value BaseCoderHostObject::get(Runtime& runtime, const PropNameID& propNameId) {
  auto propName = propNameId.utf8(runtime);

  using base64Rfc4648 = cppcodec::base64_rfc4648;
  using base64Url = cppcodec::base64_url;
  using base64UrlUnpadded = cppcodec::base64_url_unpadded;

  using base32Rfc4648 = cppcodec::base32_rfc4648;
  using base32Crockford = cppcodec::base32_crockford;
  using base32Hex = cppcodec::base32_hex;
  
  using base16Upper = cppcodec::hex_upper;
  using base16Lower = cppcodec::hex_lower;

  if (propName == "encode") {
    auto encode = [this] (Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count) -> Value {
      if (count == 0) {
        throw JSError(runtime, "[react-native-jsi-base-coder] No argument passed to `encode()`.");
      }

      if (!arguments[0].isString()) {
        throw JSError(runtime, "[react-native-jsi-base-coder] The `stringToEncode` argument has to be a string.");
      }

      auto algorithm = arguments[1].asObject(runtime).getProperty(runtime, "algorithm").toString(runtime).utf8(runtime);
      auto stringToEncode = arguments[0].asString(runtime).utf8(runtime);

      if (stringToEncode.length() == 0) {
        throw JSError(runtime, "[react-native-jsi-base-coder] The `stringToEncode` cannot be an empty string.");
      }

      string result;

      if (algorithm == "base64Rfc4648") {
        string stringEncoded = base64Rfc4648::encode(stringToEncode);

        result = stringEncoded;
      }

      if (algorithm == "base64Url") {
        string stringEncoded = base64Url::encode(stringToEncode);

        result = stringEncoded;
      }

      if (algorithm == "base64UrlUnpadded") {
        string stringEncoded = base64UrlUnpadded::encode(stringToEncode);

        result = stringEncoded;
      }

      if (algorithm == "base32Rfc4648") {
        string stringEncoded = base32Rfc4648::encode(stringToEncode);

        result = stringEncoded;
      }

      if (algorithm == "base32Crockford") {
        string stringEncoded = base32Crockford::encode(stringToEncode);

        result = stringEncoded;
      }

      if (algorithm == "base32Hex") {
        string stringEncoded = base32Hex::encode(stringToEncode);

        result = stringEncoded;
      }
      
      if (algorithm == "base16Upper") {
        string stringEncoded = base16Upper::encode(stringToEncode);

        result = stringEncoded;
      }
      
      if (algorithm == "base16Lower") {
        string stringEncoded = base16Lower::encode(stringToEncode);

        result = stringEncoded;
      }

      return String::createFromUtf8(runtime, result);
    };

    return Function::createFromHostFunction(runtime, PropNameID::forUtf8(runtime, "encode"), 0, encode);
  }

  if (propName == "decode") {
    auto decode = [this] (Runtime& runtime, const Value& thisValue, const Value* arguments, size_t count) -> Value {
      if (count == 0) {
        throw JSError(runtime, "[react-native-jsi-base-coder] No argument passed to `decode()`.");
      }

      if (!arguments[0].isString()) {
        throw JSError(runtime, "[react-native-jsi-base-coder] The `bytesToDecode` argument has to be a string.");
      }

      auto algorithm = arguments[1].asObject(runtime).getProperty(runtime, "algorithm").toString(runtime).utf8(runtime);
      auto bytesToDecode = arguments[0].asString(runtime).utf8(runtime);

      if (bytesToDecode.length() == 0) {
        throw JSError(runtime, "[react-native-jsi-base-coder] The `bytesToDecode` cannot be an empty string.");
      }

      string result;

      if (algorithm == "base64Rfc4648") {
        vector<uint8_t> bytesDecoded = base64Rfc4648::decode(bytesToDecode);

        result.assign(bytesDecoded.begin(), bytesDecoded.end());
      }

      if (algorithm == "base64Url") {
        vector<uint8_t> bytesDecoded = base64Url::decode(bytesToDecode);

        result.assign(bytesDecoded.begin(), bytesDecoded.end());
      }

      if (algorithm == "base64UrlUnpadded") {
        vector<uint8_t> bytesDecoded = base64UrlUnpadded::decode(bytesToDecode);

        result.assign(bytesDecoded.begin(), bytesDecoded.end());
      }

      if (algorithm == "base32Rfc4648") {
        vector<uint8_t> bytesDecoded = base32Rfc4648::decode(bytesToDecode);

        result.assign(bytesDecoded.begin(), bytesDecoded.end());
      }

      if (algorithm == "base32Crockford") {
        vector<uint8_t> bytesDecoded = base32Crockford::decode(bytesToDecode);

        result.assign(bytesDecoded.begin(), bytesDecoded.end());
      }

      if (algorithm == "base32Hex") {
        vector<uint8_t> bytesDecoded = base32Hex::decode(bytesToDecode);

        result.assign(bytesDecoded.begin(), bytesDecoded.end());
      }
      
      if (algorithm == "base16Upper") {
        vector<uint8_t> bytesDecoded = base16Upper::decode(bytesToDecode);

        result.assign(bytesDecoded.begin(), bytesDecoded.end());
      }
      
      if (algorithm == "base16Lower") {
        vector<uint8_t> bytesDecoded = base16Lower::decode(bytesToDecode);

        result.assign(bytesDecoded.begin(), bytesDecoded.end());
      }

      return String::createFromUtf8(runtime, result);
    };

    return Function::createFromHostFunction(runtime, PropNameID::forUtf8(runtime, "decode"), 0, decode);
  }

  return Value::undefined();
}
