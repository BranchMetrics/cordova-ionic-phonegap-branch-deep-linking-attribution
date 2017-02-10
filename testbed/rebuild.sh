#!/bin/bash

# properties
run_ios=false
run_and=false
run_dep=false
run_cor=false

# options
usage() {
  printf "\n  invalid usage"
  printf "\n    ./rebuild.sh -h -> help"
  printf "\n    ./rebuild.sh -i -> build ios"
  printf "\n    ./rebuild.sh -a -> build android"
  printf "\n    ./rebuild.sh -d -> reset node dependencies"
  printf "\n    ./rebuild.sh -c -> reset cordova plugin"
  printf "\n"
  exit 1
}

if [[ "$#" < 1 ]]; then usage; fi

for arg in "$@"; do
  if ! [[ "$arg" =~ ^-. ]]; then usage; fi
done

while getopts ":hiadc" opt; do
  case $opt in
    h)
      usage
      ;;
    i)
      run_ios=true
      ;;
    a)
      run_and=true
      ;;
    d)
      run_dep=true
      ;;
    c)
      run_cor=true
      ;;
    *)
      usage
      ;;
  esac
done

# validate
gulp prod

# clean
if [[ "$run_cor" == "true" ]]; then npm install -g cordova; fi
if [[ "$run_dep" == "true" ]]; then npm uninstall mkpath node-version-compare plist xml2js; fi
rm -rf ../.installed
rm -rf ./plugins
rm -rf ./platforms

# build (platforms added before plugin because before_plugin_install does not work on file reference)
if [[ "$run_ios" == "true" ]]; then cordova platform add ios; fi
if [[ "$run_and" == "true" ]]; then cordova platform add android; fi

# plugin
cordova plugin add ../

# run
if [[ "$run_ios" == "true" ]]; then cordova build ios && open -a Xcode platforms/ios/Branch\ Testing.xcworkspace; fi
if [[ "$run_and" == "true" ]]; then cordova run android; fi
