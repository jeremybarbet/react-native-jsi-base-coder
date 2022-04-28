#import "BaseCoderModule.h"

#import <React/RCTBridge+Private.h>
#import <React/RCTUtils.h>
#import <jsi/jsi.h>

#import "../cpp/BaseCoderHostObject.h"

@interface BaseCoderModule ()
@end

@implementation BaseCoderModule

RCT_EXPORT_MODULE(BaseCoder)

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(install) {
  NSLog(@"Installing JSI bindings for react-native-jsi-base-coder...");

  RCTBridge* bridge = [RCTBridge currentBridge];
  RCTCxxBridge* cxxBridge = (RCTCxxBridge*)bridge;

  if (cxxBridge == nil) {
    return @false;
  }

  using namespace facebook::jsi;
  using namespace std;

  auto jsiRuntime = (Runtime*) cxxBridge.runtime;

  if (jsiRuntime == nil) {
    return @false;
  }

  auto& runtime = *jsiRuntime;

  auto hostObject = make_shared<BaseCoderHostObject>();
  auto object = Object::createFromHostObject(runtime, hostObject);
  runtime.global().setProperty(runtime, "__BaseCoderProxy", move(object));

  NSLog(@"Successfully installed JSI bindings for react-native-jsi-base-coder");

  return @true;
}

@end
