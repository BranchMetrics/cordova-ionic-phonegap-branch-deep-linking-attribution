/* eslint-disable no-console */

// TESTING STEPS:
// cd ./
// yarn examples
// cd examples/cordova1
// (plug in devices)
// cordova run ios
// cordova run android

const { spawn } = require("child_process");

const DIR = "examples";
const TMP = "tmp";
const CORDOVA1 = "cordova1";
const PHONEGAP1 = "phonegap1";

// promisfy bash execution with stout streaming
const run = (args, dir = undefined) =>
  new Promise(resolve => {
    const command = args.split(" ");
    const output = spawn(command.shift(), command, { cwd: dir });
    let stdout = "";
    output.stdout.on("data", data => {
      stdout += String(data);
      console.log(String(data));
    });

    output.stderr.on("data", data => {
      throw new Error(String(data));
    });
    output.on("close", () => resolve(stdout.trim()));
  });

const cleanDirectory = async () => {
  await run(`rm -rf ${TMP}`);
  await run(`rm -rf ${DIR}`);
  await run(`mkdir ${DIR}`);
};

const buildCordova1 = async () => {
  await run(`cordova create ${CORDOVA1}`, `${DIR}`);
  await run(
    `cp ./src/scripts/examples/templates/${CORDOVA1}/index.xml ./${DIR}/${CORDOVA1}/config.xml`
  );
  await run(
    `cp ./src/scripts/examples/templates/${CORDOVA1}/index.js ./${DIR}/${CORDOVA1}/www/js/index.js`
  );
  await run(
    `cp ./src/scripts/examples/templates/${CORDOVA1}/index.html ./${DIR}/${CORDOVA1}/www/index.html`
  );
  await run(
    `cp ./src/scripts/examples/templates/${CORDOVA1}/index.css ./${DIR}/${CORDOVA1}/www/css/index.css`
  );

  await run(`cordova plugin add ../../${TMP}`, `${DIR}/${CORDOVA1}`);
  await run(`cordova platform add ios android`, `${DIR}/${CORDOVA1}`);
};

const buildPhoneGap1 = async () => {
  await run(`phonegap create ${PHONEGAP1}`, `${DIR}`);
  await run(
    `cp ./src/scripts/examples/templates/${PHONEGAP1}/index.xml ./${DIR}/${PHONEGAP1}/config.xml`
  );
  await run(
    `cp ./src/scripts/examples/templates/${CORDOVA1}/index.js ./${DIR}/${PHONEGAP1}/www/js/index.js`
  );
  await run(
    `cp ./src/scripts/examples/templates/${CORDOVA1}/index.html ./${DIR}/${PHONEGAP1}/www/index.html`
  );
  await run(
    `cp ./src/scripts/examples/templates/${CORDOVA1}/index.css ./${DIR}/${PHONEGAP1}/www/css/index.css`
  );
  await run(`phonegap plugin add ../../${TMP}`, `${DIR}/${PHONEGAP1}`);
  await run(`phonegap platform add ios android`, `${DIR}/${PHONEGAP1}`);
};

const copySdk = async () => {
  await run(
    `rsync -a ./ ./${TMP} --exclude node_modules --exclude .git --exclude ${DIR} --exclude ${TMP}`
  );
};

const removeCopySdk = async () => {
  await run(`rm -rf ./${TMP}`);
};

const main = async () => {
  await cleanDirectory();
  await copySdk();
  await buildCordova1();
  await buildPhoneGap1();
  await removeCopySdk();
};

module.exports = main();
