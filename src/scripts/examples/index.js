/* eslint-disable no-console */

// TESTING STEPS:
// cd ./
// yarn examples
// cd examples/cordova1
// (plug in devices)
// (ionic build if ionic 3)
// cordova run ios
// cordova run android

const { spawn } = require("child_process");

const DIR = "examples";
const TMP = "tmp";
const CORDOVA1 = "cordova1";
const PHONEGAP1 = "phonegap1";
const IONIC1 = "ionic1";
const IONIC3 = "ionic3";

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

const buildIonic1 = async () => {
  await run(`ionic start ${IONIC1} tabs --cordova --type ionic1`, `${DIR}`);
  await run(
    `cp ./src/scripts/examples/templates/${IONIC1}/index.xml ./${DIR}/${IONIC1}/config.xml`
  );
  await run(
    `cp ./src/scripts/examples/templates/${IONIC1}/index.html ./${DIR}/${IONIC1}/www/templates/tab-dash.html`
  );
  await run(
    `cp ./src/scripts/examples/templates/${IONIC1}/app.js ./${DIR}/${IONIC1}/www/js/app.js`
  );
  await run(
    `cp ./src/scripts/examples/templates/${IONIC1}/controllers.js ./${DIR}/${IONIC1}/www/js/controllers.js`
  );
  await run(`rm -rf ./${DIR}/${IONIC1}/.git`);
  await run(`mkdir -p plugins/branch-cordova-sdk`, `${DIR}/${IONIC1}`);
  await run(
    `rsync -a ../../${TMP}/ plugins/branch-cordova-sdk`,
    `${DIR}/${IONIC1}`
  );
  await run(`ionic cordova platform add ios`, `${DIR}/${IONIC1}`);
  await run(`ionic cordova platform add android`, `${DIR}/${IONIC1}`);
};

const buildIonic3 = async () => {
  await run(`ionic start ${IONIC3} tabs --cordova`, `${DIR}`);
  await run(`mkdir -p plugins/branch-cordova-sdk`, `${DIR}/${IONIC3}`);
  await run(
    `cp ./src/scripts/examples/templates/${IONIC3}/index.xml ./${DIR}/${IONIC3}/config.xml`
  );
  await run(
    `cp ./src/scripts/examples/templates/${IONIC3}/index.html ./${DIR}/${IONIC3}/src/pages/home/home.html`
  );
  await run(
    `cp ./src/scripts/examples/templates/${IONIC3}/app.js ./${DIR}/${IONIC3}/src/app/app.component.ts`
  );
  await run(
    `cp ./src/scripts/examples/templates/${IONIC3}/controllers.js ./${DIR}/${IONIC3}/src/pages/home/home.ts`
  );
  await run(`rm -rf ./${DIR}/${IONIC3}/.git`);
  await run(
    `rsync -a ../../${TMP}/ plugins/branch-cordova-sdk`,
    `${DIR}/${IONIC3}`
  );
  await run(`ionic cordova platform add ios`, `${DIR}/${IONIC3}`);
  await run(`ionic cordova platform add android`, `${DIR}/${IONIC3}`);
};

const installDependencies = async () => {
  await run("yarn add -g cordova ionic phonegap");
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
  // await installDependencies();
  await copySdk();
  await buildCordova1();
  await buildPhoneGap1();
  await buildIonic1();
  await buildIonic3();
  await removeCopySdk();
};

module.exports = main();
