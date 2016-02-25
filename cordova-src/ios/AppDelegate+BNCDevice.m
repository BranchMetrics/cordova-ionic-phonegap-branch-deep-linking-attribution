#import "AppDelegate+BNCDevice.h"
#import "BNCDevice.h"
#import <objc/runtime.h>

@implementation AppDelegate (BNCDevice)

static BOOL swizzled = NO;

+ (void)load {
    // only need to worry about this in iOS 8 and later
    NSProcessInfo *processInfo = [NSProcessInfo processInfo];
    if ([processInfo respondsToSelector:@selector(operatingSystemVersion)]) {
        //operatingSystemVersion was introduced in iOS 8
        Method swizzlee = class_getInstanceMethod(self, @selector(application:continueUserActivity:restorationHandler:));
        Method swizzler = class_getInstanceMethod(self, @selector(swizzleApplication:continueUserActivity:restorationHandler:));
        
        if (swizzlee) {
            method_exchangeImplementations(swizzlee, swizzler);
            swizzled = YES;
        } else {
            // app delegate has not implemented optional protocol method. add it in with our implementation
            const char *typeEncoding = method_getTypeEncoding(swizzler);
            class_addMethod(self, @selector(application:continueUserActivity:restorationHandler:), method_getImplementation(swizzler), typeEncoding);
        }
    }
}

- (BOOL)swizzleApplication:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
    if (![userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        if (swizzled) {
            return [self swizzleApplication:application continueUserActivity:userActivity restorationHandler:restorationHandler];
        }
        
        return NO;
    }
    
    BNCDevice *device = [self.viewController getCommandInstance:@"BranchDevice"];
    
    return [device handleUserActivity:userActivity];
}

@end
