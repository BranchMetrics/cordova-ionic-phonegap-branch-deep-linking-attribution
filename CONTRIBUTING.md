# Development Conventions

This document outlines our development processes.

## ES6

Source code for all .js files in this project is written in es6 and then compiled via babel to es5. Unfortunately, for legacy reasons, the es5 needs to be stored in version control. As such, if you want to change a js file, edit the version in the corresponding .es6 directory, compile it with the `gulp babel` command, and then commit it as well as the resulting .js file.

## Pull Requests

All changes to this project should be made in the form of pull requests against master. Use snake-case prefixed by 'feat/' or 'fix/' for features/fixes. Feel free to use any of the commit types listed [here](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#type) as well. Note that when pull requests are merged in they will be automatically released to npm by (Travis CI)[https://travis-ci.org/] and (semantic-release)[https://github.com/semantic-release/semantic-release] so make sure to fully test.

## Commit Messages

Please format your commit messages to match [Angular's Conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines). These messages are parsed using semantic release to determine version numbers so it is important that you stick to them exactly. We recommend using the `npm run commit` script installed in this project to draft conformant messages.

## Linting

The style of all js files in this project are strictly checked using [jscs](http://jscs.info/) and [eslint](http://eslint.org/) before any pull request/release is made. You can manually check your local clone using the `gulp lint` command (don't forget to `nom install -g gulp` if you haven't already). Many problems can be automatically fixed by `gulp jscs-fix`. Don't forget to commit before running jscs-fix in case you end up needing to back out changes.

## Testing

See [tests-harness/README.md](https://github.com/BranchMetrics/cordova-ionic-phonegap-branch-deep-linking/blob/master/tests-harness/README.md) for details on how to run this project's test suite. Please run the test suite before merging any branches.

## Updating IOS dependencies

This project depends on [ios-branch-deep-linking](https://github.com/BranchMetrics/ios-branch-deep-linking). To upgrade that dependency a [release](https://github.com/BranchMetrics/ios-branch-deep-linking/releases) of it run the following script:

```shell
# <tag> is the name of the release. e,g, '0.12.5'
$ src/ios/dependencies/update.sh <tag>
```
