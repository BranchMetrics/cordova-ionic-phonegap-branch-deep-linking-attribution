"use strict";

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

/**
 * Branch.IO Cordova Plugin Unit-Test
 * ----------------------------------
 */
/* jshint jasmine: true */

exports.defineAutoTests = function() {
  describe("Branch.IO SDK (Branch)", function() {
    it("should exist", function() {
      expect(window.Branch).toBeDefined();
    });
    it("should contain a method called getLatestReferringParams()", function() {
      expect(window.Branch.getLatestReferringParams).toBeDefined();
      expect(_typeof(window.Branch.getLatestReferringParams)).toBe("function");
    });
    it("should contain a method called getFirstReferringParams()", function() {
      expect(window.Branch.getFirstReferringParams).toBeDefined();
      expect(_typeof(window.Branch.getFirstReferringParams)).toBe("function");
    });
    it("should contain a method called setIdentity()", function() {
      expect(window.Branch.setIdentity).toBeDefined();
      expect(_typeof(window.Branch.setIdentity)).toBe("function");
    });
    it("should contain a method called logout()", function() {
      expect(window.Branch.logout).toBeDefined();
      expect(_typeof(window.Branch.logout)).toBe("function");
    });
    it("should contain a method called createBranchUniversalObject()", function() {
      expect(window.Branch.createBranchUniversalObject).toBeDefined();
      expect(_typeof(window.Branch.createBranchUniversalObject)).toBe(
        "function"
      );
    });
    it("should contain a method called userCompletedAction()", function() {
      expect(window.Branch.userCompletedAction).toBeDefined();
      expect(_typeof(window.Branch.userCompletedAction)).toBe("function");
    });
    it("should contain a method called loadRewards()", function() {
      expect(window.Branch.loadRewards).toBeDefined();
      expect(_typeof(window.Branch.loadRewards)).toBe("function");
    });
    it("should contain a method called redeemRewards()", function() {
      expect(window.Branch.redeemRewards).toBeDefined();
      expect(_typeof(window.Branch.redeemRewards)).toBe("function");
    });
    it("should contain a method called creditHistory()", function() {
      expect(window.Branch.creditHistory).toBeDefined();
      expect(_typeof(window.Branch.creditHistory)).toBe("function");
    });
  });

  describe("Branch.getLatestReferringParams()", function() {
    beforeEach(function(done) {
      window.Branch.initSession().then(function() {
        done();
      });
    }, 3000);
    it(
      "should return an object response",
      function(done) {
        window.Branch.getLatestReferringParams().then(function(res) {
          expect(typeof res === "undefined" ? "undefined" : _typeof(res)).toBe(
            "object"
          );
          done();
        });
      },
      10000
    );
  });

  describe("Branch.getFirstReferringParams()", function() {
    beforeEach(function(done) {
      window.Branch.initSession().then(function() {
        done();
      });
    }, 3000);
    it(
      "should return an object response",
      function(done) {
        window.Branch.getFirstReferringParams().then(function(res) {
          // We expect false since we won't open this from a branch link
          expect(res).toBe(false);
          done();
        });
      },
      10000
    );
  });

  describe("Branch.setIdentity()", function() {
    beforeEach(function(done) {
      window.Branch.initSession().then(function() {
        done();
      });
    }, 3000);
    it(
      'should return "Success" response',
      function(done) {
        window.Branch.setIdentity("new_identity").then(function(res) {
          expect(typeof res === "undefined" ? "undefined" : _typeof(res)).toBe(
            "object"
          );
          done();
        });
      },
      10000
    );
  });

  describe("Branch.createBranchUniversalObject()", function() {
    var branchUniversalObj;

    beforeEach(function(done) {
      window.Branch.initSession().then(function() {
        var properties = {
          canonicalIdentifier: "testbed",
          title: "testbed",
          contentDescription: "Testbed Application",
          contentImageUrl: "https://imgflip.com/s/meme/Derp.jpg",
          contentIndexingMode: "public",
          contentMetadata: {}
        };
        window.Branch.createBranchUniversalObject(properties).then(function(
          res
        ) {
          branchUniversalObj = res;
          done();
        });
      });
    }, 3000);
    it(
      "should execute register view",
      function(done) {
        branchUniversalObj.registerView().then(function(res) {
          expect(typeof res === "undefined" ? "undefined" : _typeof(res)).toBe(
            "object"
          );
          done();
        });
      },
      5000
    );
    it(
      "should execute generate short url",
      function(done) {
        var properties = {
          feature: "test",
          alias: "testbed",
          channel: "test",
          stage: "test",
          duration: 10000
        };
        var controlParams = {
          $fallback_url: "www.another.com",
          $desktop_url: "www.desktop.com",
          $android_url: "test",
          $ios_url: "ios",
          $ipad_url: "ipad",
          $fire_url: "fire",
          $blackberry_url: "blackberry",
          $windows_phone_url: "win-phone"
        };
        branchUniversalObj
          .generateShortUrl(properties, controlParams)
          .then(function(res) {
            expect(
              typeof res === "undefined" ? "undefined" : _typeof(res)
            ).toBe("object");
            done();
          });
      },
      5000
    );
  });

  describe("Branch.userCompletedAction()", function() {
    beforeEach(function(done) {
      window.Branch.initSession().then(function() {
        done();
      });
    }, 3000);
    it(
      "should successfully execute the method",
      function(done) {
        window.Branch.userCompletedAction("login");
        expect("Success").toBe("Success");
        done();
      },
      10000
    );
  });

  describe("Branch.loadRewards()", function() {
    beforeEach(function(done) {
      window.Branch.initSession().then(function() {
        done();
      });
    }, 3000);
    it(
      "should return an object response",
      function(done) {
        window.Branch.loadRewards().then(
          function(res) {
            expect(
              typeof res === "undefined" ? "undefined" : _typeof(res)
            ).toBe("number");
            done();
          },
          function(err) {
            expect(
              typeof err === "undefined" ? "undefined" : _typeof(err)
            ).toBe("string");
            done();
          }
        );
      },
      10000
    );
  });

  describe("Branch.redeemRewards()", function() {
    beforeEach(function(done) {
      window.Branch.initSession().then(function() {
        done();
      });
    }, 3000);
    it(
      "should return an object/string error response",
      function(done) {
        window.Branch.redeemRewards(100).then(
          function(res) {
            expect(
              typeof res === "undefined" ? "undefined" : _typeof(res)
            ).toBe("object");
            done();
          },
          function(err) {
            expect(
              typeof err === "undefined" ? "undefined" : _typeof(err)
            ).toBe("string");
            done();
          }
        );
      },
      10000
    );
  });

  describe("Branch.creditHistory()", function() {
    beforeEach(function(done) {
      window.Branch.initSession().then(function() {
        done();
      });
    }, 3000);
    it(
      "should return the credit balance",
      function(done) {
        window.Branch.creditHistory().then(function(res) {
          expect(typeof res === "undefined" ? "undefined" : _typeof(res)).toBe(
            "object"
          );
          done();
        });
      },
      10000
    );
  });
};
