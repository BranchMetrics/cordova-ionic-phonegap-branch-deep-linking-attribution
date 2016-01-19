//
//  BranchSDK.h
//  Branch-TestBed
//
//  Created by Lysis on 1/14/16.
//  Copyright © 2016 Branch Metrics. All rights reserved.
//

#import <Cordova/CDV.h>

@interface BranchSDK : CDVPlugin

- (void)initSession:(CDVInvokedUrlCommand*)command;
- (void)setDebug:(CDVInvokedUrlCommand*)command;
- (void)getAutoInstance:(CDVInvokedUrlCommand*)command;
- (void)getLatestReferringParams:(CDVInvokedUrlCommand*)command;
- (void)getFirstReferringParams:(CDVInvokedUrlCommand*)command;
- (void)setIdentity:(CDVInvokedUrlCommand*)command;
- (void)registerDeepLinkController:(CDVInvokedUrlCommand*)command;
- (void)userCompletedAction:(CDVInvokedUrlCommand*)command;
- (void)logout:(CDVInvokedUrlCommand*)command;

@end
