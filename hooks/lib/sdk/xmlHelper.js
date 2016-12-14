'use strict';

// read/write from/to xml file

(function() {
  // properties
  var fs = require('fs');
  var xml2js = require('xml2js');

  // entry
  module.exports = {
    readXmlAsJson: readXmlAsJson,
    writeJsonAsXml: writeJsonAsXml
  };

  // methods
  function readXmlAsJson(filePath) {
    var xmlData;
    var xmlParser;
    var parsedData;

    try {
      xmlData = fs.readFileSync(filePath);
      xmlParser = new xml2js.Parser();
      xmlParser.parseString(xmlData, function(err, data) {
        if (data) {
          parsedData = data;
        }
      });
    } catch (err) {}

    return parsedData;
  }

  function writeJsonAsXml(jsData, filePath, options) {
    var xmlBuilder = new xml2js.Builder(options);
    var changedXmlData = xmlBuilder.buildObject(jsData);
    var isSaved = true;

    try {
      fs.writeFileSync(filePath, changedXmlData);
    } catch (err) {
      console.log(err);
      isSaved = false;
    }

    return isSaved;
  }
})();
