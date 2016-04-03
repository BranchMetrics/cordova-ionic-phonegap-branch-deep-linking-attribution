//
//  BranchSDK.m
//  Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK
//
//  Copyright © 2016 Branch Metrics. All rights reserved.
//

#import "BranchSDK.h"

@implementation BranchSDK

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
        NSString *resultString;
        CDVPluginResult *pluginResult = nil;
        if (!error) {
            if (params != nil && [params count] > 0) {
                NSError *err;
                NSData *jsonData = [NSJSONSerialization dataWithJSONObject:params
                                                                     options:0
                                                                     error:&err];
                if (!jsonData) {
                    NSLog(@"Parsing Error: %@", [err localizedDescription]);
                    resultString = [NSString stringWithFormat:@"Parsing Error: %@", [err localizedDescription]];
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:resultString];
                } else {
                    NSLog(@"Success");
                    resultString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
                    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:params];
                }
            } else {
                NSLog(@"No data found");
                resultString = @"No data found";
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:resultString];
            }
        }
        else {
            NSLog(@"Init Error: %@", [error localizedDescription]);
            
            // We create a JSON string result, because we're getting an error if we directly return a string result.
            NSDictionary *errorDict = [NSDictionary dictionaryWithObjectsAndKeys:[error localizedDescription],@"error", nil];
            NSData* errorJSON = [NSJSONSerialization dataWithJSONObject:errorDict
                                                                options:NSJSONWritingPrettyPrinted
                                                                  error:&error];
            
            resultString = [[NSString alloc] initWithData:errorJSON encoding:NSUTF8StringEncoding];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:resultString];
        }
        NSLog(@"returning data to js interface..");
        if (command != nil) {
            NSLog(@"Sending to JS: %@", [params description]);
            [self.commandDelegate sendPluginResult: pluginResult callbackId: command.callbackId];
        } else {
            NSLog(@"Command is nil");
        }
        [self.commandDelegate evalJs:[NSString stringWithFormat:@"DeepLinkHandler(%@)", resultString]];
    }];
}

- (void)setDebug:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start setDebug");
    CDVPluginResult* pluginResult;
    bool enableDebug = [[command.arguments objectAtIndex:0] boolValue] == YES;
    if (enableDebug) {
        [[Branch getInstance] setDebug];
    }
    
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:enableDebug];
    
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getAutoInstance:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start setDebug");
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
            NSError *err;
            NSData *jsonData = [NSJSONSerialization dataWithJSONObject:params
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
            NSLog(@"No data found");
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Empty data"];
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
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"Success"];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        }
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
    self.branchUniversalObj = nil;
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
                NSNumber *changedValue = [NSNumber numberWithBool:changed];
                NSError *err;
                NSData *jsonData = [NSJSONSerialization dataWithJSONObject:@{@"changed":changedValue}
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
                NSNumber *changedValue = [NSNumber numberWithBool:changed];
                NSError *err;
                NSData *jsonData = [NSJSONSerialization dataWithJSONObject:@{@"changed":changedValue}
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
    self.branchUniversalObj = [[BranchUniversalObject alloc] init];

    for (id key in properties) {
        if ([key isEqualToString:@"contentMetadata"]){
            NSDictionary *metadata = (NSDictionary *)[properties valueForKey:key];

            for (id key_ in metadata) {
                [self.branchUniversalObj addMetadataKey:key_ value:[metadata valueForKey:key_]];
            }
        }
        else if ([key isEqualToString:@"contentIndexingMode"]) {
            NSString *indexingMode = [properties valueForKey:key];
            if ([indexingMode isEqualToString:@"private"]) {
                self.branchUniversalObj.contentIndexMode = ContentIndexModePrivate;

            }
            else if ([indexingMode isEqualToString:@"public"]){
                self.branchUniversalObj.contentIndexMode = ContentIndexModePublic;
            }
        }
        else if ([key isEqualToString:@"contentImageUrl"]){
            NSString *imageUrl = [properties valueForKey:key];
            self.branchUniversalObj.imageUrl = imageUrl;
        }
        else {
            [self.branchUniversalObj setValue:[properties objectForKey:key] forKey:key];
        }
    }

    NSLog(@"init BUO - %@", self.branchUniversalObj);
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"createBranchUniversalObject Success"];
    NSLog(@"returning data to js interface..");
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)initWithCanonicalIdentifier:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start initWithCanonicalIdentifier");
    if (!self.branchUniversalObj) {
        self.branchUniversalObj = [[BranchUniversalObject alloc] initWithCanonicalIdentifier:[command.arguments objectAtIndex:0]];
    }
    else {
        self.branchUniversalObj.canonicalIdentifier = [command.arguments objectAtIndex:0];
    }

    NSLog(@"init BUO - %@", self.branchUniversalObj);
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"createBranchUniversalObject Success"];
    NSLog(@"returning data to js interface..");
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)initWithTitle:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start initWithTitle");
    if (!self.branchUniversalObj){
        self.branchUniversalObj = [[BranchUniversalObject alloc] initWithTitle:[command.arguments objectAtIndex:0]];
    }
    else {
        self.branchUniversalObj.title = [command.arguments objectAtIndex:0];
    }

    NSLog(@"init BUO - %@", self.branchUniversalObj);
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"createBranchUniversalObject Success"];
    NSLog(@"returning data to js interface..");
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)addMetadata:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start addMetadata");
    NSDictionary *metadata = [command.arguments objectAtIndex:0];
    [self.branchUniversalObj addMetadataKey:[metadata objectForKey:@"key"] value:[metadata objectForKey:@"value"]];
}

- (void)registerView:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start registerView");
    [self.branchUniversalObj registerView];
}

- (void)generateShortUrl:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start generateShortUrl");
    NSDictionary *arg1 = [command.arguments objectAtIndex:1];
    NSDictionary *arg2 = [command.arguments objectAtIndex:2];

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
        [props addControlParam:key withValue:[arg1 objectForKey:key]];
    }

    [self.branchUniversalObj getShortUrlWithLinkProperties:props andCallback:^(NSString *url, NSError *error) {
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

    NSDictionary *arg1 = [command.arguments objectAtIndex:1];
    NSDictionary *arg2 = [command.arguments objectAtIndex:2];

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

    [self.branchUniversalObj showShareSheetWithLinkProperties:linkProperties
                                                andShareText:shareText
                                                fromViewController:self.viewController
                                                completion:^(NSString *activityType, BOOL completed) {
        NSLog(@"showShareSheet is finished with activityType - %@", activityType);
    }];
}

- (void)listOnSpotlight:(CDVInvokedUrlCommand*)command {
    [self.branchUniversalObj listOnSpotlightWithCallback:^(NSString *string, NSError *error) {
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
