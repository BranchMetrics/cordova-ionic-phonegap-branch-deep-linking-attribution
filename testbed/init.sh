#!/bin/bash

# properties
run_ios=false
run_and=false
run_dep=false
run_cor=false
script_name=$(basename "$0")

# options
usage() {
  printf "\n  invalid usage"
  printf "\n    ./%s -h -> help" "$script_name"
  printf "\n    ./%s -i -> build ios" "$script_name"
  printf "\n    ./%s -a -> build android" "$script_name"
  printf "\n    ./%s -d -> reset node dependencies" "$script_name"
  printf "\n    ./%s -c -> reset cordova plugin" "$script_name"
  printf "\n"
  exit 1
}

options() {
  if [[ "$#" -lt 1 ]]; then usage; fi

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
}

# logging
logger() {
  if [ "$1" == "info" ] ; then
    COLOR="96m";
  elif [ "$1" == "success" ] ; then
    COLOR="92m";
  elif [ "$1" == "warning" ] ; then
    COLOR="93m";
  elif [ "$1" == "danger" ] ; then
    COLOR="91m";
  else
    COLOR="0m";
  fi

  STARTCOLOR="\e[$COLOR";
  ENDCOLOR="\e[0m";

  printf "$STARTCOLOR%b$ENDCOLOR" "$2";
}

# main
main() {
  logger "info" "BRANCH: clean \n"
  rm -rf ../.installed
  rm -rf ./node_modules
  rm -rf ./plugins
  rm -rf ./platforms
  rm -rf ./build.json
  rm -rf ./config.xml
  rm -rf ./package.json
  rm -rf ./package-lock.json

  if [[ "$run_cor" == "true" ]]; then
    logger "info" "BRANCH: install cordova \n"
    npm install -g cordova gulp-cli ios-deploy
  fi

  if [[ "$run_dep" == "true" ]]; then
    logger "info" "BRANCH: install node dependencies \n"
    npm uninstall mkpath node-version-compare plist xml2js
  fi

  logger "info" "BRANCH: validate code \n"
  gulp prod

  logger "info" "BRANCH: copy config \n"
  cp config.template.xml config.xml

  if [[ "$run_ios" == "true" ]]; then
    logger "info" "BRANCH: add ios platform \n"
    cordova platform add ios
  fi

  if [[ "$run_and" == "true" ]]; then
    logger "info" "BRANCH: add android platform \n"
    cordova platform add android
  fi

  # plugin
  cordova plugin add ../

  if [[ "$run_ios" == "true" ]]; then
    logger "info" "BRANCH: run ios \n"
    cordova run ios --device
  fi

  if [[ "$run_and" == "true" ]]; then
    logger "info" "BRANCH: run android \n"
    cordova run android
  fi
}

# run
options "$@"
main
