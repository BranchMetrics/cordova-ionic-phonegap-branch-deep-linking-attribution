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

@end
