var gulp = require('gulp');
var fs = require('fs');

//generate plugin.xml for use as a cordova plugin
//here we explode the contents of the frameworks
gulp.task('gen-npm-plugin-xml', function(){
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
});

//generate plugin.xml for local development
//here we reference the frameworks instead of all the files directly
gulp.task('gen-dev-plugin-xml', function(){
  var xml = fs.readFileSync('plugin.template.xml', 'utf-8');
  
  xml = xml.replace('<!--[Branch Framework Reference]-->', 
    '<framework custom="true" src="src/ios/dependencies/Branch.framework" />');

  fs.writeFileSync('plugin.xml', xml);
});

//emit array of cordova file references for all .h/.m files in path
function emitFiles(path){
  var ret = [];
  for(filename of fs.readdirSync(path)){
    var fileType = null;
    if(filename.match(/\.m$/)){
      fileType = 'source';
    }else if(filename.match(/\.h$/) || filename.match(/\.pch$/)){
      fileType = 'header';
    }
    if(fileType){
      ret.push('<' + fileType + '-file src="' + path + filename + '" />');
    }
  }
  ret.push('');
  return ret;
}