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

> Build

```sh
gulp prerelease;
```
  
> **[optional]** Update [iOS SDK](https://github.com/BranchMetrics/ios-branch-deep-linking/tags) (will need to update `plugin.xml` dependencies if new iOS files)

```sh
./src/ios/dependencies/update.sh 0.12.20;
```

### Test

> Modify `BRANCH_KEY` and `URI_SCHEME` and `config.xml` to values in [Branch Dashboard](https://dashboard.branch.io/settings/link)

```sh
gulp prerelease; cd testbed; npm install -g cordova; cordova platform remove ios; cordova platform remove android; cordova platform remove browser; cordova platform add ios; cordova platform add android; cordova plugin remove branch-cordova-sdk; cordova plugin add ../ --variable BRANCH_KEY=key_live_icCccJIpd7GlYY5oOmoEtpafuDiuyXhT --variable URI_SCHEME=enefftest;

gulp prod;
cd testbed;
npm uninstall mkpath node-version-compare plist xml2js;
rm -rf ../.installed;
rm -rf ./plugins;
rm -rf ./platforms;
cordova platform add ios;
cordova plugin add ../;
cordova build ios --developmentTeam="PW4Q8885U7";
open -a Xcode platforms/ios/Branch\ Testing.xcworkspace;

```
  
> Validate all features on both `iOS` and `Android` on `device` only (no `simulator` or `TestFlight`)

```sh
cordova build ios --developmentTeam="PW4Q8885U7"; open -a Xcode platforms/ios/Branch\ Testing.xcworkspace;
```

```sh
cordova build android; cordova run android;
chrome://inspect/#devices
```

> Test harnesses `TODO`

### Submit

> **Required** [Semantic Release](https://github.com/semantic-release/semantic-release) comments `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`

> Submit code with a [pull request](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking)
 
```sh
git checkout -b BRANCH_NAME;
git add FILE_NAME;
npm run commit;
git push origin BRANCH_NAME;
```

### Publish

> Update `CHANGELOG.md`
> Update version within plugin.template.xml
> Run `gulp prerelease`
> Merge Pull Request - code to NPM will happen automatically 


## Hooks

Don't need to `rebuild.sh`, just re-run `cordova build ios`