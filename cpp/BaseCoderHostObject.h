#ifndef BASECODERHOSTOBJECT_H
#define BASECODERHOSTOBJECT_H

#include <jsi/jsi.h>

using namespace facebook::jsi;
using namespace std;

class JSI_EXPORT BaseCoderHostObject: public HostObject {
  public:
    explicit BaseCoderHostObject() {}

  public:
    vector<PropNameID> getPropertyNames(Runtime& rt) override;
    Value get(Runtime&, const PropNameID& name) override;
};

#endif
