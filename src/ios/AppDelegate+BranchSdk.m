//
//  AppDelegate+BranchSdk.m
//  HelloCordova
//
//  Created by Harsha Bonthu on 3/9/16.
//
//

#import "AppDelegate.h"

#import "BranchNPM.h"

#ifdef BRANCH_NPM
    #import "Branch.h"
#else
    #import <Branch/Branch.h>
#endif

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
