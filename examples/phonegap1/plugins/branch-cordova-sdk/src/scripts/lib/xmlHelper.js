(function() {
  // properties

  const fs = require("fs");
  const xml2js = require("xml2js");

  // entry
  module.exports = {
    readXmlAsJson: readXmlAsJson,
    writeJsonAsXml: writeJsonAsXml
  };

  // read from xml file
  function readXmlAsJson(file) {
    let xmlData;
    let xmlParser;
    let parsedData;

    try {
      xmlData = fs.readFileSync(file);
      xmlParser = new xml2js.Parser();
      xmlParser.parseString(xmlData, (err, data) => {
        if (!err && data) {
          parsedData = data;
        }
      });
    } catch (err) {
      throw new Error(`BRANCH SDK: Cannot write file ${file}`);
    }

    return parsedData;
  }

  // write to xml file
  function writeJsonAsXml(file, content, options) {
    const xmlBuilder = new xml2js.Builder(options);
    const changedXmlData = xmlBuilder.buildObject(content);
    let isSaved = true;

    try {
      fs.writeFileSync(file, changedXmlData);
    } catch (err) {
      isSaved = false;
      throw new Error(`BRANCH SDK: Cannot write file ${file}`);
    }

    return isSaved;
  }
})();
