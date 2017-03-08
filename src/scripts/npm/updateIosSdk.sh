#!/bin/bash

#update the ios dependencies in this directory to those storied under passed tag on github

#fail fast on errors
set -e

#cd into directory containing this script
cd "$(dirname "$0")"

#check first parameter is set to tag to download
if [ -z ${1+x} ]; then
	echo "You must pass this script the tag to download"
	exit -1
else
	echo "downloading tag '$1'"
fi

#this is the git tag that we'll be updating to,
#we expecct it to be the first parameter to this script
tag_name=$1
tag_url="https://github.com/BranchMetrics/ios-branch-deep-linking/archive/$tag_name.zip"
#extract is where we stick the extracted archive of the tag
tag_extract=ios-branch-deep-linking-$tag_name


#check that tag exists
tag_url_status=`curl -L -o /dev/null --silent --head --write-out '%{http_code}\n' $tag_url`
if [ $tag_url_status = "200" ]; then
	echo "found tag"
else
	echo "could not find '$tag_url'"
	echo "curl returned status '$tag_url_status'"
	exit -1
fi

#this will overwripte existing versions of sdk.zip
curl -L -o sdk.zip $tag_url

#delete old extracted content or do nothing if we don't have any
rm -rf $tag_extract

#silently (-q) extract download
unzip -q -x sdk.zip
rm -f sdk.zip

#copy in new dependencies
rm -rf Branch-SDK
mv $tag_extract/Branch-SDK/Branch-SDK .

rm -rf Branch.framework
mv $tag_extract/Branch.framework .

rm -rf Fabric
mv $tag_extract/Branch-SDK/Fabric .

#clean up
rm -rf $tag_extract

#replace all instances of '#import "../Fabric/' with '#import "' in .m files
find . -type f -name '*.m' \
	-exec perl -i -pe 's/\#import \"\.\.\/Fabric\//#import "/' '{}' +
