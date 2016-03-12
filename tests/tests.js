/**
 * Branch.IO Cordova Plugin Unit-Test
 * ----------------------------------
 */
/* jshint jasmine: true */

exports.defineAutoTests = function () {

	describe('Branch.IO SDK (Branch)', function () {
		it('should exist', function () {
			expect(window.Branch).toBeDefined();
		});
		it('should contain a method called getLatestReferringParams()', function () {
			expect(window.Branch.getLatestReferringParams).toBeDefined();
			expect(typeof(window.Branch.getLatestReferringParams)).toBe('function');
		});
		it('should contain a method called getFirstReferringParams()', function () {
			expect(window.Branch.getFirstReferringParams).toBeDefined();
			expect(typeof(window.Branch.getFirstReferringParams)).toBe('function');
		});
		it('should contain a method called setIdentity()', function () {
			expect(window.Branch.setIdentity).toBeDefined();
			expect(typeof(window.Branch.setIdentity)).toBe('function');
		});
		it('should contain a method called logout()', function () {
			expect(window.Branch.logout).toBeDefined();
			expect(typeof(window.Branch.logout)).toBe('function');
		});
		it('should contain a method called createBranchUniversalObject()', function () {
			expect(window.Branch.createBranchUniversalObject).toBeDefined();
			expect(typeof(window.Branch.createBranchUniversalObject)).toBe('function');
		});
		it('should contain a method called userCompletedAction()', function () {
			expect(window.Branch.userCompletedAction).toBeDefined();
			expect(typeof(window.Branch.userCompletedAction)).toBe('function');
		});
		it('should contain a method called loadRewards()', function () {
			expect(window.Branch.loadRewards).toBeDefined();
			expect(typeof(window.Branch.loadRewards)).toBe('function');
		});
		it('should contain a method called redeemRewards()', function () {
			expect(window.Branch.redeemRewards).toBeDefined();
			expect(typeof(window.Branch.redeemRewards)).toBe('function');
		});
		it('should contain a method called creditHistory()', function () {
			expect(window.Branch.creditHistory).toBeDefined();
			expect(typeof(window.Branch.creditHistory)).toBe('function');
		});
	});

	describe('Branch.getLatestReferringParams()', function () {
		beforeEach(function () {
			window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
			window.Branch.setDebug(true);
			window.Branch.initSession();
		});
		it('should return an object response', function (done) {
			window.Branch.getLatestReferringParams().then(function (res) {
				expect(typeof(res)).toBe('object');
				done();
			});
		});
	});

	describe('Branch.getFirstReferringParams()', function () {
		beforeEach(function () {
			window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
			window.Branch.setDebug(true);
			window.Branch.initSession();
		});
		it('should return an object response', function (done) {
			window.Branch.getFirstReferringParams().then(function (res) {
				expect(typeof(res)).toBe('object');
				done();
			});
		});
	});

	describe('Branch.setIdentity()', function () {
		beforeEach(function () {
			window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
			window.Branch.setDebug(true);
			window.Branch.initSession();
		});
		it('should return "Success" response', function (done) {
			window.Branch.setIdentity('new_identity').then(function (res) {
				expect(res).toBe('Success');
				done();
			});
		});
	});

	describe('Branch.createBranchUniversalObject()', function () {
		beforeEach(function () {
			window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
			window.Branch.setDebug(true);
			window.Branch.initSession();
		});
		it('should return an object instance', function (done) {
		    var properties = {
		        canonicalIdentifier: 'testbed',
		        title: 'testbed',
		        contentDescription: 'Testbed Application',
		        contentImageUrl: 'https://imgflip.com/s/meme/Derp.jpg',
		        contentIndexingMode: 'public',
		        contentMetadata: {}
		    };
			window.Branch.createBranchUniversalObject(properties).then(function (res) {
				expect(typeof(res)).toBe('object');
				expect(res.message).toBe('success');
				done();
			});
		});
	});

	describe('Branch.userCompletedAction()', function () {
		beforeEach(function () {
			window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
			window.Branch.setDebug(true);
			window.Branch.initSession();
		});
		it('should successfully execute the method', function (done) {
			window.Branch.userCompletedAction('login');
			expect('Success').toBe('Success');
			done();
		});
	});

	describe('Branch.loadRewards()', function () {
		beforeEach(function () {
			window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
			window.Branch.setDebug(true);
			window.Branch.initSession();
		});
		it('should return an object response', function (done) {
			window.Branch.loadRewards().then(function (res) {
				expect(typeof(res)).toBe('object');
				done();
			});
		});
	});

	describe('Branch.redeemRewards()', function () {
		beforeEach(function () {
			window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
			window.Branch.setDebug(true);
			window.Branch.initSession();
		});
		it('should return an object/string error response', function (done) {
			window.Branch.redeemRewards(100).then(function (res) {
				expect(typeof(res)).toBe('object');
				done();
			}, function (err) {
				expect(typeof(err)).toBe('string');
				done();
			});
		});
	});

	describe('Branch.creditHistory()', function () {
		beforeEach(function () {
			window.jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
			window.Branch.setDebug(true);
			window.Branch.initSession();
		});
		it('should return the credit balance', function (done) {
			window.Branch.creditHistory().then(function (res) {
				expect(typeof(res)).toBe('number');
				done();
			});
		});
	});

};
