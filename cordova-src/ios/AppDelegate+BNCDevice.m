#import "AppDelegate+BNCDevice.h"
#import "BNCDevice.h"

@implementation AppDelegate (BNCDevice)

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
    if (![userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
        return NO;
    }
    
    BNCDevice *device = [self.viewController getCommandInstance:@"BranchDevice"];
    
    return [device handleUserActivity:userActivity];
}

@end
