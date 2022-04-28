#include "BaseCoderHostObject.h"

#include "../cppcodec/cppcodec/base64_rfc4648.hpp"
#include "../cppcodec/cppcodec/base64_url.hpp"
#include "../cppcodec/cppcodec/base64_url_unpadded.hpp"

#include "../cppcodec/cppcodec/base32_rfc4648.hpp"
#include "../cppcodec/cppcodec/base32_crockford.hpp"
#include "../cppcodec/cppcodec/base32_hex.hpp"

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

      string result;

      if (algorithm == "base64Rfc4648") {
        string stringEncoded = base64Rfc4648::encode(stringToEncode);

        result = stringEncoded.c_str();
      }

      if (algorithm == "base64Url") {
        string stringEncoded = base64Url::encode(stringToEncode);

        result = stringEncoded.c_str();
      }

      if (algorithm == "base64UrlUnpadded") {
        string stringEncoded = base64UrlUnpadded::encode(stringToEncode);

        result = stringEncoded.c_str();
      }

      if (algorithm == "base32Rfc4648") {
        string stringEncoded = base32Rfc4648::encode(stringToEncode);

        result = stringEncoded.c_str();
      }

      if (algorithm == "base32Crockford") {
        string stringEncoded = base32Crockford::encode(stringToEncode);

        result = stringEncoded.c_str();
      }

      if (algorithm == "base32Hex") {
        string stringEncoded = base32Hex::encode(stringToEncode);

        result = stringEncoded.c_str();
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
        throw JSError(runtime, "[react-native-jsi-base-coder] The `bytesToDecode` argument is an empty string.");
      }

      vector<unsigned char> result;

      if (algorithm == "base64Rfc4648") {
        vector<unsigned char> bytesDecoded = base64Rfc4648::decode(bytesToDecode);

        result = bytesDecoded;
      }

      if (algorithm == "base64Url") {
        vector<unsigned char> bytesDecoded = base64Url::decode(bytesToDecode);

        result = bytesDecoded;
      }

      if (algorithm == "base64UrlUnpadded") {
        vector<unsigned char> bytesDecoded = base64UrlUnpadded::decode(bytesToDecode);

        result = bytesDecoded;
      }

      if (algorithm == "base32Rfc4648") {
        vector<unsigned char> bytesDecoded = base32Rfc4648::decode(bytesToDecode);

        result = bytesDecoded;
      }

      if (algorithm == "base32Crockford") {
        vector<unsigned char> bytesDecoded = base32Crockford::decode(bytesToDecode);

        result = bytesDecoded;
      }

      if (algorithm == "base32Hex") {
        vector<unsigned char> bytesDecoded = base32Hex::decode(bytesToDecode);

        result = bytesDecoded;
      }

      string s;

      transform(result.begin(), result.end(), back_inserter(s), [](char c) {
        return c;
      });

      return String::createFromUtf8(runtime, s);
    };

    return Function::createFromHostFunction(runtime, PropNameID::forUtf8(runtime, "decode"), 0, decode);
  }

  return Value::undefined();
}
