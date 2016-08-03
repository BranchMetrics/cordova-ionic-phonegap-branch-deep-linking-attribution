# Development Conventions

This document outlines our development processes.

## Git Flow

We use the [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/) branching model for this project. We recommend installing the [git flow tool](https://github.com/nvie/gitflow/wiki/Installation) and github's [commandline](https://hub.github.com/) and [desktop](https://desktop.github.com/) suites.

Please issue github pull requests against develop instead of merging features directly in.

## Commit Messages

Please format your commit messages to match [Angular's Conventions](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines). These messages are parsed using semantic release to determine version numbers so it is important that you stick to them exactly. We recommend using the `npm run commit` script installed in this project to draft conformant messages.

## Linting

The style of all js files in this project are strictly checked using [jscs](http://jscs.info/) and [eslint](http://eslint.org/) before any pull request/release is made. You can manually check your local clone using the `gulp lint` command (don't forget to `nom install -g gulp` if you haven't already). Many problems can be automatically fixed by `gulp jscs-fix`. Don't forget to commit before running jscs-fix in case you want to back out changes.

## Testing



## Updating IOS dependencies

This project depends on [ios-branch-deep-linking](https://github.com/BranchMetrics/ios-branch-deep-linking). To upgrade that dependency a [release](https://github.com/BranchMetrics/ios-branch-deep-linking/releases) of it run the following script:

```shell
# <tag> is the name of the release. e,g, '0.12.5'
$ src/ios/dependencies/update.sh <tag>
```

## Releasing

This project is automatically released to NPM by TravisCI when changes are merged into master. Here's how that looks using git flow:

```shell
$ git flow release start
```