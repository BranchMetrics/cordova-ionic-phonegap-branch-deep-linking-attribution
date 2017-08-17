// import
var gulp = require('gulp')
var fs = require('fs')
var standard = require('gulp-standard')

// primary tasks
gulp.task('dev', ['setupDev', 'lint'])
gulp.task('prod', ['setupNpm', 'lint'])
gulp.task('lint', ['standard'])

// --------------------------------------------------
// Linting
// --------------------------------------------------
gulp.task('standard', function () {
  // standard format for javascript
  var javascript = [
    './src/**/*.js',
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

function getDevPluginXML () {
  // generate plugin.xml for local development
  // here we reference the frameworks instead of all the files directly
  var xml = fs.readFileSync('plugin.template.xml', 'utf-8')

  xml = xml.replace('<!--[Branch Framework Reference]-->', '<framework custom="true" src="src/ios/dependencies/Branch.framework" />')

  fs.writeFileSync('plugin.xml', xml)
}

function genNpmPluginXML () {
  // generate plugin.xml for use as a Cordova plugin
  // here we explode the contents of the frameworks
  var xml = fs.readFileSync('plugin.template.xml', 'utf-8')
  var files = []
  var head = 'src/ios/dependencies/'
  var newLineIndent = '\n    '

  files = files.concat(emitFiles(head + 'Fabric/'))
  files = files.concat(emitFiles(head + 'Branch-SDK/'))
  files = files.concat(emitFiles(head + 'Branch-SDK/Networking/'))
  files = files.concat(emitFiles(head + 'Branch-SDK/Networking/Requests/'))

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
  // emit array of Cordova file references for all .h/.m files in path
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
