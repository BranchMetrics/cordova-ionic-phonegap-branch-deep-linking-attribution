var gulp       = require('gulp');
var fs         = require('fs');
var sourcemaps = require('gulp-sourcemaps');
var babel      = require('gulp-babel');
var eslint     = require('gulp-eslint');
var jscs       = require('gulp-jscs');

gulp.task('prerelease', [ 'setupNpm', 'babel', 'lint' ]);

// -----------------------------------------------------------------------------
// setup for development use
gulp.task('setupDev', () => {
  getDevPluginXML();
  setIosNpmOrDev('dev');
})

// setup for npm deployment
gulp.task('setupNpm', () => {
  genNpmPluginXML();
  setIosNpmOrDev('npm');
});

// generate plugin.xml for use as a cordova plugin
// here we explode the contents of the frameworks
function genNpmPluginXML() {
  var xml = fs.readFileSync('plugin.template.xml', 'utf-8');

  var files = [];
  var root = 'src/ios/dependencies/';
  files = files.concat(emitFiles(root + 'Fabric/'));
  files = files.concat(emitFiles(root + 'Branch-SDK/'));
  files = files.concat(emitFiles(root + 'Branch-SDK/Requests/'));

  var newLineIndent = '\n        ';
  xml = xml.replace('<!--[Branch Framework Reference]-->', newLineIndent
    + files.join(newLineIndent));

  fs.writeFileSync('plugin.xml', xml);
};

// generate plugin.xml for local development
// here we reference the frameworks instead of all the files directly
function getDevPluginXML() {
  var xml = fs.readFileSync('plugin.template.xml', 'utf-8');

  xml = xml.replace('<!--[Branch Framework Reference]-->',
    '<framework custom="true" src="src/ios/dependencies/Branch.framework" />');

  fs.writeFileSync('plugin.xml', xml);
};

function setIosNpmOrDev(npmOrDev) {
  if (npmOrDev === 'npm') {
    content = '#define BRANCH_NPM true';
  }
else if (npmOrDev === 'dev') {
    content = '//empty';
  }
else {
    throw new Error('expected deployed|local, not ' + deployedOrLocal);
  }
  fs.writeFileSync('src/ios/BranchNPM.h', content + '\n');
}

// emit array of cordova file references for all .h/.m files in path
function emitFiles(path) {
  var ret = [];
  for (filename of fs.readdirSync(path)) {
    var fileType = null;
    if (filename.match(/\.m$/)) {
      fileType = 'source';
    }
else if (filename.match(/\.h$/) || filename.match(/\.pch$/)) {
      fileType = 'header';
    }
    if (fileType) {
      ret.push('<' + fileType + '-file src="' + path + filename + '" />');
    }
  }
  ret.push('');
  return ret;
}

// -----------------------------------------------------------------------------
// copy resources and compile es6 from corresponding directories
babelTasks = []; // list of all babel tasks so we can build all of them
function babelize(taskName, dir) {
  babelTasks.push(taskName + '-babel');
  if (!dir) {
    dir = taskName;
  }
  var srcDir = dir + '.es6/';
  var srcPattern = dir + '.es6/**/*.js'
  var destDir = dir + '/';
  gulp.task(taskName + '-copy', () => {
    return gulp.src(srcDir + '**/*.*').pipe(gulp.dest(destDir));
  });
  gulp.task(taskName + '-babel', [ taskName + '-copy' ], () => {
    return gulp.src(srcPattern)
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: [ 'es2015', 'stage-2' ]
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(destDir));
  });
}

babelize('hooks');
babelize('www');
babelize('tests');
babelize('testbed', 'testbed/www/js');
gulp.task('babel', babelTasks);

// -----------------------------------------------------------------------------
// linting

gulp.task('lint', [ 'eslint', 'jscs-lint' ]);

var srcs = [
  'hooks.es6/**/*.js',
  'www.es6/**/*.js',
  'gulpfile.js',
  'tests.es6/**/*.js',
  'testbed/www/js.es6/**/*.js',
  '!node_modules/**',
  '!testbed/platforms/**',
  '!testbed/plugins/**',
  '!tests-harness/platforms/**',
  '!tests-harness/plugins/**'
];

gulp.task('eslint', () => {
  return gulp.src(srcs)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

function jscsTask(fix) {
  var ret = gulp.src(srcs)
    .pipe(jscs({ fix: fix }))
    .pipe(jscs.reporter())
    .pipe(jscs.reporter('fail'));

  if (fix) {
    ret.pipe(gulp.dest('.'));
  }
  return ret;
}

gulp.task('jscs-fix', jscsTask.bind(null, true));
gulp.task('jscs-lint', jscsTask.bind(null, false));
