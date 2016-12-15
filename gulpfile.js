// import
var gulp = require('gulp')
var fs = require('fs')
var sourcemaps = require('gulp-sourcemaps')
var babel = require('gulp-babel')
var standard = require('gulp-standard')

// primary tasks
gulp.task('predev', ['setupDev', 'babel', 'lint'])
gulp.task('prerelease', ['setupNpm', 'babel', 'lint'])
gulp.task('lint', ['standard'])

// secondary tasks

// --------------------------------------------------
// Linting
// --------------------------------------------------
gulp.task('standard', function () {
  // standard format for javascript
  var javascript = [
    './hooks/**/*.js',
    './testbed/www/js/**/*.js',
    './gulpfile.js'
  ]

  return gulp.src(javascript)
  .pipe(standard())
  .pipe(standard.reporter('default', {
    breakOnError: true,
    quiet: true
  }))
})

// --------------------------------------------------
// Setup
// --------------------------------------------------
gulp.task('setupDev', function () {
  // setup for development use
  getDevPluginXML()
  setIosNpmOrDev('dev')
})

gulp.task('setupNpm', function () {
  // setup for npm deployment
  genNpmPluginXML()
  setIosNpmOrDev('npm')
})

gulp.task('update-plugin-xml-version', function () {
  // first match only!
  var PLUGIN_XML_VERSION_REGEX = /^\s*version=\"[\d\.]*\"\>$/m // eslint-disable-line
  var versionNumber = require('./package.json').version

  // this will break if plugin.xml is not formatted exactly as we expect
  // so you might end up needing to fix the regex
  for (var target of [ '.xml', '.template.xml' ]) {
    var pluginXML = fs.readFileSync('plugin' + target, 'utf8')
    var newVersionXML = `        version="${versionNumber}">`
    pluginXML = pluginXML.replace(PLUGIN_XML_VERSION_REGEX, newVersionXML)
    fs.writeFileSync('plugin' + target, pluginXML)
  }
})

function getDevPluginXML () {
  // generate plugin.xml for local development
  // here we reference the frameworks instead of all the files directly
  var xml = fs.readFileSync('plugin.template.xml', 'utf-8')

  xml = xml.replace('<!--[Branch Framework Reference]-->', '<framework custom="true" src="src/ios/dependencies/Branch.framework" />')

  fs.writeFileSync('plugin.xml', xml)
}

function genNpmPluginXML () {
  // generate plugin.xml for use as a cordova plugin
  // here we explode the contents of the frameworks
  var xml = fs.readFileSync('plugin.template.xml', 'utf-8')
  var files = []
  var head = 'src/ios/dependencies/'
  var newLineIndent = '\n        '

  files = files.concat(emitFiles(head + 'Fabric/'))
  files = files.concat(emitFiles(head + 'Branch-SDK/'))
  files = files.concat(emitFiles(head + 'Branch-SDK/Requests/'))

  xml = xml.replace('<!--[Branch Framework Reference]-->', newLineIndent + files.join(newLineIndent))

  fs.writeFileSync('plugin.xml', xml)
}

function setIosNpmOrDev (npmOrDev) {
  var content
  if (npmOrDev === 'npm') {
    content = '#define BRANCH_NPM true'
  } else if (npmOrDev === 'dev') {
    content = '//empty'
  } else {
    throw new Error('expected deployed|local, not ' + npmOrDev)
  }
  fs.writeFileSync('src/ios/BranchNPM.h', content + '\n')
}

function emitFiles (path) {
  // emit array of cordova file references for all .h/.m files in path
  var ret = []
  for (var filename of fs.readdirSync(path)) {
    var fileType = null
    if (filename.match(/\.m$/)) {
      fileType = 'source'
    } else if (filename.match(/\.h$/) || filename.match(/\.pch$/)) {
      fileType = 'header'
    }
    if (fileType) {
      ret.push('<' + fileType + '-file src="' + path + filename + '" />')
    }
  }
  ret.push('')
  return ret
}

// --------------------------------------------------
// Babel
// --------------------------------------------------
gulp.task('babel', babelTasks)

var babelTasks = []
function babelize (taskName, dir) {
  // copy resources and compile es6 from corresponding directories
  // list of all babel tasks so we can build all of them

  babelTasks.push(taskName + '-babel')
  if (!dir) {
    dir = taskName
  }
  var srcDir = dir + '.es6/'
  var srcPattern = dir + '.es6/**/*.js'
  var destDir = dir + '/'
  gulp.task(taskName + '-copy', function () {
    return gulp.src(srcDir + '**/*.*').pipe(gulp.dest(destDir))
  })
  gulp.task(taskName + '-babel', [ taskName + '-copy' ], function () {
    return gulp.src(srcPattern)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [ 'es2015', 'stage-2' ]
    }))
    .pipe(gulp.dest(destDir))
  })
}

babelize('hooks')
babelize('www')
babelize('tests')
babelize('testbed', 'testbed/www/js')

