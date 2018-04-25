const { spawn } = require("child_process");

const run = args =>
  new Promise((resolve, reject) => {
    const command = args.split(" ");
    const output = spawn(command.shift(), command);
    let stdout = "";
    output.stdout.on("data", data => {
      stdout += String(data);
      console.log(String(data));
    });

    output.stderr.on("data", data => reject(data));
    output.on("close", () => resolve(stdout.trim()));
  });

const cleanDirectory = async (pwd, dir) => {
  await run(`cd ${pwd}`);
  await run(`rm -rf ${dir}`);
  await run(`mkdir ${dir}`);
};

const installDependencies = async () => {
  await run("yarn add -g cordova ionic phonegap");
};

const buildCordova = async name => {
  await run(`cordova create ${name}`);
  await run(`cd {$name}`);
  await run(`cordova platform add ios android`);
  await run(`cordova build ios`);
};

const main = async () => {
  const dir = "examples";
  const pwd = await run("pwd");
  await cleanDirectory(pwd, dir);
  await installDependencies();
  await buildCordova("cordova1");
};

module.exports = main();

// rootDir();
// cleanDirectory();
// installDependencies();
