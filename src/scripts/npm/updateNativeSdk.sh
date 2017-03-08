#!/bin/bash

# update the iOS and Android native SDKs

# properties
script_name=$(basename "$0")
ios_tag=false
and_tag=false

# options
usage() {
  printf "\n  invalid usage"
  printf "\n    ./%s -h        -> help" "$script_name"
  printf "\n    ./%s -i 0.13.5 -> build ios" "$script_name"
  printf "\n    ./%s -a 2.4.11 -> build android" "$script_name"
  printf "\n"
  exit 1
}

options() {
  # require at least 1 argument
  if [[ "$#" -lt 1 ]]; then usage; fi

  # types of arguments (: = disable verbose errors, -h, i: = -i value, a: = -a value)
  while getopts ":hi:a:" opt; do
    case $opt in
      h)
        usage
        ;;
      i)
        ios_tag=${OPTARG}
        ;;
      a)
        and_tag=${OPTARG}
        ;;
      *)
        usage
        ;;
    esac
  done
}

update_ios() {
  # properties
  path="../../ios/dependencies"
  tag_url="https://github.com/BranchMetrics/ios-branch-deep-linking/archive/$ios_tag.zip"
  zip_tmp=ios-branch-deep-linking-$ios_tag

  # validate and download
  check_tag "$tag_url"
  download_sdk "$path" "$tag_url" "$zip_tmp"

  # copy in new dependencies
  mv "$zip_tmp/Branch-SDK/Branch-SDK" "$path"
  mv "$zip_tmp/Branch-SDK/Fabric" "$path"

  # replace all instances of '#import "../Fabric/' with '#import "' in .m files
  find "$path" -type f -name '*.m' -exec perl -i -pe 's/\#import \"\.\.\/Fabric\//#import "/' '{}' +

  # clean up
  remove_tmp "$zip_tmp"
}

update_and() {
  # properties
  path="../../android/dependencies"
  tag_url="https://github.com/BranchMetrics/android-branch-deep-linking/archive/$and_tag.zip"
  zip_tmp=android-branch-deep-linking-$and_tag

  # validate and download
  check_tag "$tag_url"
  download_sdk "$path" "$tag_url" "$zip_tmp"

  # copy in new dependencies
  mv "$zip_tmp/Branch-$and_tag.jar" "$path"

  # clean up
  remove_tmp "$zip_tmp"
}

check_tag() {
  # check that tag exists
  tag_url_status=$(curl -L -o /dev/null --silent --head --write-out '%{http_code}\n' "$tag_url")
  if [ "$tag_url_status" = "200" ]; then
    echo "downloading $tag_url"
  else
    echo "could not find '$tag_url'"
    echo "curl returned status '$tag_url_status'"
    exit -1
  fi
}

download_sdk() {
  # overwrite any existing versions of sdk.zip
  curl -L -o "$path"/sdk.zip "$tag_url"

  # delete old extracted content
  rm -rf "$zip_tmp"

  # silently (-q) extract download
  unzip -q -x "$path"/sdk.zip

  # remove
  rm -rf "${path:?}"/*
}

remove_tmp() {
  # clean up extract
  rm -rf "$zip_tmp"
}

main() {
  # cd into directory containing this script
  cd "$(dirname "$0")"

  # fail fast on errors
  set -e

  # install sdk
  if [[ "$ios_tag" != "false" ]]; then
    update_ios
  fi
  if [[ "$and_tag" != "false" ]]; then
    update_and
  fi
}

options "$@"
main
