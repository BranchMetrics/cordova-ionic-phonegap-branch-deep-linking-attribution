//
//  BranchSDK.m
//  Branch-TestBed
//
//  Created by Lysis on 1/14/16.
//  Copyright © 2016 Branch Metrics. All rights reserved.
//

#import "BranchSDK.h"
#import <Branch/Branch.h>
#import <Cordova/CDV.h>

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

- (void)setDebug:(id)args
{
    NSLog(@"start setDebug");
    [[Branch getInstance] setDebug];
}

#pragma mark Public APIs
#pragma mark - InitSession Permutation methods

- (void)initSession:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start initSession");
    Branch *branch = [self getInstance];

    [branch initSessionAndRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
        NSLog(@"inside initSessionAndRegisterDeepLinkHandler");
        CDVPluginResult* pluginResult = nil;
        if (!error) {
            if (params != nil && [params count] > 0) {
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
            } else {
                NSLog(@"No data found");
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Empty data"];
            }
        }
        else {
            NSLog(@"Init Error: %@", [error localizedDescription]);
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[error localizedDescription]];
        }
        NSLog(@"returning data to js interface..");
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

@end
