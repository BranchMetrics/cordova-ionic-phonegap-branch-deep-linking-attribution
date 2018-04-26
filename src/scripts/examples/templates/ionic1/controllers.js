angular
  .module("starter.controllers", [])

  .controller("DashCtrl", function($scope) {
    $scope.BranchShare = function() {
      var buo = {
        canonicalIdentifier: "content/123",
        canonicalUrl: "https://example.com/content/123",
        title: "Content 123 Title",
        contentDescription: "Content 123 Description " + Date.now(),
        contentImageUrl: "http://lorempixel.com/400/400/",
        price: 12.12,
        currency: "GBD",
        contentIndexingMode: "private",
        contentMetadata: {
          custom: "data",
          testing: 123,
          this_is: true
        }
      };

      Branch.createBranchUniversalObject(buo).then(function(res) {
        // optional fields
        var analytics = {
          channel: "facebook",
          feature: "onboarding",
          campaign: "content 123 launch",
          stage: "new user",
          tags: ["one", "two", "three"]
        };

        // optional fields
        var properties = {
          $desktop_url: "http://www.example.com/desktop",
          custom_string: "data",
          custom_integer: Date.now(),
          custom_boolean: true,
          custom_array: [1, 2, 3, 4, 5],
          custom_object: { random: "dictionary" }
        };

        var message = "Check out this link";

        // sharesheet
        res.showShareSheet(analytics, properties, message);
      });
    };
  })

  .controller("ChatsCtrl", function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller("ChatDetailCtrl", function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller("AccountCtrl", function($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
