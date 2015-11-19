//
//  AppDelegate+BNCDevice.h
//  Branch-SDK
//
//  Created by John Saleigh on 11/3/15.
//  Copyright (c) 2015 Branch Metrics. All rights reserved.
//

#import "AppDelegate.h"

@interface AppDelegate (BNCDevice)

- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler;

@end
