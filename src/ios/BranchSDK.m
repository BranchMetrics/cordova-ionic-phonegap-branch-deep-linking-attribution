#import "BranchSDK.h"

NSString * const pluginVersion = @"%BRANCH_PLUGIN_VERSION%";

@interface BranchSDK()

@property (strong, nonatomic) NSString *deepLinkUrl;

- (void)doShareLinkResponse:(int)callbackId sendResponse:(NSDictionary*)response;

@end

@implementation BranchSDK

- (void)pluginInitialize
{
  self.branchUniversalObjArray = [[NSMutableArray alloc] init];
  [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(handleOpenURLNotification:) name:CDVPluginHandleOpenURLNotification object:nil];
}

- (void)handleOpenURLNotification:(NSNotification*)notification
{
    NSURL* url = [notification object];
    [[Branch getInstance] application:[UIApplication sharedApplication]  openURL:url options:@{}];
}

#pragma mark - Private APIs
#pragma mark - Global Instance Accessors

- (Branch *)getInstance
{
  return [Branch getInstance];
}

- (Branch *)getInstance:(NSString *)branchKey
{
  if (branchKey) {
    return [Branch getInstance:branchKey];
  }
  else {
    return [Branch getInstance];
  }
}

- (Branch *)getTestInstance
{
  return [Branch getTestInstance];
}

#pragma mark - Deep Linking Handlers

- (id)handleDeepLink:(CDVInvokedUrlCommand*)command
{
  NSString *arg = [command.arguments objectAtIndex:0];
  NSURL *url = [NSURL URLWithString:arg];
  self.deepLinkUrl = [url absoluteString];

  return [NSNumber numberWithBool:[[Branch getInstance] handleDeepLink:url]];
}

- (id)handleDeepLinkWithNewSession:(CDVInvokedUrlCommand*)command
{
  NSString *arg = [command.arguments objectAtIndex:0];
  NSURL *url = [NSURL URLWithString:arg];
  self.deepLinkUrl = [url absoluteString];

  return [NSNumber numberWithBool:[[Branch getInstance] handleDeepLinkWithNewSession:url]];
}

- (void)continueUserActivity:(CDVInvokedUrlCommand*)command
{

  NSString *activityType = (NSString *)[command.arguments objectAtIndex:0];
  NSDictionary *userInfo = (NSDictionary*)[command.arguments objectAtIndex:1];

  NSUserActivity *userActivity = [[NSUserActivity alloc] initWithActivityType:activityType];
  [userActivity setUserInfo:userInfo];

  if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
    self.deepLinkUrl = [userActivity.webpageURL absoluteString];
  }

  [[Branch getInstance] continueUserActivity:userActivity];
}

#pragma mark - Public APIs
#pragma mark - Branch Basic Methods

- (void)enableTestMode:(CDVInvokedUrlCommand*)command
{
  [Branch setUseTestBranchKey:TRUE];
}

- (void)initSession:(CDVInvokedUrlCommand*)command
{
  [[Branch getInstance] registerPluginName:@"CordovaIonic" version:pluginVersion];
  [[Branch getInstance] initSessionWithLaunchOptions:nil andRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {

    NSString *resultString = nil;
    CDVPluginResult *pluginResult = nil;

    if (!error) {
      if (params != nil && [params count] > 0) {

        NSError *err;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:params options:0 error:&err];

        if (!jsonData) {
          NSLog(@"Parsing Error: %@", [err localizedDescription]);
          NSDictionary *errorDict = [NSDictionary dictionaryWithObjectsAndKeys:[err localizedDescription], @"error", nil];
          NSData* errorJSON = [NSJSONSerialization dataWithJSONObject:errorDict options:NSJSONWritingPrettyPrinted error:&err];

          resultString = [[NSString alloc] initWithData:errorJSON encoding:NSUTF8StringEncoding];
          pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:resultString];
        } else {
          resultString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
          pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:params];
        }
      }
    }
    else {
      NSLog(@"Init Error: %@", [error localizedDescription]);

      // We create a JSON string result, because we're getting an error if we directly return a string result.
      NSDictionary *errorDict = [NSDictionary dictionaryWithObjectsAndKeys:[error localizedDescription], @"error", nil];
      NSData* errorJSON = [NSJSONSerialization dataWithJSONObject:errorDict options:NSJSONWritingPrettyPrinted error:&error];

      resultString = [[NSString alloc] initWithData:errorJSON encoding:NSUTF8StringEncoding];
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:resultString];
    }

    if (command != nil) {
      [self.commandDelegate sendPluginResult: pluginResult callbackId: command.callbackId];
    }
  }];
}

- (void)setRequestMetadata:(CDVInvokedUrlCommand*)command
{

  [[Branch getInstance] setRequestMetadataKey:[command.arguments objectAtIndex:0] value:[command.arguments objectAtIndex:1]];

}

- (void)disableTracking:(CDVInvokedUrlCommand*)command
{

  bool enabled = [[command.arguments objectAtIndex:0] boolValue];
  [Branch setTrackingDisabled:enabled];

  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:enabled];

  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)enableLogging:(CDVInvokedUrlCommand*)command
{
  bool enableLogging = [[command.arguments objectAtIndex:0] boolValue];
  if (enableLogging) {
    [[Branch getInstance] enableLogging];
  }

  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:enableLogging];

  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getAutoInstance:(CDVInvokedUrlCommand*)command
{
  [self initSession:nil];
}

- (void)getLatestReferringParams:(CDVInvokedUrlCommand*)command
{
  Branch *branch = [self getInstance];
  NSDictionary *sessionParams = [branch getLatestReferringParams];

  CDVPluginResult* pluginResult = nil;

  if (sessionParams != nil && [sessionParams count] > 0) {
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:sessionParams];
  } else {
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:FALSE];
  }
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)getFirstReferringParams:(CDVInvokedUrlCommand*)command
{
  Branch *branch = [self getInstance];
  NSDictionary *installParams = [branch getFirstReferringParams];

  CDVPluginResult* pluginResult = nil;

  if (installParams != nil && [installParams count] > 0) {
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:installParams];
  } else {
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:FALSE];
  }
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)setIdentity:(CDVInvokedUrlCommand*)command
{
  Branch *branch = [self getInstance];

  [branch setIdentity:[command.arguments objectAtIndex:0] withCallback:^(NSDictionary *params, NSError *error) {

    CDVPluginResult* pluginResult = nil;
    if (!error) {
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:params];
    }
    else {
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  }];
}

- (void)registerDeepLinkController:(CDVInvokedUrlCommand*)command
{
  UIViewController<BranchDeepLinkingController> *controller = (UIViewController<BranchDeepLinkingController>*)self.viewController;
  Branch *branch = [self getInstance];
  [branch registerDeepLinkController:controller forKey:[command.arguments objectAtIndex:0]];
}

- (void)userCompletedAction:(CDVInvokedUrlCommand*)command
{
  NSString *name;
  NSDictionary *state;

  // if a state dictionary is passed as an argument
  if ([command.arguments count] == 2) {
    name = [command.arguments objectAtIndex:0];
    state = [command.arguments objectAtIndex:1];
  }
  else {
    name = [command.arguments objectAtIndex:0];
  }

  Branch *branch = [self getInstance];

  if (state) {
    [branch userCompletedAction:name withState:state];
  }
  else {
    [branch userCompletedAction:name];
  }

  // TODO: iOS Branch.userCompletedAction needs a callback for success or failure
  CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: @"Success"];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

-(void)sendBranchEvent:(CDVInvokedUrlCommand*)command
{
    NSString *eventName = [command.arguments objectAtIndex:0];
    NSDictionary *metadata;
    if ([command.arguments count] == 2) {
        metadata = [command.arguments objectAtIndex:1];
    }
    BranchEvent *event = [BranchEvent customEventWithName:eventName];
    for (id key in metadata) {
        if ([key isEqualToString:@"transactionID"]) {
            event.transactionID = [metadata objectForKey:key];
        }
        else if ([key isEqualToString:@"currency"]) {
            event.currency = [metadata objectForKey:key];
        }
        else if ([key isEqualToString:@"shipping"]) {
            NSString *value = ([[metadata objectForKey:key] isKindOfClass:[NSString class]]) ? [metadata objectForKey:key] : [[metadata objectForKey:key] stringValue];
            event.shipping = [NSDecimalNumber decimalNumberWithString:value];
        }
        else if ([key isEqualToString:@"tax"]) {
            NSString *value = ([[metadata objectForKey:key] isKindOfClass:[NSString class]]) ? [metadata objectForKey:key] : [[metadata objectForKey:key] stringValue];
            event.tax = [NSDecimalNumber decimalNumberWithString:value];
        }
        else if ([key isEqualToString:@"coupon"]) {
            event.coupon = [metadata objectForKey:key];
        }
        else if ([key isEqualToString:@"affiliation"]) {
            event.affiliation = [metadata objectForKey:key];
        }
        else if ([key isEqualToString:@"eventDescription"]) {
            event.eventDescription = [metadata objectForKey:key];
        }
        else if ([key isEqualToString:@"revenue"]) {
            NSString *value = ([[metadata objectForKey:key] isKindOfClass:[NSString class]]) ? [metadata objectForKey:key] : [[metadata objectForKey:key] stringValue];
            event.revenue = [NSDecimalNumber decimalNumberWithString:value];
        }
        else if ([key isEqualToString:@"searchQuery"]) {
            event.searchQuery = [metadata objectForKey:key];
        }
        else if ([key isEqualToString:@"description"]) {
            event.eventDescription = [metadata objectForKey:key];
        }
        else if ([key isEqualToString:@"customerEventAlias"]) {
            event.alias = [metadata objectForKey:key];
        }
        else if ([key isEqualToString:@"customData"] && [[metadata objectForKey:key] isKindOfClass:[NSMutableDictionary class]]) {
            event.customData = [metadata objectForKey:key];
        }
        else if ([key isEqualToString:@"contentMetadata"]){
             NSMutableArray *mArray = [[NSMutableArray alloc]init];

             for (NSDictionary *dataDictionary in [metadata objectForKey:key]){
                 BranchUniversalObject *contentItem = [BranchUniversalObject objectWithDictionary:(dataDictionary)];
                 [mArray addObject:contentItem];
             }
             event.contentItems = [mArray copy];
        }
    }
    [event logEvent];
}


- (void)logout:(CDVInvokedUrlCommand*)command
{
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

- (void)delayInitToCheckForSearchAds:(CDVInvokedUrlCommand*)command
{
  bool enabled = [[command.arguments objectAtIndex:0] boolValue];
  if (enabled) {
    [[Branch getInstance] delayInitToCheckForSearchAds];
  }

  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:enabled];

  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

#pragma mark - Branch Universal Object Methods

- (void)createBranchUniversalObject:(CDVInvokedUrlCommand*)command
{
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
        branchUniversalObj.contentIndexMode = BranchContentIndexModePrivate;
      }
      else {
        branchUniversalObj.contentIndexMode = BranchContentIndexModePublic;
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

  // [self.branchUniversalObjArray addObject:branchUniversalObj];

  // Instantiate callback ids
  NSMutableDictionary *branchUniversalObjDict = [NSMutableDictionary dictionaryWithDictionary:@{
                                                                                                @"branchUniversalObj": branchUniversalObj,
                                                                                                @"onShareSheetDismissed": command.callbackId,
                                                                                                @"onShareSheetLaunched": command.callbackId,
                                                                                                @"onLinkShareResponse": command.callbackId,
                                                                                                @"onChannelSelected": command.callbackId
                                                                                                }];
  [self.branchUniversalObjArray addObject:branchUniversalObjDict];

  NSNumber *branchUniversalObjectId = [[NSNumber alloc] initWithInteger:([self.branchUniversalObjArray count] - 1)];
  NSString *message = @"createBranchUniversalObject Success";
  NSDictionary *params = [[NSDictionary alloc] initWithObjectsAndKeys:message, @"message", branchUniversalObjectId, @"branchUniversalObjectId", nil];

  CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:params];
  [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}

- (void)registerView:(CDVInvokedUrlCommand*)command
{
  int branchUniversalObjectId = [[command.arguments objectAtIndex:0] intValue];

  NSMutableDictionary *branchUniversalObjDict = [self.branchUniversalObjArray objectAtIndex:branchUniversalObjectId];
  BranchUniversalObject *branchUniversalObj = [branchUniversalObjDict objectForKey:@"branchUniversalObj"];

  [branchUniversalObj registerViewWithCallback:^(NSDictionary *params, NSError *error) {
    CDVPluginResult *pluginResult = nil;
    if (!error) {
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:params];
    } else {
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  }];
}

- (void)generateShortUrl:(CDVInvokedUrlCommand*)command
{

  int branchUniversalObjectId = [[command.arguments objectAtIndex:0] intValue];
  NSDictionary *arg1 = [command.arguments objectAtIndex:1];
  NSDictionary *arg2 = [command.arguments objectAtIndex:2];

  NSMutableDictionary *branchUniversalObjDict = [self.branchUniversalObjArray objectAtIndex:branchUniversalObjectId];
  BranchUniversalObject *branchUniversalObj = [branchUniversalObjDict objectForKey:@"branchUniversalObj"];

  BranchLinkProperties *props = [[BranchLinkProperties alloc] init];

  for (id key in arg1) {
    if ([key isEqualToString:@"duration"]) {
      props.matchDuration = (NSUInteger)[((NSNumber *)[arg1 objectForKey:key]) integerValue];
    }
    else if ([key isEqualToString:@"feature"]) {
      props.feature = [arg1 objectForKey:key];
    }
    else if ([key isEqualToString:@"stage"]) {
      props.stage = [arg1 objectForKey:key];
    }
    else if ([key isEqualToString:@"campaign"]) {
      props.campaign = [arg1 objectForKey:key];
    }
    else if ([key isEqualToString:@"alias"]) {
      props.alias = [arg1 objectForKey:key];
    }
    else if ([key isEqualToString:@"channel"]) {
      props.channel = [arg1 objectForKey:key];
    }
    else if ([key isEqualToString:@"tags"] && [[arg1 objectForKey:key] isKindOfClass:[NSArray class]]) {
      props.tags = [arg1 objectForKey:key];
    }
  }
  if (arg2) {
    for (id key in arg2) {
      [props addControlParam:key withValue:[arg2 objectForKey:key]];
    }
  }

  [branchUniversalObj getShortUrlWithLinkProperties:props andCallback:^(NSString *url, NSError *error) {
    CDVPluginResult* pluginResult = nil;

    if (url) {
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
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  }];
}

- (void)showShareSheet:(CDVInvokedUrlCommand*)command
{
  NSString *shareText = @"Share Link";

  if ([command.arguments count] >= 4) {
    shareText = [command.arguments objectAtIndex:3];
  }

  int branchUniversalObjectId = [[command.arguments objectAtIndex:0] intValue];
  NSDictionary *arg1 = [command.arguments objectAtIndex:1];
  NSDictionary *arg2 = [command.arguments objectAtIndex:2];

  NSMutableDictionary *branchUniversalObjDict = [self.branchUniversalObjArray objectAtIndex:branchUniversalObjectId];
  BranchUniversalObject *branchUniversalObj = [branchUniversalObjDict objectForKey:@"branchUniversalObj"];

  BranchLinkProperties *linkProperties = [[BranchLinkProperties alloc] init];

  for (id key in arg1) {
    if ([key isEqualToString:@"duration"]) {
      linkProperties.matchDuration = (NSUInteger)[((NSNumber *)[arg1 objectForKey:key]) integerValue];
    }
    else {
      [linkProperties setValue:[arg1 objectForKey:key] forKey:key];
    }
  }

  if (arg2) {
    for (id key in arg2) {
      [linkProperties addControlParam:key withValue:[arg2 objectForKey:key]];
    }
  }

  [branchUniversalObj showShareSheetWithLinkProperties:linkProperties andShareText:shareText fromViewController:self.viewController completion:^(NSString *activityType, BOOL completed) {

    int listenerCallbackId = [[command.arguments objectAtIndex:0] intValue];

    if (completed) {
      NSLog(@"Share link complete");
      [branchUniversalObj getShortUrlWithLinkProperties:linkProperties andCallback:^(NSString *url, NSError *error) {
        if (!error) {
          NSDictionary *response = [[NSDictionary alloc] initWithObjectsAndKeys:url, @"sharedLink", activityType, @"sharedChannel", nil];
          [self doShareLinkResponse:listenerCallbackId sendResponse:response];
        }
      }];
    }

    CDVPluginResult *shareDialogDismissed = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];

    NSMutableDictionary *branchUniversalObjDict = [self.branchUniversalObjArray objectAtIndex:listenerCallbackId];

    [shareDialogDismissed setKeepCallbackAsBool:TRUE];

    [self.commandDelegate sendPluginResult:shareDialogDismissed callbackId:[branchUniversalObjDict objectForKey:@"onShareSheetDismissed"]];
  }];
}

- (void)doShareLinkResponse:(int)callbackId sendResponse:(NSDictionary*)response {
  CDVPluginResult *linkShareResponse = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
  NSMutableDictionary *branchUniversalObjDict = [self.branchUniversalObjArray objectAtIndex:callbackId];

  [linkShareResponse setKeepCallbackAsBool:TRUE];

  [self.commandDelegate sendPluginResult:linkShareResponse callbackId:[branchUniversalObjDict objectForKey:@"onLinkShareResponse"]];
}

- (void)onShareLinkDialogDismissed:(CDVInvokedUrlCommand*)command
{
  int listenerCallbackId = [[command.arguments objectAtIndex:0] intValue];

  NSMutableDictionary *newBranchUniversalObjDict = [self.branchUniversalObjArray objectAtIndex:listenerCallbackId];
  [newBranchUniversalObjDict setObject:command.callbackId forKey:@"onShareSheetDismissed"];

  [self.branchUniversalObjArray replaceObjectAtIndex:listenerCallbackId withObject:newBranchUniversalObjDict];
}

- (void)onLinkShareResponse:(CDVInvokedUrlCommand*)command
{
  int listenerCallbackId = [[command.arguments objectAtIndex:0] intValue];

  NSMutableDictionary *newBranchUniversalObjDict = [self.branchUniversalObjArray objectAtIndex:listenerCallbackId];
  [newBranchUniversalObjDict setObject:command.callbackId forKey:@"onLinkShareResponse"];

  [self.branchUniversalObjArray replaceObjectAtIndex:listenerCallbackId withObject:newBranchUniversalObjDict];
}

- (void)listOnSpotlight:(CDVInvokedUrlCommand*)command {
  int branchUniversalObjectId = [[command.arguments objectAtIndex:0] intValue];

  NSMutableDictionary *branchUniversalObjDict = [self.branchUniversalObjArray objectAtIndex:branchUniversalObjectId];
  BranchUniversalObject *branchUniversalObj = [branchUniversalObjDict objectForKey:@"branchUniversalObj"];

  [branchUniversalObj listOnSpotlightWithCallback:^(NSString *string, NSError *error) {
    CDVPluginResult* pluginResult = nil;
    if (!error) {
      NSError *err;
      NSData *jsonData = [NSJSONSerialization dataWithJSONObject:@{@"result":string} options:0 error:&err];
      if (!jsonData) {
        NSLog(@"Parsing Error: %@", [err localizedDescription]);
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[err localizedDescription]];
      } else {
        NSString *jsonString = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:jsonString];
      }
    }
    else {
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  }];
}

#pragma mark Branch Query Methods

- (void)crossPlatformIds:(CDVInvokedUrlCommand *)command {
  NSMutableDictionary *json = [NSMutableDictionary new];

  Branch *branch = [self getInstance];
  [branch crossPlatformIdDataWithCompletion:^(BranchCrossPlatformID *cpid) {
    CDVPluginResult* pluginResult = nil;
    if (cpid) {
      // Convert the ObjC object back into JSON.  Should have kept the raw JSON response.
      [json setObject:cpid.developerID forKey:@"developer_identity"];
      [json setObject:cpid.crossPlatformID forKey:@"cross_platform_id"];
      [json setObject:cpid.pastCrossPlatformIDs forKey:@"past_cross_platform_ids"];

      NSMutableArray *probCPIDs = [NSMutableArray new];
      for (BranchProbabilisticCrossPlatformID *tmp in cpid.probabiliticCrossPlatformIDs) {
        if (tmp.crossPlatformID && tmp.score) {
          NSMutableDictionary *pair = [NSMutableDictionary new];
          [pair setObject:tmp.crossPlatformID forKey:@"id"];
          [pair setObject:tmp.score forKey:@"probability"];
          [probCPIDs addObject:pair];
        }
      }
      [json setObject:probCPIDs forKey:@"prob_cross_platform_ids"];

      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:json];
    } else {
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"No CPIDs available"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  }];
}

- (void)lastAttributedTouchData:(CDVInvokedUrlCommand *)command {
  NSMutableDictionary *json = [NSMutableDictionary new];

  Branch *branch = [self getInstance];
  [branch lastAttributedTouchDataWithAttributionWindow:30 completion:^(BranchLastAttributedTouchData * _Nullable latd, NSError * _Nullable error) {
    CDVPluginResult* pluginResult = nil;
    if (latd) {
      [json setObject:latd.attributionWindow forKey:@"attribution_window"];
      [json setObject:latd.lastAttributedTouchJSON forKey:@"last_attributed_touch_data"];

      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:json];
    } else {
      pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"No LATD available"];
    }
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
  }];
}

- (void)getBranchQRCode:(CDVInvokedUrlCommand*)command
{
    int branchUniversalObjectId = [[command.arguments objectAtIndex:1] intValue];
    NSMutableDictionary *branchUniversalObjDict = [self.branchUniversalObjArray objectAtIndex:branchUniversalObjectId];
    BranchUniversalObject *branchUniversalObj = [branchUniversalObjDict objectForKey:@"branchUniversalObj"];

    BranchLinkProperties *linkProperties = [BranchLinkProperties new];
    
    NSDictionary *arg1 = [command.arguments objectAtIndex:2];
    NSDictionary *arg2 = [command.arguments objectAtIndex:3];

    for (id key in arg1) {
      if ([key isEqualToString:@"duration"]) {
        linkProperties.matchDuration = (NSUInteger)[((NSNumber *)[arg1 objectForKey:key]) integerValue];
      }
      else if ([key isEqualToString:@"feature"]) {
        linkProperties.feature = [arg1 objectForKey:key];
      }
      else if ([key isEqualToString:@"stage"]) {
        linkProperties.stage = [arg1 objectForKey:key];
      }
      else if ([key isEqualToString:@"campaign"]) {
        linkProperties.campaign = [arg1 objectForKey:key];
      }
      else if ([key isEqualToString:@"alias"]) {
        linkProperties.alias = [arg1 objectForKey:key];
      }
      else if ([key isEqualToString:@"channel"]) {
        linkProperties.channel = [arg1 objectForKey:key];
      }
      else if ([key isEqualToString:@"tags"] && [[arg1 objectForKey:key] isKindOfClass:[NSArray class]]) {
        linkProperties.tags = [arg1 objectForKey:key];
      }
    }
    if (arg2) {
      for (id key in arg2) {
        [linkProperties addControlParam:key withValue:[arg2 objectForKey:key]];
      }
    }

    NSMutableDictionary *qrCodeSettingsMap = [command.arguments objectAtIndex:0];

    BranchQRCode *qrCode = [BranchQRCode new];
    
    if (qrCodeSettingsMap[@"codeColor"]) {
        qrCode.codeColor = [self colorWithHexString:qrCodeSettingsMap[@"codeColor"]];
    }
    if (qrCodeSettingsMap[@"backgroundColor"]) {
        qrCode.backgroundColor = [self colorWithHexString:qrCodeSettingsMap[@"backgroundColor"]];
    }
    if (qrCodeSettingsMap[@"centerLogo"]) {
        qrCode.centerLogo = qrCodeSettingsMap[@"centerLogo"];
    }
    if (qrCodeSettingsMap[@"width"]) {
        qrCode.width = qrCodeSettingsMap[@"width"];
    }
    if (qrCodeSettingsMap[@"margin"]) {
        qrCode.margin = qrCodeSettingsMap[@"margin"];
    }
    if (qrCodeSettingsMap[@"imageFormat"]) {
        if ([qrCodeSettingsMap[@"imageFormat"] isEqual:@"JPEG"]) {
            qrCode.imageFormat = BranchQRCodeImageFormatJPEG;
        } else {
            qrCode.imageFormat = BranchQRCodeImageFormatPNG;
        }
    }

    [qrCode getQRCodeAsData:branchUniversalObj linkProperties:linkProperties completion:^(NSData * _Nonnull qrCodeData, NSError * _Nonnull error) {
      CDVPluginResult* pluginResult = nil;
        
        if (!error) {
            NSString* imageString = [qrCodeData base64EncodedStringWithOptions:nil];
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:imageString];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        }

        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (UIColor *) colorWithHexString: (NSString *) hexString {
    NSString *colorString = [[hexString stringByReplacingOccurrencesOfString: @"#" withString: @""] uppercaseString];
    CGFloat alpha, red, blue, green;
    switch ([colorString length]) {
        case 3: // #RGB
            alpha = 1.0f;
            red   = [self colorComponentFrom: colorString start: 0 length: 1];
            green = [self colorComponentFrom: colorString start: 1 length: 1];
            blue  = [self colorComponentFrom: colorString start: 2 length: 1];
            break;
        case 4: // #ARGB
            alpha = [self colorComponentFrom: colorString start: 0 length: 1];
            red   = [self colorComponentFrom: colorString start: 1 length: 1];
            green = [self colorComponentFrom: colorString start: 2 length: 1];
            blue  = [self colorComponentFrom: colorString start: 3 length: 1];          
            break;
        case 6: // #RRGGBB
            alpha = 1.0f;
            red   = [self colorComponentFrom: colorString start: 0 length: 2];
            green = [self colorComponentFrom: colorString start: 2 length: 2];
            blue  = [self colorComponentFrom: colorString start: 4 length: 2];                      
            break;
        case 8: // #AARRGGBB
            alpha = [self colorComponentFrom: colorString start: 0 length: 2];
            red   = [self colorComponentFrom: colorString start: 2 length: 2];
            green = [self colorComponentFrom: colorString start: 4 length: 2];
            blue  = [self colorComponentFrom: colorString start: 6 length: 2];                      
            break;
        default:
            NSLog(@"Error: Invalid color value. It should be a hex value of the form #RBG, #ARGB, #RRGGBB, or #AARRGGBB");
            break;
    }
    return [UIColor colorWithRed: red green: green blue: blue alpha: alpha];
}

- (CGFloat) colorComponentFrom: (NSString *) string start: (NSUInteger) start length: (NSUInteger) length {
    NSString *substring = [string substringWithRange: NSMakeRange(start, length)];
    NSString *fullHex = length == 2 ? substring : [NSString stringWithFormat: @"%@%@", substring, substring];
    unsigned hexComponent;
    [[NSScanner scannerWithString: fullHex] scanHexInt: &hexComponent];
    return hexComponent / 255.0;
}

#pragma mark - URL Methods (not fully implemented YET!)

- (NSString *)getShortURL:(CDVInvokedUrlCommand*)command
{
  Branch *branch = [self getInstance];
  return [branch getShortURL];
}

- (id)getShortURLWithParams:(CDVInvokedUrlCommand*)command
{
  Branch *branch = [self getInstance];
  NSDictionary *params = [command.arguments objectAtIndex:0];

  return [branch getShortURLWithParams:params];
}

- (NSString *)getLongURLWithParams:(CDVInvokedUrlCommand*)command
{
  id params = [command.arguments objectAtIndex:0];
  return [[self getInstance] getLongURLWithParams:params];
}

- (void)getBranchActivityItemWithParams:(CDVInvokedUrlCommand*)command
{
  UIActivityItemProvider *provider = [Branch getBranchActivityItemWithParams:[command.arguments objectAtIndex:0]];

  UIActivityViewController *shareViewController = [[UIActivityViewController alloc] initWithActivityItems:@[ provider ] applicationActivities:nil];

  [self.viewController presentViewController:shareViewController animated:YES completion:nil];
}

@end
