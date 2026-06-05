#import "AppDelegate.h"

#import "BranchNPM.h"
#import "BranchSDK.h"

#ifdef BRANCH_NPM
#import "Branch.h"
#else
#import <BranchSDK/Branch.h>
#endif

// Provides Ionic Capacitor compatibility
#import <Cordova/CDVPlugin.h>
#import <objc/runtime.h>

@interface AppDelegate (BranchSDK)

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler;

@end

static BOOL BSDKHasOriginalImplementation(id self, SEL originalSelector, SEL swizzledSelector) {
  IMP originalIMP = class_getMethodImplementation([self class], originalSelector);
  IMP swizzledIMP = class_getMethodImplementation([self class], swizzledSelector);
  return originalIMP != swizzledIMP;
}

static void BSDKSwizzleSelectorOnClass(Class targetClass, SEL originalSelector, SEL swizzledSelector) {
  if (targetClass == Nil) {
    return;
  }

  Method sourceMethod = class_getInstanceMethod([AppDelegate class], swizzledSelector);
  if (sourceMethod == NULL) {
    return;
  }

  class_addMethod(targetClass,
                  swizzledSelector,
                  method_getImplementation(sourceMethod),
                  method_getTypeEncoding(sourceMethod));

  Method originalMethod = class_getInstanceMethod(targetClass, originalSelector);
  Method targetSwizzledMethod = class_getInstanceMethod(targetClass, swizzledSelector);

  if (originalMethod != NULL && targetSwizzledMethod != NULL) {
    method_exchangeImplementations(originalMethod, targetSwizzledMethod);
  } else if (targetSwizzledMethod != NULL) {
    class_addMethod(targetClass,
                    originalSelector,
                    method_getImplementation(targetSwizzledMethod),
                    method_getTypeEncoding(targetSwizzledMethod));
  }
}

@implementation AppDelegate (BranchSDK)

+ (void)load {
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^{
    Class appDelegateClass = NSClassFromString(@"AppDelegate");
    Class cordovaAppDelegateClass = NSClassFromString(@"CDVAppDelegate");

    BSDKSwizzleSelectorOnClass(appDelegateClass,
                               @selector(application:didFinishLaunchingWithOptions:),
                               @selector(bsdk_application:didFinishLaunchingWithOptions:));
    BSDKSwizzleSelectorOnClass(cordovaAppDelegateClass,
                               @selector(application:didFinishLaunchingWithOptions:),
                               @selector(bsdk_application:didFinishLaunchingWithOptions:));

    BSDKSwizzleSelectorOnClass(appDelegateClass,
                               @selector(application:openURL:options:),
                               @selector(bsdk_application:openURL:options:));
    BSDKSwizzleSelectorOnClass(cordovaAppDelegateClass,
                               @selector(application:openURL:options:),
                               @selector(bsdk_application:openURL:options:));

    BSDKSwizzleSelectorOnClass(appDelegateClass,
                               @selector(application:continueUserActivity:restorationHandler:),
                               @selector(bsdk_application:continueUserActivity:restorationHandler:));
    BSDKSwizzleSelectorOnClass(cordovaAppDelegateClass,
                               @selector(application:continueUserActivity:restorationHandler:),
                               @selector(bsdk_application:continueUserActivity:restorationHandler:));

    BSDKSwizzleSelectorOnClass(appDelegateClass,
                               @selector(application:didReceiveRemoteNotification:),
                               @selector(bsdk_application:didReceiveRemoteNotification:));
    BSDKSwizzleSelectorOnClass(cordovaAppDelegateClass,
                               @selector(application:didReceiveRemoteNotification:),
                               @selector(bsdk_application:didReceiveRemoteNotification:));
  });
}

- (BOOL)bsdk_application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [BranchSDK noteDidFinishLaunchingWithOptions:launchOptions];
  if (BSDKHasOriginalImplementation(self,
                                    @selector(application:didFinishLaunchingWithOptions:),
                                    @selector(bsdk_application:didFinishLaunchingWithOptions:))) {
    return [self bsdk_application:application didFinishLaunchingWithOptions:launchOptions];
  }
  return YES;
}

// Respond to URI scheme links
- (BOOL)bsdk_application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  [BranchSDK noteOpenURL:url options:options];
  [BranchSDK setPendingOpenURL:url options:options];
  BOOL branchHandled = [[Branch getInstance] application:app openURL:url options:options];
  BOOL originalResult = YES;
  if (BSDKHasOriginalImplementation(self,
                                    @selector(application:openURL:options:),
                                    @selector(bsdk_application:openURL:options:))) {
    originalResult = [self bsdk_application:app openURL:url options:options];
  }
  // pass the url to the handle deep link call
  if (!branchHandled) {
    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];
    // send unhandled URL to notification
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:@"BSDKPostUnhandledURL" object:[url absoluteString]]];
  }
  return originalResult;
}

// Respond to Universal Links
- (BOOL)bsdk_application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
  [BranchSDK noteUserActivity:userActivity];
  [BranchSDK setPendingUserActivity:userActivity];
  BOOL branchHandled = [[Branch getInstance] continueUserActivity:userActivity];
  BOOL originalResult = YES;
  if (BSDKHasOriginalImplementation(self,
                                    @selector(application:continueUserActivity:restorationHandler:),
                                    @selector(bsdk_application:continueUserActivity:restorationHandler:))) {
    originalResult = [self bsdk_application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
  }
  if (!branchHandled) {
    // send unhandled URL to notification
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
      [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:@"BSDKPostUnhandledURL" object:[userActivity.webpageURL absoluteString]]];
    }
  }

  return originalResult;
}

// Respond to Push Notifications
- (void)bsdk_application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  @try {
    [[Branch getInstance] handlePushNotification:userInfo];
  }
  @catch (NSException *exception) {
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:@"BSDKPostUnhandledURL" object:userInfo]];
  }

  if (BSDKHasOriginalImplementation(self,
                                    @selector(application:didReceiveRemoteNotification:),
                                    @selector(bsdk_application:didReceiveRemoteNotification:))) {
    [self bsdk_application:application didReceiveRemoteNotification:userInfo];
  }
}

@end
