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
  # clean
  if [[ "$run_cor" == "true" ]]; then
    npm install -g cordova gulp-cli ios-deploy
  fi
  if [[ "$run_dep" == "true" ]]; then
    npm uninstall mkpath node-version-compare plist xml2js
  fi
  rm -rf ../.installed
  rm -rf ./node_modules
  rm -rf ./plugins
  rm -rf ./platforms
  rm -rf ./build.json
  rm -rf ./config.xml
  rm -rf ./package.json
  rm -rf ./package-lock.json

  # validate
  gulp prod

  # config
  cp config.template.xml config.xml

  # build (platforms added before plugin because before_plugin_install does not work on file reference)
  if [[ "$run_ios" == "true" ]]; then
    cordova platform add ios
  fi
  if [[ "$run_and" == "true" ]]; then
    cordova platform add android
    # TODO: remove for cordova 6.5.0
    cordova platform update android@6.2.2
  fi

  # TODO: remove this cordova error fix (https://stackoverflow.com/questions/42350505/error-cannot-read-property-replace-of-undefined-when-building-ios-cordova)
  # if [[ "$run_ios" == "true" ]]; then
  #   cd ./platforms/ios/cordova/node_modules/
  #   npm install ios-sim@latest
  #   cd ../../../../
  # fi

  # plugin
  # cordova plugin add ../

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
