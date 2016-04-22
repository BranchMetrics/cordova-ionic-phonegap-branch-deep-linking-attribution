//
//  BranchSDK.m
//  Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK
//
//  Copyright © 2016 Branch Metrics. All rights reserved.
//

#import "BranchSDK.h"

@implementation BranchSDK

- (void)pluginInitialize
{
    NSLog(@"start pluginInitialize");
    self.branchUniversalObjArray = [[NSMutableArray alloc] init];

    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(postUnhandledURL:) name:@"BSDKPostUnhandledURL" object:nil];
}

#pragma mark - Private APIs
#pragma mark - Global Instance Accessors

- (Branch *)getInstance
{
    NSLog(@"start getInstance");
    return [Branch getInstance];
}

- (Branch *)getInstance:(NSString *)branchKey
{
    NSLog(@"start getInstance with branchKey");
    if (branchKey) {
        return [Branch getInstance:branchKey];
    }
    else {
        return [Branch getInstance];
    }
}

- (Branch *)getTestInstance
{
    NSLog(@"start getTestInstance");
    return [Branch getTestInstance];
}

#pragma mark - Deep Linking Handlers

- (id)handleDeepLink:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start handleDeepLink");
    NSString *arg = [command.arguments objectAtIndex:0];
    NSURL *url = [NSURL URLWithString:arg];

    Branch *branch = [self getInstance];
    return [NSNumber numberWithBool:[branch handleDeepLink:url]];
}

- (void)continueUserActivity:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start continueUserActivity");

    NSString *activityType = (NSString *)[command.arguments objectAtIndex:0];
    NSDictionary *userInfo = (NSDictionary*)[command.arguments objectAtIndex:1];

    NSUserActivity *userActivity = [[NSUserActivity alloc] initWithActivityType:activityType];
    [userActivity setUserInfo:userInfo];

    Branch *branch = [self getInstance];

    NSLog(@"continuing user activity...");
    [branch continueUserActivity:userActivity];
}

#pragma mark - Public APIs
#pragma mark - Branch Basic Methods

- (void)initSession:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start initSession");
    Branch *branch = [self getInstance];

    [branch initSessionWithLaunchOptions:nil andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
        NSLog(@"inside initSessionAndRegisterDeepLinkHandler block");
        BOOL isFromUniversalLink = NO;
        NSString *resultString = nil;
        CDVPluginResult *pluginResult = nil;
        
        // NOTE: For Universal Links. Using clicked_branch_link key as condition at the moment to identify if block is run due to Universal Links.
        isFromUniversalLink = [[params objectForKey:@"+clicked_branch_link"] boolValue];
        
        if (!error) {
            if (params != nil && [params count] > 0 && isFromUniversalLink) {
                NSLog(@"Success");
                NSError *err;
                NSData *jsonData = [NSJSONSerialization dataWithJSONObject:params
                                                                   options:0
                                                                     error:&err];
                if (!jsonData) {
                    NSLog(@"Parsing Error: %@", [err localizedDescription]);
                    NSDictionary *errorDict = [NSDictionary dictionaryWithObjectsAndKeys:[err localizedDescription], @"error", nil];
                    NSData* errorJSON = [NSJSONSerialization dataWithJSONObject:errorDict
                                                                        options:NSJSONWritingPrettyPrinted
                                                                          error:&err];
                        
                    resultString = [[NSString alloc] initWithData:errorJSON encoding:NSUTF8StringEncoding];
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:resultString];
                } else {
                    NSLog(@"Success");
                    resultString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:params];
                }
            } else {
                NSLog(@"No data found");
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:FALSE];
            }
        }
        else {
            NSLog(@"Init Error: %@", [error localizedDescription]);
            
            // We create a JSON string result, because we're getting an error if we directly return a string result.
            NSDictionary *errorDict = [NSDictionary dictionaryWithObjectsAndKeys:[error localizedDescription], @"error", nil];
            NSData* errorJSON = [NSJSONSerialization dataWithJSONObject:errorDict
                                                                options:NSJSONWritingPrettyPrinted
                                                                  error:&error];
            
            resultString = [[NSString alloc] initWithData:errorJSON encoding:NSUTF8StringEncoding];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:resultString];
        }
        NSLog(@"returning data to js interface..");
        
        if (isFromUniversalLink) {
            NSLog(@"Sending to DeepLinkHandler: %@", resultString);
            [self.commandDelegate evalJs:[NSString stringWithFormat:@"DeepLinkHandler(%@)", resultString]];
        } else {
            NSLog(@"Command is nil");
        }
        
        if (command != nil) {
            [self.commandDelegate sendPluginResult: pluginResult callbackId: command.callbackId];
        }
    }];
}

- (void)setDebug:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start setDebug");
    bool enableDebug = [[command.arguments objectAtIndex:0] boolValue] == YES;
    if (enableDebug) {
        [[Branch getInstance] setDebug];
    }
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:enableDebug];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getAutoInstance:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start getAutoInstance");
    [self initSession:nil];
}

- (void)getLatestReferringParams:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start getLatestReferringParams");
    Branch *branch = [self getInstance];
    NSDictionary *sessionParams = [branch getLatestReferringParams];

    CDVPluginResult* pluginResult = nil;

    if (sessionParams != nil && [sessionParams count] > 0) {
        NSLog(@"Success");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:sessionParams];
    } else {
        NSLog(@"No data found");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:FALSE];
    }
    NSLog(@"returning data to js interface..");
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getFirstReferringParams:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start getFirstReferringParams");
    Branch *branch = [self getInstance];
    NSDictionary *installParams = [branch getFirstReferringParams];

    CDVPluginResult* pluginResult = nil;

    if (installParams != nil && [installParams count] > 0) {
        NSLog(@"Success");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:installParams];
    } else {
        NSLog(@"No data found");
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:FALSE];
    }
    NSLog(@"returning data to js interface..");
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setIdentity:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start setIdentity");
    Branch *branch = [self getInstance];

    [branch setIdentity:[command.arguments objectAtIndex:0] withCallback:^(NSDictionary *params, NSError *error) {
        NSLog(@"inside setIdentity block");
        CDVPluginResult* pluginResult = nil;
        if (!error) {
            // HURDLR CHANGE: I am having this plugin return a bool to be consistent with the setIdentity method and Java.
	    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:params];
        }
        else {
            NSLog(@"No data found");
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        }
        NSLog(@"returning data to js interface..");
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)registerDeepLinkController:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start registerDeepLinkController");
    UIViewController<BranchDeepLinkingController> *controller = (UIViewController<BranchDeepLinkingController>*)self.viewController;
    Branch *branch = [self getInstance];
    [branch registerDeepLinkController:controller forKey:[command.arguments objectAtIndex:0]];
}

- (void)userCompletedAction:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start userCompletedAction");
    NSString *name;
    NSDictionary *state;
    // if a state dictionary is passed as an argument
    if ([command.arguments count] == 2) {
        name = [command.arguments objectAtIndex:0];
        state = [command.arguments objectAtIndex:1];
    }
    else {
        name = (NSString *)command.arguments;
    }

    Branch *branch = [self getInstance];

    if (state) {
        [branch userCompletedAction:name withState:state];
    }
    else {
        [branch userCompletedAction:name];
    }
    
    // TODO: need to resolve according to result of userCompletedAction, but no callback version of the method is exposed.
    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: @"Success"];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)logout:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start logout");
    Branch *branch = [self getInstance];
    [branch logoutWithCallback:^(BOOL changed, NSError *error) {
        CDVPluginResult *pluginResult = nil;
        if (!error) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:changed];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
    self.branchUniversalObjArray = [[NSMutableArray alloc] init];
}

#pragma mark - Branch Referral Reward System

- (void)loadRewards:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start loadRewards");
    Branch *branch = [self getInstance];

    [branch loadRewardsWithCallback:^(BOOL changed, NSError *error) {
        NSLog(@"inside loadRewardsWithCallback block");
        CDVPluginResult* pluginResult = nil;
        if(!error) {
            int credits = (int)[branch getCredits];
            NSLog(@"Success");
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsInt:credits];
        }
        else {
            NSLog(@"Load Rewards Error: %@", [error localizedDescription]);
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        }
        NSLog(@"returning data to js interface..");
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)redeemRewards:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start redeemRewards");

    NSInteger amount = ((NSNumber *)[command.arguments objectAtIndex:0]).integerValue;
    Branch *branch = [self getInstance];

    if ([command.arguments count] == 2) {

        NSString *bucket = [command.arguments objectAtIndex:1];

        [branch redeemRewards:(NSInteger)amount forBucket:(NSString *)bucket callback:^(BOOL changed, NSError *error) {
            NSLog(@"inside redeemRewards:forBucket block");
            CDVPluginResult* pluginResult = nil;
            if (!error) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:changed];
            }
            else {
                NSLog(@"Redeem Rewards Error: %@", [error localizedDescription]);
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            }
            NSLog(@"returning data to js interface..");
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }];
    } else {
        [branch redeemRewards:amount callback:^(BOOL changed, NSError *error) {
            NSLog(@"inside redeemRewards block");
            CDVPluginResult* pluginResult = nil;
            if (!error) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:changed];
            }
            else {
                NSLog(@"Redeem Rewards Error: %@", [error localizedDescription]);
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
            }
            NSLog(@"returning data to js interface..");
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }];
    }
}

- (void)getCreditHistory:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start getCreditHistory");
    Branch *branch = [self getInstance];

    [branch getCreditHistoryWithCallback:^(NSArray *list, NSError *error) {
        NSLog(@"inside getCreditHistoryWithCallback block");
        CDVPluginResult* pluginResult = nil;
        if (!error) {
            NSLog(@"Success");
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:list];
        }
        else {
            NSLog(@"Credit History Error: %@", [error localizedDescription]);
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        }
        NSLog(@"returning data to js interface..");
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

#pragma mark - Branch Universal Object Methods

- (void)createBranchUniversalObject:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start createBranchUniversalObject");

    NSDictionary *properties = [command.arguments objectAtIndex:0];
    BranchUniversalObject *branchUniversalObj = [[BranchUniversalObject alloc] init];

    for (id key in properties) {
        if ([key isEqualToString:@"contentMetadata"]){
            NSDictionary *metadata = (NSDictionary *)[properties valueForKey:key];

            for (id key_ in metadata) {
                [branchUniversalObj addMetadataKey:key_ value:[metadata valueForKey:key_]];
            }
        }
        else if ([key isEqualToString:@"contentIndexingMode"]) {
            NSString *indexingMode = [properties valueForKey:key];
            // Default contentIndexMode is always public
            if ([indexingMode isEqualToString:@"private"]) {
                branchUniversalObj.contentIndexMode = ContentIndexModePrivate;
            }
            else {
                branchUniversalObj.contentIndexMode = ContentIndexModePublic;
            }
        }
        else if ([key isEqualToString:@"canonicalIdentifier"]) {
            branchUniversalObj.canonicalIdentifier = [properties valueForKey:key];
        }
        else if ([key isEqualToString:@"title"]) {
            branchUniversalObj.title = [properties valueForKey:key];
        }
        else if ([key isEqualToString:@"contentDescription"]) {
            branchUniversalObj.contentDescription = [properties valueForKey:key];
        }
        else if ([key isEqualToString:@"contentImageUrl"]){
            NSString *imageUrl = [properties valueForKey:key];
            branchUniversalObj.imageUrl = imageUrl;
        }
        else {
            [branchUniversalObj setValue:[properties objectForKey:key] forKey:key];
        }
    }

    NSLog(@"init BUO - %@", branchUniversalObj);
    [self.branchUniversalObjArray addObject:branchUniversalObj];
    NSNumber *branchUniversalObjectId = [[NSNumber alloc] initWithInteger:([self.branchUniversalObjArray count] - 1)];
    NSString *message = @"createBranchUniversalObject Success";
    NSDictionary *params = [[NSDictionary alloc] initWithObjectsAndKeys:message, @"message", branchUniversalObjectId, @"branchUniversalObjectId", nil];
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:params];
    NSLog(@"returning data to js interface..");
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)registerView:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start registerView");
    int branchUniversalObjectId = [[command.arguments objectAtIndex:0] intValue];
    
    BranchUniversalObject *branchUniversalObj = [self.branchUniversalObjArray objectAtIndex:branchUniversalObjectId];
    
    [branchUniversalObj registerViewWithCallback:^(NSDictionary *params, NSError *error) {
	CDVPluginResult* pluginResult = nil;
        if (!error) {
            NSLog(@"RegisterView Success");
            // HURDLR: note that this is inconsistent with Android, but we don't use it yet.
            // Ideally, we'd return true here if it was a success (Android returns boolean registered to its listener).
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:params];
        }
        else {
            NSLog(@"RegisterView Error: %@", [error localizedDescription]);
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        }
        NSLog(@"returning data to js interface..");
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)generateShortUrl:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start generateShortUrl");
    
    int branchUniversalObjectId = [[command.arguments objectAtIndex:0] intValue];
    NSDictionary *arg1 = [command.arguments objectAtIndex:1];
    NSDictionary *arg2 = [command.arguments objectAtIndex:2];
    
    BranchUniversalObject *branchUniversalObj = [self.branchUniversalObjArray objectAtIndex:branchUniversalObjectId];

    BranchLinkProperties *props = [[BranchLinkProperties alloc] init];

    for (id key in arg1) {
        if ([key isEqualToString:@"duration"]) {
            props.matchDuration = (NSUInteger)[((NSNumber *)[arg1 objectForKey:key]) integerValue];
        }
        else {
            [props setValue:[arg1 objectForKey:key] forKey:key];
        }
    }

    for (id key in arg2) {
        [props addControlParam:key withValue:[arg2 objectForKey:key]];
    }

    [branchUniversalObj getShortUrlWithLinkProperties:props andCallback:^(NSString *url, NSError *error) {
        NSLog(@"inside getShortUrlWithLinkProperties block");
        CDVPluginResult* pluginResult = nil;
        if (!error) {
            NSError *err;
            NSDictionary *jsonObj = [[NSDictionary alloc] initWithObjectsAndKeys:url, @"url", 0, @"options", &err, @"error", nil];

            if (!jsonObj) {
                NSLog(@"Parsing Error: %@", [err localizedDescription]);
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[err localizedDescription]];
            } else {
                NSLog(@"Success");
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:jsonObj];
            }
        }
        else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        }
        NSLog(@"returning data to js interface..");
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)showShareSheet:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start showShareSheet");
    NSString *shareText = @"Share Link";

    if ([command.arguments count] >= 4) {
        shareText = [command.arguments objectAtIndex:3];
    }
    
    int branchUniversalObjectId = [[command.arguments objectAtIndex:0] intValue];
    NSDictionary *arg1 = [command.arguments objectAtIndex:1];
    NSDictionary *arg2 = [command.arguments objectAtIndex:2];
    
    BranchUniversalObject *branchUniversalObj = [self.branchUniversalObjArray objectAtIndex:branchUniversalObjectId];

    BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];

    for (id key in arg1) {
        if ([key isEqualToString:@"duration"]) {
            linkProperties.matchDuration = (NSUInteger)[((NSNumber *)[arg1 objectForKey:key]) integerValue];
        }
        else {
            [linkProperties setValue:[arg1 objectForKey:key] forKey:key];
        }
    }

    for (id key in arg2) {
        [linkProperties addControlParam:key withValue:[arg1 objectForKey:key]];
    }

    [branchUniversalObj showShareSheetWithLinkProperties:linkProperties
                                                andShareText:shareText
                                                fromViewController:self.viewController
                                                completion:^(NSString *activityType, BOOL completed) {
        NSLog(@"showShareSheet is finished with activityType - %@", activityType);
    }];
}

- (void)listOnSpotlight:(CDVInvokedUrlCommand*)command {
    NSLog(@"start listOnSpotlight");
    int branchUniversalObjectId = [[command.arguments objectAtIndex:0] intValue];
    BranchUniversalObject *branchUniversalObj = [self.branchUniversalObjArray objectAtIndex:branchUniversalObjectId];
    [branchUniversalObj listOnSpotlightWithCallback:^(NSString *string, NSError *error) {
        NSLog(@"inside listOnSpotlightWithCallback block");
        CDVPluginResult* pluginResult = nil;
        if (!error) {
            NSError *err;
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:@{@"result":string}
                                                               options:0
                                                                 error:&err];
            if (!jsonData) {
                NSLog(@"Parsing Error: %@", [err localizedDescription]);
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[err localizedDescription]];
            } else {
                NSLog(@"Success");
                NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:jsonString];
            }
        }
        else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        }
        NSLog(@"returning data to js interface..");
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

#pragma mark - Private Methods
- (void)postUnhandledURL:(NSNotification *)notification {
    // We create a JSON string result, because we're unable to handle the url. We will include the url in the return string.
    NSError *error;
    NSString *urlString = [notification.object absoluteString];
    NSDictionary *returnDict = [NSDictionary dictionaryWithObjectsAndKeys:@"Unable to process URL", @"error", urlString, @"url", nil];
    NSData* returnJSON = [NSJSONSerialization dataWithJSONObject:returnDict
                                                         options:NSJSONWritingPrettyPrinted
                                                           error:&error];

    NSString *resultString = [[NSString alloc] initWithData:returnJSON encoding:NSUTF8StringEncoding];
    NSLog(@"Sending to NonBranchLinkHandler: %@", resultString);
    [self.commandDelegate evalJs:[NSString stringWithFormat:@"NonBranchLinkHandler(%@)", resultString]];
}

#pragma mark - URL Methods (not fully implemented YET!)

- (NSString *)getShortURL:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start getShortURL");
    Branch *branch = [self getInstance];
    return [branch getShortURL];
}

- (id)getShortURLWithParams:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start getShortURLWithParams");
    Branch *branch = [self getInstance];
    NSDictionary *params = [command.arguments objectAtIndex:0];

    return [branch getShortURLWithParams:params];
}

- (NSString *)getLongURLWithParams:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start getLongURLWithParams");
    id params = [command.arguments objectAtIndex:0];
    return [[self getInstance] getLongURLWithParams:params];
}

- (NSString *)getContentUrlWithParams:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start getLongURLWithParams");
    NSDictionary *params = [command.arguments objectAtIndex:0];
    NSString *channel = [command.arguments objectAtIndex:1];

    Branch *branch = [self getInstance];
    return [branch getContentUrlWithParams:params andChannel:channel];
}

- (void)getBranchActivityItemWithParams:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start getBranchActivityItemWithParams");
    UIActivityItemProvider *provider = [Branch getBranchActivityItemWithParams:[command.arguments objectAtIndex:0]];

    UIActivityViewController *shareViewController = [[UIActivityViewController alloc] initWithActivityItems:@[ provider ] applicationActivities:nil];

    [self.viewController presentViewController:shareViewController animated:YES completion:nil];
}

@end
