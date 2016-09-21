//
//  BranchSDK.h
//  Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK
//
//  Copyright © 2016 Branch Metrics. All rights reserved.
//

#import "BranchNPM.h"

#ifdef BRANCH_NPM
  #import "Branch.h"
  #import "BranchLinkProperties.h"
  #import "BranchUniversalObject.h"
#else
  #import <Branch/Branch.h>
  #import <Branch/BranchLinkProperties.h>
  #import <Branch/BranchUniversalObject.h>
#endif

#import <Cordova/CDV.h>

@interface BranchSDK : CDVPlugin

@property (copy) NSString *canonicalIdentifier;
@property (copy) NSString *title;
@property (copy) NSString *contentDescription;
@property (copy) NSString *imageUrl;
@property (copy) NSString *type;
@property (copy) NSArray *keywords;
@property (copy) NSDictionary *metadata;
@property (copy) NSDate *expirationDate;

@property (strong, nonatomic) NSMutableArray *branchUniversalObjArray;

// BranchSDK Basic Methods
- (void)initSession:(CDVInvokedUrlCommand*)command;
- (void)setMixpanelToken:(CDVInvokedUrlCommand*)command;
- (void)setDebug:(CDVInvokedUrlCommand*)command;
- (void)getAutoInstance:(CDVInvokedUrlCommand*)command;
- (void)getLatestReferringParams:(CDVInvokedUrlCommand*)command;
- (void)getFirstReferringParams:(CDVInvokedUrlCommand*)command;
- (void)setIdentity:(CDVInvokedUrlCommand*)command;
- (void)registerDeepLinkController:(CDVInvokedUrlCommand*)command;
- (void)userCompletedAction:(CDVInvokedUrlCommand*)command;
- (void)logout:(CDVInvokedUrlCommand*)command;

// Branch Referral Reward System
- (void)loadRewards:(CDVInvokedUrlCommand*)command;
- (void)redeemRewards:(CDVInvokedUrlCommand*)command;
- (void)getCreditHistory:(CDVInvokedUrlCommand*)command;

// Branch Universal Object Methods
- (void)createBranchUniversalObject:(CDVInvokedUrlCommand*)command;
- (void)registerView:(CDVInvokedUrlCommand*)command;
- (void)generateShortUrl:(CDVInvokedUrlCommand*)command;
- (void)showShareSheet:(CDVInvokedUrlCommand*)command;
- (void)onShareLinkDialogDismissed:(CDVInvokedUrlCommand*)command;
- (void)onLinkShareResponse:(CDVInvokedUrlCommand*)command;
- (void)listOnSpotlight:(CDVInvokedUrlCommand*)command;

@end
