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

main() {
  # validate
  gulp prod

  # clean
  if [[ "$run_cor" == "true" ]]; then
    npm install -g cordova
  fi
  if [[ "$run_dep" == "true" ]]; then
    npm uninstall mkpath node-version-compare plist xml2js
  fi
  rm -rf ../.installed
  rm -rf ./plugins
  rm -rf ./platforms
  rm -rf ./build.json

  # build (platforms added before plugin because before_plugin_install does not work on file reference)
  if [[ "$run_ios" == "true" ]]; then
    cordova platform add ios
  fi
  if [[ "$run_and" == "true" ]]; then
    cordova platform add android
  fi

  # plugin
  cordova plugin add ../

  # run
  if [[ "$run_ios" == "true" ]]; then
    cordova run ios --device
  fi
  if [[ "$run_and" == "true" ]]; then
    cordova run android
  fi
}

options "$@"
main
