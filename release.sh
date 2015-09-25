#!/bin/bash

[ $# -eq 0 ] && { echo "Usage: $0 v1.0.0"; exit 1; }

VERSION_NO_V=$(echo $1 | tr -d "\nv")
VERSION="v"$VERSION_NO_V
DATE=$(date "+%Y-%m-%d")

echo "Releasing Branch Cordova SDK"

check_git_branch() {
# check whether on master branch
  branch_name="$(git symbolic-ref HEAD 2>/dev/null)"
  branch_name=${branch_name##refs/heads/}
  if [ $branch_name != "master" ]; then
    echo "ERROR: not on master branch: "$PWD":"$branch_name
    exit 1
  fi

# check whether the branch is clean
  if [[ $(git status --porcelain 2> /dev/null | tail -n1) != "" ]]
  then
    echo 'ERROR: branch dirty'
    exit 1
  fi
}

# check main module
check_git_branch

# check Web-SDK submodule
cd Web-SDK/
check_git_branch
cd ..

# update to the latest
git pull origin master
git submodule foreach git pull origin master

read -p "Update CHANGELOG.md?" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  vi CHANGELOG.md
  git commit -am "Updated CHANGELOG.md"
fi

echo "Building files"

read -p "Bump CHANGELOG version? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
	sed -i -e "s/## \[VERSION\] - unreleased/## [$VERSION] - $DATE/" CHANGELOG.md
fi

read -p "Update package.json? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
	sed -i -e "s/\"version\":.*$/\"version\": \"$VERSION_NO_V\",/" package.json
	sed -i -e "s/\"build\":.*$/\"build\": \"$VERSION_NO_V\"/" package.json
fi

read -p "Update plugin.xml? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
	sed -i -e "s/\" version=\".*\"/\" version=\"$VERSION_NO_V\"/" plugin.xml
fi

read -p "Commit? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
	git commit -am "Tagging release $VERSION"
fi

make clean
make

read -p "Tag? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
	git tag $VERSION
fi

read -p "Publish to NPM? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
	npm publish
fi

read -p "Reset? " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
	perl -i -pe '$_ = "\n## [VERSION] - unreleased\n\n" if $. ==4' CHANGELOG.md
	git commit -am "Resetting to HEAD"
fi

read -p "Clean up -e backup files?" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  rm -f CHANGELOG.md-e package.json-e plugin.xml-e
fi

echo "Done script."

echo "Post-release sanity checks."
read -p "Is https://www.npmjs.com/package/branch-cordova-sdk using the right version number $VERSION?" -n 1 -r
echo

echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
	echo "Ok"
fi

echo "Last step, run:"
echo "    git push; git push origin $VERSION"

echo
echo "Remember to check https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK/tree/$VERSION/CHANGELOG.md "

echo
