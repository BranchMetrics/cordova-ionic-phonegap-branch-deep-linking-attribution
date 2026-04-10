#import <Intents/Intents.h>

#import "AppDelegate.h"

#import "BranchNPM.h"

#ifdef BRANCH_NPM
#import "Branch.h"
#else
#import <BranchSDK/Branch.h>
#endif

// Provides Ionic Capacitor compatibility
#import <Cordova/CDVPlugin.h>

@interface AppDelegate (BranchSDK)

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler;

@end

@implementation AppDelegate (BranchSDK)

// Respond to URI scheme links
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  // pass the url to the handle deep link call
  if (![[Branch getInstance] application:app openURL:url options:options]) {
    // do other deep link routing for the Facebook SDK, Pinterest SDK, etc
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];
    // send unhandled URL to notification
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:@"BSDKPostUnhandledURL" object:[url absoluteString]]];
  }
  return YES;
}

// Respond to Universal Links
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray *restorableObjects))restorationHandler {
  if (![[Branch getInstance] continueUserActivity:userActivity]) {
    // send unhandled URL to notification
    if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
      [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:@"BSDKPostUnhandledURL" object:[userActivity.webpageURL absoluteString]]];
    }
  }

  // Check for call intents
  if (@available(iOS 10.0, *)) {
    BOOL isCallIntent = [userActivity.activityType isEqualToString:@"INStartCallIntent"] ||
                        [userActivity.activityType isEqualToString:@"INStartAudioCallIntent"] ||
                        [userActivity.activityType isEqualToString:@"INStartVideoCallIntent"];
    if (isCallIntent) {
      NSLog(@"[Branch+CallRelay] Caught %@ — relaying to CordovaCall.", userActivity.activityType);
      id intent = userActivity.interaction.intent;
      INPerson *contact;
      BOOL isVideo = NO;
      if (@available(iOS 13.0, *)) {
        if ([intent isKindOfClass:[INStartCallIntent class]]) {
          INStartCallIntent *startCallIntent = (INStartCallIntent *)intent;
          contact = startCallIntent.contacts.firstObject;
          isVideo = startCallIntent.callCapability == INCallCapabilityVideoCall;
        }
      }
      if (!contact) {
        // Deprecated in iOS 13 but we are more likely to get these.
        if ([intent isKindOfClass:[INStartAudioCallIntent class]]) {
          INStartAudioCallIntent *startCallIntent = (INStartAudioCallIntent *)intent;
          contact = startCallIntent.contacts.firstObject;
        } else {
          INStartVideoCallIntent *startCallIntent = (INStartVideoCallIntent *)intent;
          contact = startCallIntent.contacts.firstObject;
          isVideo = YES;
        }
      }
      NSString *callId = contact.personHandle.value;
      NSString *callName = [[NSUserDefaults standardUserDefaults] stringForKey:callId];
      if(!callName) {
        callName = callId;
      }
      NSDictionary *intentInfo = @{ @"callName" : callName, @"callId" : callId, @"isVideo" : isVideo?@YES:@NO};
      [[NSNotificationCenter defaultCenter] postNotificationName:@"RecentsCallNotification" object:intentInfo];
    }
  }

  return YES;
}

// Respond to Push Notifications
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  @try {
    [[Branch getInstance] handlePushNotification:userInfo];
  }
  @catch (NSException *exception) {
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:@"BSDKPostUnhandledURL" object:userInfo]];
  }
}

@end
