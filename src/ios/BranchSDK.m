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

#pragma mark Public APIs
#pragma mark - InitSession Permutation methods

- (void)initSession:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start initSession");
    Branch *branch = [self getInstance];

    [branch initSessionAndRegisterDeepLinkHandler:^(NSDictionary *params, NSError *error) {
        NSLog(@"inside initSessionAndRegisterDeepLinkHandler block");
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

- (void)setDebug:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start setDebug");
    [[Branch getInstance] setDebug];
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
        NSError *err;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:sessionParams
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
        NSError *err;
        NSData *jsonData = [NSJSONSerialization dataWithJSONObject:installParams
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
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Empty data"];
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
}

- (void)logout:(CDVInvokedUrlCommand*)command
{
    NSLog(@"start logout");
    Branch *branch = [self getInstance];
    [branch logout];
}

@end
