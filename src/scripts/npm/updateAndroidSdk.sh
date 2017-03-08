#!/bin/bash

# update the Android dependencies in this directory to those storied under passed tag on Github

# fail fast on errors
set -e

# cd into directory containing this script
cd "$(dirname "$0")"
path="../../android/dependencies"

# check first parameter is set to tag to download
if [ -z "${1+x}" ]; then
  echo "You must pass this script the tag to download"
  exit -1
else
  echo "downloading tag '$1'"
fi

# this is the git tag that we will be updating to
# we expect it to be the first parameter to this script
tag_name=$1
tag_url="https://github.com/BranchMetrics/android-branch-deep-linking/archive/$tag_name.zip"

# extract is where we stick the extracted archive of the tag
tag_extract=android-branch-deep-linking-$tag_name

# check that tag exists
tag_url_status=$(curl -L -o /dev/null --silent --head --write-out '%{http_code}\n' "$tag_url")
if [ "$tag_url_status" = "200" ]; then
  echo "found tag"
else
  echo "could not find '$tag_url'"
  echo "curl returned status '$tag_url_status'"
  exit -1
fi

# this will overwrite existing versions of sdk.zip
curl -L -o "$path"/sdk.zip "$tag_url"

# delete old extracted content or do nothing if we don't have any
rm -rf "$tag_extract"

# silently (-q) extract download
unzip -q -x "$path"/sdk.zip

# remove
rm -rf "${path:?}"/*

# # copy in new dependencies
mv "$tag_extract/Branch-$tag_name.jar" "$path"

# clean up extract
rm -rf "$tag_extract"