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
- (void)enableTestMode:(CDVInvokedUrlCommand*)command;
- (void)initSession:(CDVInvokedUrlCommand*)command;
- (void)disableTracking:(CDVInvokedUrlCommand*)command;
- (void)enableLogging:(CDVInvokedUrlCommand*)command;
- (void)getAutoInstance:(CDVInvokedUrlCommand*)command;
- (void)getLatestReferringParams:(CDVInvokedUrlCommand*)command;
- (void)getFirstReferringParams:(CDVInvokedUrlCommand*)command;
- (void)setIdentity:(CDVInvokedUrlCommand*)command;
- (void)registerDeepLinkController:(CDVInvokedUrlCommand*)command;
- (void)userCompletedAction:(CDVInvokedUrlCommand*)command;
- (void)logout:(CDVInvokedUrlCommand*)command;
- (void)delayInitToCheckForSearchAds:(CDVInvokedUrlCommand*)command;

// Branch Universal Object Methods
- (void)createBranchUniversalObject:(CDVInvokedUrlCommand*)command;
- (void)registerView:(CDVInvokedUrlCommand*)command;
- (void)generateShortUrl:(CDVInvokedUrlCommand*)command;
- (void)showShareSheet:(CDVInvokedUrlCommand*)command;
- (void)onShareLinkDialogDismissed:(CDVInvokedUrlCommand*)command;
- (void)onLinkShareResponse:(CDVInvokedUrlCommand*)command;
- (void)listOnSpotlight:(CDVInvokedUrlCommand*)command;

// Branch Query Methods
- (void)crossPlatformIds:(CDVInvokedUrlCommand *)command;
- (void)lastAttributedTouchData:(CDVInvokedUrlCommand *)command;

@end
