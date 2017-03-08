# Developing the SDK Locally

*Questions? [Contact us](https://support.branch.io/support/tickets/new)*

1. [Dependencies](#dependencies)
1. [SDK](#sdk)
1. [Develop](#develop)
1. [Validate](#validate)
1. [Test](#test)
1. [Submit](#submit)

#

### Dependencies

> Homebrew

```sh
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
brew update;
brew doctor;
export PATH="/usr/local/bin:$PATH";
```

> Node

```sh
brew install node;
```

> Gulp

```sh
npm install -g gulp-cli;
```

### SDK

> Local

```sh
git clone git@github.com:BranchMetrics/cordova-ionic-phonegap-branch-deep-linking.git;
cd cordova-ionic-phonegap-branch-deep-linking;
rm -rf node_modules;
npm install --save-dev;
```

### Develop

> Changes to `/src` don't need a `init.sh` rebuild, just a `cordova run ios`

> **[optional]** Update [Android](https://github.com/BranchMetrics/android-branch-deep-linking/releases) and [iOS](https://github.com/BranchMetrics/ios-branch-deep-linking/releases) SDKs

```sh
./src/scripts/npm/updateNativeSdk.sh -a 2.5.9 -i 0.13.5
```

### Test

> Validate all features on both `iOS` and `Android` on `device` only (no `simulator` or `TestFlight`)

> ios

```sh
./testbed/init -idc
```
  
> android

```sh
./testbed/init -adc
```

### Submit

> **Required** [Semantic Release](https://github.com/semantic-release/semantic-release) comments `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`. Versioning handled automatically based on commit messages.

> Submit code with a [pull request](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking)

### Publish

> Code review from a Branch member. Merge will automatically add SDK to NPM.
